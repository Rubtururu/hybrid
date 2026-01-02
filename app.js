/*************************
 * CONFIG
 *************************/
const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5";
const ABI = /**
 *Submitted for verification at testnet.bscscan.com on 2026-01-02
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MetaWinV3 {

    // ---------------------------------------------
    // CONFIGURACIÓN
    // ---------------------------------------------
    address public owner;
    uint256 public constant TICKET_PRICE = 0.001 ether;
    uint256 public constant AUCTION_INCREMENT = 0.001 ether;

    uint256 public treasuryPool;      // 95% de deposits
    uint256 public dividendPool;      // 3% de deposits + 5% fees rifa/subasta
    uint256 public rafflePrizePot;    // 90% de tickets
    uint256 public auctionPrizePot;   // 90% de pujas

    uint256 public lastDividendDay;   // timestamp del último pago
    uint256 public dividendPercent = 1; // 1% diario de dividendPool

    // ---------------------------------------------
    // STAKING
    // ---------------------------------------------
    struct User {
        uint256 staked;
        uint256 withdrawn;
        uint256 dividendsClaimed;
    }
    mapping(address => User) public users;
    address[] public stakers;

    // ---------------------------------------------
    // RIFA
    // ---------------------------------------------
    struct RaffleTicket {
        address user;
    }
    RaffleTicket[] public raffleTickets;
    uint256 public raffleEndTime;
    uint256 public raffleDuration = 1 hours;
    address[5] public lastRaffleWinners;
    uint256[5] public lastRafflePrizes;

    // ---------------------------------------------
    // SUBASTA
    // ---------------------------------------------
    struct Bid {
        address user;
        uint256 amount;
    }
    Bid[] public auctionBids;
    uint256 public auctionEndTime;
    uint256 public auctionDuration = 30 minutes;
    uint256 public maxAuctionDuration = 60 minutes;
    address[5] public lastAuctionWinners;
    uint256[5] public lastAuctionPrizes;

    // ---------------------------------------------
    // EVENTOS
    // ---------------------------------------------
    event Deposit(address indexed user, uint256 amountTreasury, uint256 totalStaked);
    event Withdraw(address indexed user, uint256 amount, uint256 remainingStaked);
    event DividendsClaimed(address indexed user, uint256 amount);
    event RaffleEntered(address indexed user, uint256 tickets);
    event RaffleClosed(address[5] winners, uint256[5] prizes);
    event AuctionBid(address indexed user, uint256 amount);
    event AuctionClosed(address[5] winners, uint256[5] prizes);

    // ---------------------------------------------
    // CONSTRUCTOR
    // ---------------------------------------------
    constructor() {
        owner = msg.sender;
        lastDividendDay = block.timestamp;
        raffleEndTime = block.timestamp + raffleDuration;
        auctionEndTime = block.timestamp + auctionDuration;
    }

    // ---------------------------------------------
    // MODIFIERS
    // ---------------------------------------------
    modifier onlyOwner() {
        require(msg.sender == owner, "Solo owner");
        _;
    }

    modifier updateDividends() {
        // Pagar dividendos 1% diario automáticamente
        if(block.timestamp >= lastDividendDay + 1 days) {
            uint256 daysPassed = (block.timestamp - lastDividendDay) / 1 days;
            lastDividendDay += daysPassed * 1 days;
            // Dividendos se reclaman manualmente por cada usuario
        }
        _;
    }

    // ---------------------------------------------
    // STAKING FUNCTIONS
    // ---------------------------------------------
    function deposit() external payable updateDividends {
        require(msg.value > 0, "Deposito > 0");

        uint256 toTreasury = (msg.value * 95) / 100;
        uint256 toDividend = (msg.value * 3) / 100;
        uint256 toOwner = msg.value - toTreasury - toDividend; // 2% restante

        treasuryPool += toTreasury;
        dividendPool += toDividend;
        payable(owner).transfer(toOwner);

        if(users[msg.sender].staked == 0){
            stakers.push(msg.sender);
        }
        users[msg.sender].staked += toTreasury;

        emit Deposit(msg.sender, toTreasury, users[msg.sender].staked);
    }

    function withdraw(uint256 amount) external updateDividends {
        require(amount > 0, "Retiro > 0");
        require(users[msg.sender].staked >= amount, "No suficiente staked");
        users[msg.sender].staked -= amount;
        treasuryPool -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount, users[msg.sender].staked);
    }

    function claimDividends() external updateDividends {
        require(users[msg.sender].staked > 0, "No stakeado");

        uint256 share = (users[msg.sender].staked * dividendPercent) / 100;
        uint256 dividend = (share * dividendPool) / treasuryPool;
        require(dividend > 0, "Nada que reclamar");
        users[msg.sender].dividendsClaimed += dividend;
        dividendPool -= dividend;
        payable(msg.sender).transfer(dividend);
        emit DividendsClaimed(msg.sender, dividend);
    }

    function getUserShare(address user) external view returns(uint256 stakingShareBP) {
        if(treasuryPool == 0) return 0;
        stakingShareBP = (users[user].staked * 10000) / treasuryPool; // base 10000 = %
    }

    // ---------------------------------------------
    // RAFFLE FUNCTIONS
    // ---------------------------------------------
    function enterRaffle(uint256 tickets) external payable {
        require(tickets > 0, "Tickets > 0");
        require(msg.value >= tickets * TICKET_PRICE, "Valor insuficiente");

        uint256 prizeShare = (msg.value * 90) / 100;
        uint256 divShare = (msg.value * 5) / 100;
        uint256 ownerShare = msg.value - prizeShare - divShare;

        rafflePrizePot += prizeShare;
        dividendPool += divShare;
        payable(owner).transfer(ownerShare);

        for(uint i=0; i<tickets; i++){
            raffleTickets.push(RaffleTicket({user: msg.sender}));
        }

        emit RaffleEntered(msg.sender, tickets);

        if(block.timestamp >= raffleEndTime){
            _closeRaffle();
        }
    }

    function _closeRaffle() internal {
        uint256 totalTickets = raffleTickets.length;
        if(totalTickets == 0) return;

        uint256[5] memory prizes;
        address[5] memory winners;

        for(uint i=0; i<5; i++){
            uint idx = uint(keccak256(abi.encodePacked(block.timestamp, i))) % totalTickets;
            winners[i] = raffleTickets[idx].user;
            prizes[i] = rafflePrizePot / (2**i); // Top1: mitad, Top2: 1/4, Top3: 1/8, ...
        }

        for(uint i=0; i<5; i++){
            if(winners[i] != address(0)){
                payable(winners[i]).transfer(prizes[i]);
            }
        }

        lastRaffleWinners = winners;
        lastRafflePrizes = prizes;
        rafflePrizePot = 0;
        delete raffleTickets;
        raffleEndTime = block.timestamp + raffleDuration;

        emit RaffleClosed(winners, prizes);
    }

    function getRaffleStats() external view returns(uint256 prizePot, uint256 tickets, uint256 timeLeft){
        prizePot = rafflePrizePot;
        tickets = raffleTickets.length;
        if(block.timestamp >= raffleEndTime) timeLeft = 0;
        else timeLeft = raffleEndTime - block.timestamp;
    }

    // ---------------------------------------------
    // AUCTION FUNCTIONS
    // ---------------------------------------------
    function bidAuction() external payable {
        uint256 currentBid = auctionBids.length == 0 ? AUCTION_INCREMENT : auctionBids[auctionBids.length-1].amount + AUCTION_INCREMENT;
        require(msg.value == currentBid, "Valor exacto requerido");

        uint256 prizeShare = (msg.value * 90) / 100;
        uint256 divShare = (msg.value * 5) / 100;
        uint256 ownerShare = msg.value - prizeShare - divShare;

        auctionPrizePot += prizeShare;
        dividendPool += divShare;
        payable(owner).transfer(ownerShare);

        auctionBids.push(Bid({user: msg.sender, amount: msg.value}));
        emit AuctionBid(msg.sender, msg.value);

        // Extender timer
        uint256 remaining = auctionEndTime - block.timestamp;
        if(remaining < 5 minutes){
            auctionEndTime = block.timestamp + 5 minutes;
        }
        if(auctionEndTime - (block.timestamp + auctionDuration) > maxAuctionDuration){
            auctionEndTime = block.timestamp + maxAuctionDuration;
        }

        if(block.timestamp >= auctionEndTime){
            _closeAuction();
        }
    }

    function _closeAuction() internal {
        uint256 n = auctionBids.length;
        if(n == 0) return;

        uint256[5] memory prizes;
        address[5] memory winners;

        for(uint i=0; i<5; i++){
            if(n > i){
                winners[i] = auctionBids[n-1-i].user;
                prizes[i] = auctionPrizePot / (2**i);
                payable(winners[i]).transfer(prizes[i]);
            }
        }

        lastAuctionWinners = winners;
        lastAuctionPrizes = prizes;
        auctionPrizePot = 0;
        delete auctionBids;
        auctionEndTime = block.timestamp + auctionDuration;

        emit AuctionClosed(winners, prizes);
    }

    function getAuctionStats() external view returns(uint256 prizePot, uint256 topBid, uint256 timeLeft, address[] memory lastBidders){
        prizePot = auctionPrizePot;
        topBid = auctionBids.length == 0 ? 0 : auctionBids[auctionBids.length-1].amount;
        if(block.timestamp >= auctionEndTime) timeLeft = 0;
        else timeLeft = auctionEndTime - block.timestamp;

        uint256 count = auctionBids.length < 5 ? auctionBids.length : 5;
        lastBidders = new address[](count);
        for(uint i=0; i<count; i++){
            lastBidders[i] = auctionBids[auctionBids.length-1-i].user;
        }
    }

    // ---------------------------------------------
    // ADMIN
    // ---------------------------------------------
    function setRaffleDuration(uint256 duration) external onlyOwner {
        raffleDuration = duration;
    }

    function setAuctionDuration(uint256 duration) external onlyOwner {
        auctionDuration = duration;
    }

    function setDividendPercent(uint256 percent) external onlyOwner {
        dividendPercent = percent;
    }

    function withdrawOwner(uint256 amount) external onlyOwner {
        payable(owner).transfer(amount);
    }
};

let web3;
let contract;
let account;

/*************************
 * INIT
 *************************/
