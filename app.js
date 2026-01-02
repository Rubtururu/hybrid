const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5"; 
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountTreasury","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStaked","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingStaked","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctionBids","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionPrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"topBid","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"},{"internalType":"address[]","name":"lastBidders","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"tickets","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserShare","outputs":[{"internalType":"uint256","name":"stakingShareBP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionPrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRafflePrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRaffleWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAuctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"raffleTickets","outputs":[{"internalType":"address","name":"user","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setAuctionDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setDividendPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setRaffleDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contract;
let account;

window.addEventListener("load", async () => {
    initTabs();
    initButtons();
    await connect(); // intentamos conectar si ya hay MetaMask
    startUIUpdateLoop();
});

// ---------------------------
// SPA Tabs
// ---------------------------
function initTabs() {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.target).classList.add("active");
        };
    });
}

// ---------------------------
// Buttons
// ---------------------------
function initButtons() {
    document.getElementById("connectBtn").onclick = connect;
    document.getElementById("depositBtn").onclick = deposit;
    document.getElementById("withdrawBtn").onclick = withdraw;
    document.getElementById("claimBtn").onclick = claimDividends;
    document.getElementById("raffleBtn").onclick = enterRaffle;
    document.getElementById("bidBtn").onclick = bidAuction;
}

// ---------------------------
// Connect MetaMask
// ---------------------------
async function connect() {
    if(!window.ethereum){
        alert("MetaMask no detectado");
        return;
    }
    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    document.getElementById("accountDisplay").textContent = account;
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    listenEvents();
}

// ---------------------------
// STAKING
// ---------------------------
async function deposit() {
    const value = web3.utils.toWei(document.getElementById("depositAmount").value || "0", "ether");
    if(value == 0) return;
    await contract.methods.deposit().send({from: account, value});
}

async function withdraw() {
    const value = web3.utils.toWei(document.getElementById("withdrawAmount").value || "0", "ether");
    if(value == 0) return;
    await contract.methods.withdraw(value).send({from: account});
}

async function claimDividends() {
    await contract.methods.claimDividends().send({from: account});
}

// ---------------------------
// RAFFLE
// ---------------------------
async function enterRaffle() {
    const tickets = Number(document.getElementById("raffleTickets").value);
    if(tickets <= 0) return;
    const value = web3.utils.toWei((tickets * 0.001).toString(), "ether");
    await contract.methods.enterRaffle(tickets).send({from: account, value});
}

// ---------------------------
// AUCTION
// ---------------------------
async function bidAuction() {
    const stats = await contract.methods.getAuctionStats().call();
    const nextBid = BigInt(stats.topBid || 0) + BigInt(await contract.methods.AUCTION_INCREMENT().call());
    await contract.methods.bidAuction().send({from: account, value: nextBid.toString()});
}

