const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountTreasury","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStaked","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingStaked","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctionBids","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionPrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"topBid","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"},{"internalType":"address[]","name":"lastBidders","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"tickets","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserShare","outputs":[{"internalType":"uint256","name":"stakingShareBP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionPrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRafflePrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRaffleWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAuctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"raffleTickets","outputs":[{"internalType":"address","name":"user","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setAuctionDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setDividendPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setRaffleDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account;

// ---------------------------------- INIT ----------------------------------
window.addEventListener("load", ()=> {
    initTabs();
    initButtons();
});

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

function initButtons(){
    document.getElementById("connectBtn").onclick = connect;
    document.getElementById("depositBtn").onclick = deposit;
    document.getElementById("withdrawBtn").onclick = withdraw;
    document.getElementById("claimBtn").onclick = claimDividends;
    document.getElementById("raffleBtn").onclick = enterRaffle;
    document.getElementById("bidBtn").onclick = bidAuction;
}

// ------------------------------ CONNECT ------------------------------
async function connect(){
    if(!window.ethereum){ alert("MetaMask no encontrado"); return; }
    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({method:"eth_requestAccounts"});
    account = accounts[0];
    document.getElementById("accountDisplay").textContent = account;
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    updateAllStats();
    setInterval(updateAllStats,3000);
    listenEvents();
}

// ------------------------------ DASHBOARD ------------------------------
async function updateDashboard(){
    const totalStaked = await contract.methods.treasuryPool().call();
    const dividendPool = await contract.methods.dividendPool().call();
    const user = await contract.methods.users(account).call();
    const userShareBP = await contract.methods.getUserShare(account).call();

    document.getElementById("totalStaked").textContent = web3.utils.fromWei(totalStaked,"ether");
    document.getElementById("dividendPool").textContent = web3.utils.fromWei(dividendPool,"ether");
    document.getElementById("myStaked").textContent = web3.utils.fromWei(user.staked,"ether");
    document.getElementById("userShare").textContent = (userShareBP/100).toFixed(2)+"%";
}

async function deposit(){
    const val = document.getElementById("depositAmount").value;
    if(!val || val<=0) { alert("Ingresa un valor válido"); return; }
    await contract.methods.deposit().send({from:account,value:web3.utils.toWei(val.toString(),"ether")});
}
async function withdraw(){
    const val = document.getElementById("withdrawAmount").value;
    if(!val || val<=0) { alert("Ingresa un valor válido"); return; }
    await contract.methods.withdraw(web3.utils.toWei(val.toString(),"ether")).send({from:account});
}
async function claimDividends(){ await contract.methods.claimDividends().send({from:account}); }

// ------------------------------ RAFFLE ------------------------------
async function updateRaffle(){
    const stats = await contract.methods.getRaffleStats().call();
    document.getElementById("rafflePrizePot").textContent = web3.utils.fromWei(stats.prizePot,"ether");
    document.getElementById("raffleTicketsTotal").textContent = stats.tickets;

    let myTickets = 0;
    for(let i=0;i<stats.tickets;i++){
        const t = await contract.methods.raffleTickets(i).call();
        if(t.user.toLowerCase()===account.toLowerCase()) myTickets++;
    }
    document.getElementById("myRaffleTickets").textContent = myTickets;
    const share = stats.tickets>0 ? ((myTickets/stats.tickets)*100).toFixed(2) : 100;
    document.getElementById("raffleUserShare").textContent = share+"%";

    // Temporizador
    document.getElementById("raffleTimeLeft").textContent = stats.timeLeft;
}
async function enterRaffle(){
    const tickets = parseInt(document.getElementById("raffleTicketsInput").value);
    if(!tickets || tickets<=0) { alert("Cantidad inválida"); return; }
    const value = web3.utils.toWei((tickets*0.001).toString(),"ether");
    await contract.methods.enterRaffle(tickets).send({from:account,value});
}

// ------------------------------ AUCTION ------------------------------
async function updateAuction(){
    const stats = await contract.methods.getAuctionStats().call();
    document.getElementById("auctionPrizePot").textContent = web3.utils.fromWei(stats.prizePot,"ether");
    document.getElementById("auctionTopBid").textContent = web3.utils.fromWei(stats.topBid,"ether");
    const lastBidders = stats.lastBidders.map(a=>a.substring(0,6)+"..."+a.slice(-4)).join(", ");
    document.getElementById("auctionLastBidders").textContent = lastBidders;

    // Calcula siguiente puja
    const increment = BigInt(await contract.methods.AUCTION_INCREMENT().call());
    const nextBid = stats.topBid==0 ? increment : BigInt(stats.topBid)+increment;
    document.getElementById("nextBid").textContent = web3.utils.fromWei(nextBid.toString(),"ether");
}
async function bidAuction(){
    const nextBid = web3.utils.toWei(document.getElementById("nextBid").textContent,"ether");
    await contract.methods.bidAuction().send({from:account,value:nextBid});
}

// ------------------------------ LOGS ------------------------------
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
            addEventLog(lt.event,e.returnValues,lt.color);
        });
    });
}

function addEventLog(type,data,color){
    const log = document.createElement("div");
    log.style.color = color;
    let text = "";
    switch(type){
        case "Deposit": text=`Deposito: ${data.user} +${web3.utils.fromWei(data.amountTreasury||"0")} BNB`; break;
        case "Withdraw": text=`Retiro: ${data.user} -${web3.utils.fromWei(data.amount||"0")} BNB`; break;
        case "DividendsClaimed": text=`Dividendos: ${data.user} +${web3.utils.fromWei(data.amount||"0")} BNB`; break;
        case "RaffleEntered": text=`Rifa: ${data.user} compró ${data.tickets} tickets`; break;
        case "RaffleClosed": text=`Rifa cerrada. Ganadores: ${data.winners.join(", ")}`; break;
        case "AuctionBid": text=`Subasta: ${data.user} pujó ${web3.utils.fromWei(data.amount||"0")} BNB`; break;
        case "AuctionClosed": text=`Subasta cerrada. Ganadores: ${data.winners.join(", ")}`; break;
    }
    log.textContent = text;
    document.getElementById("eventLogs").prepend(log);
}

// ------------------------------ UPDATE ALL ------------------------------
async function updateAllStats(){
    if(!contract || !account) return;
    await updateDashboard();
    await updateRaffle();
    await updateAuction();
}