window.addEventListener("load", () => {
    initTabs();
    initButtons();
});

/*************************
 * TABS
 *************************/
function initTabs(){
    document.querySelectorAll(".tab").forEach(tab=>{
        tab.onclick = ()=>{
            document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
            document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.target).classList.add("active");
        };
    });
}

/*************************
 * BUTTONS
 *************************/
function initButtons(){
    document.getElementById("connectBtn").onclick = connect;
    document.getElementById("depositBtn").onclick = deposit;
    document.getElementById("withdrawBtn").onclick = withdraw;
    document.getElementById("claimBtn").onclick = claimDividends;
    document.getElementById("raffleBtn").onclick = enterRaffle;
    document.getElementById("bidBtn").onclick = bidAuction;
}

/*************************
 * CONNECT
 *************************/
async function connect(){
    if(!window.ethereum){ alert("MetaMask no encontrado"); return; }
    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({method:"eth_requestAccounts"});
    account = accounts[0];
    document.getElementById("accountDisplay").textContent = account;
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    updateAllStats();
    setInterval(updateAllStats, 3000);
    listenEvents();
}

/*************************
 * DASHBOARD
 *************************/
async function updateDashboard(){
    const totalStaked = await contract.methods.treasuryPool().call();
    const dividendPool = await contract.methods.dividendPool().call();
    const user = await contract.methods.users(account).call();
    const userShareBP = await contract.methods.getUserShare(account).call();

    document.getElementById("totalStaked").textContent = web3.utils.fromWei(totalStaked,"ether");
    document.getElementById("dividendPool").textContent = web3.utils.fromWei(dividendPool,"ether");
    document.getElementById("myStaked").textContent = web3.utils.fromWei(user.staked,"ether");
    document.getElementById("userShare").textContent = (userShareBP/100).toFixed(2) + "%";

    document.getElementById("totalStakedBar").style.width = "100%";
    document.getElementById("myStakeBar").style.width = userShareBP/100 + "%";
}