// ---------------------------
// UI Updates Loop
// ---------------------------
async function updateUI() {
    if(!contract || !account) return;

    // Dashboard
    const treasuryPool = web3.utils.fromWei(await contract.methods.treasuryPool().call(), "ether");
    const dividendPool = web3.utils.fromWei(await contract.methods.dividendPool().call(), "ether");
    const user = await contract.methods.users(account).call();
    const userStaked = web3.utils.fromWei(user.staked, "ether");
    const userDividends = web3.utils.fromWei(user.dividendsClaimed, "ether");
    const userShareBP = await contract.methods.getUserShare(account).call();
    document.getElementById("treasuryPool").textContent = Number(treasuryPool).toFixed(4);
    document.getElementById("dividendPool").textContent = Number(dividendPool).toFixed(4);
    document.getElementById("userStaked").textContent = Number(userStaked).toFixed(4);
    document.getElementById("userDividends").textContent = Number(userDividends).toFixed(4);
    document.getElementById("userShare").textContent = (userShareBP / 100).toFixed(2) + "%";

    document.getElementById("treasuryBar").style.width = Math.min(userStaked/treasuryPool*100,100)+"%";
    document.getElementById("dividendBar").style.width = Math.min(dividendPool/(treasuryPool+dividendPool)*100,100)+"%";
    document.getElementById("stakedBar").style.width = Math.min(userStaked/treasuryPool*100,100)+"%";

    // Raffle
    const raffle = await contract.methods.getRaffleStats().call();
    document.getElementById("rafflePrizePot").textContent = web3.utils.fromWei(raffle.prizePot,"ether");
    document.getElementById("raffleTicketsTotal").textContent = raffle.tickets;
    document.getElementById("raffleTimeLeft").textContent = formatTime(raffle.timeLeft);
    document.getElementById("raffleBar").style.width = Math.min(raffle.prizePot/5,"100") + "%"; 

    const winners = [];
    for(let i=0;i<5;i++){
        const addr = await contract.methods.lastRaffleWinners(i).call();
        const prize = await contract.methods.lastRafflePrizes(i).call();
        if(addr != "0x0000000000000000000000000000000000000000"){
            winners.push(`${addr}: ${web3.utils.fromWei(prize,"ether")} BNB`);
        }
    }
    document.getElementById("raffleWinners").innerHTML = winners.map(w=>`<li>${w}</li>`).join("");

    // Auction
    const auction = await contract.methods.getAuctionStats().call();
    document.getElementById("auctionPrizePot").textContent = web3.utils.fromWei(auction.prizePot,"ether");
    document.getElementById("auctionTopBid").textContent = web3.utils.fromWei(auction.topBid,"ether");
    document.getElementById("auctionTimeLeft").textContent = formatTime(auction.timeLeft);
    document.getElementById("auctionBar").style.width = Math.min(auction.prizePot/5,"100") + "%";
    document.getElementById("auctionLastBidders").innerHTML = auction.lastBidders.map(b=>`<li>${b}</li>`).join("");
}

// ---------------------------
// Format time helper
// ---------------------------
function formatTime(seconds){
    const h=Math.floor(seconds/3600);
    const m=Math.floor((seconds%3600)/60);
    const s=seconds%60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// ---------------------------
// Events listener
// ---------------------------
function listenEvents(){
    contract.events.Deposit({}, (err,event)=>{
        if(!err) addEventLog(`Deposito: ${event.returnValues.user} +${web3.utils.fromWei(event.returnValues.amountTreasury)} BNB`);
    });
    contract.events.Withdraw({}, (err,event)=>{
        if(!err) addEventLog(`Retiro: ${event.returnValues.user} -${web3.utils.fromWei(event.returnValues.amount)} BNB`);
    });
    contract.events.DividendsClaimed({}, (err,event)=>{
        if(!err) addEventLog(`Dividendos reclamados: ${event.returnValues.user} +${web3.utils.fromWei(event.returnValues.amount)} BNB`);
    });
    contract.events.RaffleEntered({}, (err,event)=>{
        if(!err) addEventLog(`Rifa: ${event.returnValues.user} ${event.returnValues.tickets} tickets`);
    });
    contract.events.RaffleClosed({}, (err,event)=>{
        if(!err) addEventLog(`Rifa cerrada. Ganadores: ${event.returnValues.winners.join(", ")}`);
    });
    contract.events.AuctionBid({}, (err,event)=>{
        if(!err) addEventLog(`Subasta: ${event.returnValues.user} pujó ${web3.utils.fromWei(event.returnValues.amount)} BNB`);
    });
    contract.events.AuctionClosed({}, (err,event)=>{
        if(!err) addEventLog(`Subasta cerrada. Ganadores: ${event.returnValues.winners.join(", ")}`);
    });
}

// ---------------------------
// Add event log
// ---------------------------
function addEventLog(msg){
    const div = document.getElementById("eventLogs");
    const p = document.createElement("p");
    p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    div.prepend(p);
}

// ---------------------------
// Update loop
// ---------------------------
function startUIUpdateLoop(){
    updateUI();
    setInterval(updateUI,5000);
}