async function deposit(){ await contract.methods.deposit().send({from:account,value:web3.utils.toWei("0.01","ether")}); }
async function withdraw(){ await contract.methods.withdraw(web3.utils.toWei("0.01","ether")).send({from:account}); }
async function claimDividends(){ await contract.methods.claimDividends().send({from:account}); }

/*************************
 * RAFFLE
 *************************/
async function updateRaffle(){
    const stats = await contract.methods.getRaffleStats().call();
    document.getElementById("rafflePrizePot").textContent = web3.utils.fromWei(stats.prizePot,"ether");
    document.getElementById("raffleTicketsTotal").textContent = stats.tickets;
    document.getElementById("raffleTimeLeft").textContent = stats.timeLeft;

    // Calcular tickets del usuario
    let userTickets = 0;
    for(let i=0;i<stats.tickets;i++){
        const t = await contract.methods.raffleTickets(i).call();
        if(t.user.toLowerCase()===account.toLowerCase()) userTickets++;
    }
    const share = stats.tickets>0 ? ((userTickets/stats.tickets)*100).toFixed(2) : 0;
    document.getElementById("raffleUserShare").textContent = share+"%";
    document.getElementById("raffleShareBar").style.width = share+"%";
}

async function enterRaffle(){
    const tickets = parseInt(document.getElementById("raffleTicketsInput").value);
    if(isNaN(tickets)||tickets<=0){ alert("Cantidad inválida"); return; }
    const value = web3.utils.toWei((tickets*0.001).toString(),"ether");
    await contract.methods.enterRaffle(tickets).send({from:account,value});
}

/*************************
 * AUCTION
 *************************/
async function updateAuction(){
    const stats = await contract.methods.getAuctionStats().call();
    document.getElementById("auctionPrizePot").textContent = web3.utils.fromWei(stats.prizePot,"ether");
    document.getElementById("auctionTopBid").textContent = web3.utils.fromWei(stats.topBid,"ether");
    document.getElementById("auctionTimeLeft").textContent = stats.timeLeft;
    const lastBidders = stats.lastBidders.map(a=>a.substring(0,6)+"..."+a.slice(-4)).join(", ");
    document.getElementById("auctionLastBidders").textContent = lastBidders;
}

async function bidAuction(){
    const stats = await contract.methods.getAuctionStats().call();
    const topBid = BigInt(stats.topBid || 0);
    const increment = BigInt(await contract.methods.AUCTION_INCREMENT().call());
    const nextBid = topBid===0n? increment: topBid+increment;
    await contract.methods.bidAuction().send({from:account,value:nextBid.toString()});
}

/*************************
 * EVENTS
 *************************/
function listenEvents(){
    const logTypes = [
        {event:"Deposit", color:"#4caf50"},
        {event:"Withdraw", color:"#f44336"},
        {event:"DividendsClaimed", color:"#2196f3"},
        {event:"RaffleEntered", color:"#ff9800"},
        {event:"RaffleClosed", color:"#9c27b0"},
        {event:"AuctionBid", color:"#00bcd4"},
        {event:"AuctionClosed", color:"#e91e63"}
    ];
    logTypes.forEach(lt=>{
        contract.events[lt.event]({fromBlock:"latest"}).on("data", e=>{
            addEventLog(lt.event, e.returnValues, lt.color);
        });
    });
}

function addEventLog(type, data, color){
    const log = document.createElement("div");
    log.style.color = color;
    let text = "";
    switch(type){
        case "Deposit": text=`Deposito: ${data.user} +${web3.utils.fromWei(data.amountTreasury)} BNB`; break;
        case "Withdraw": text=`Retiro: ${data.user} -${web3.utils.fromWei(data.amount)} BNB`; break;
        case "DividendsClaimed": text=`Dividendos: ${data.user} +${web3.utils.fromWei(data.amount)} BNB`; break;
        case "RaffleEntered": text=`Rifa: ${data.user} compró ${data.tickets} tickets`; break;
        case "RaffleClosed": text=`Rifa cerrada. Ganadores: ${data.winners.join(", ")}`; break;
        case "AuctionBid": text=`Subasta: ${data.user} pujó ${web3.utils.fromWei(data.amount)} BNB`; break;
        case "AuctionClosed": text=`Subasta cerrada. Ganadores: ${data.winners.join(", ")}`; break;
    }
    log.textContent = text;
    document.getElementById("eventLogs").prepend(log);
}

/*************************
 * UPDATE ALL STATS
 *************************/
async function updateAllStats(){
    if(!contract||!account) return;
    await updateDashboard();
    await updateRaffle();
    await updateAuction();
}
