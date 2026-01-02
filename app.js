/*************************
 * CONFIG
 *************************/
const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountTreasury","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStaked","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingStaked","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctionBids","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionPrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"topBid","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"},{"internalType":"address[]","name":"lastBidders","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"tickets","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserShare","outputs":[{"internalType":"uint256","name":"stakingShareBP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionPrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRafflePrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRaffleWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAuctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"raffleTickets","outputs":[{"internalType":"address","name":"user","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setAuctionDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setDividendPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setRaffleDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

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
 * TABS SPA
 *************************/
function initTabs(){
    document.querySelectorAll(".tab").forEach(tab=>{
        tab.onclick = () => {
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
    const accounts = await ethereum.request({ method:"eth_requestAccounts" });
    account = accounts[0];
    document.getElementById("accountDisplay").textContent = account;
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    // Iniciar actualización de stats
    updateAllStats();
    setInterval(updateAllStats, 3000);
    listenEvents();
}

/*************************
 * DASHBOARD FUNCTIONS
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
}

async function deposit(){
    const amount = web3.utils.toWei("0.01","ether");
    await contract.methods.deposit().send({from: account, value: amount});
}

async function withdraw(){
    const amount = web3.utils.toWei("0.01","ether");
    await contract.methods.withdraw(amount).send({from: account});
}

async function claimDividends(){
    await contract.methods.claimDividends().send({from: account});
}

/*************************
 * RAFFLE FUNCTIONS
 *************************/
async function updateRaffle(){
    const stats = await contract.methods.getRaffleStats().call();
    document.getElementById("rafflePrizePot").textContent = web3.utils.fromWei(stats.prizePot,"ether");
    document.getElementById("raffleTicketsTotal").textContent = stats.tickets;

    // calcular % share del usuario
    let userTickets = 0;
    const ticketsCount = parseInt(stats.tickets);
    for(let i=0;i<ticketsCount;i++){
        const t = await contract.methods.raffleTickets(i).call();
        if(t.user.toLowerCase() === account.toLowerCase()) userTickets++;
    }
    const share = ticketsCount>0 ? ((userTickets/ticketsCount)*100).toFixed(2) : 0;
    document.getElementById("raffleUserShare").textContent = share+"%";
}

async function enterRaffle(){
    const tickets = parseInt(document.getElementById("raffleTicketsInput").value);
    if(isNaN(tickets) || tickets <= 0){ alert("Cantidad inválida"); return; }
    const value = web3.utils.toWei((tickets*0.001).toString(),"ether");
    await contract.methods.enterRaffle(tickets).send({from: account, value});
}

/*************************
 * AUCTION FUNCTIONS
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
    const nextBid = topBid === 0n ? increment : topBid + increment;
    await contract.methods.bidAuction().send({from: account, value: nextBid.toString()});
}

/*************************
 * EVENTS LOG
 *************************/
function listenEvents(){
    contract.events.Deposit({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Deposito: ${e.returnValues.user} +${web3.utils.fromWei(e.returnValues.amountTreasury)} BNB`);
    });
    contract.events.Withdraw({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Retiro: ${e.returnValues.user} -${web3.utils.fromWei(e.returnValues.amount)} BNB`);
    });
    contract.events.DividendsClaimed({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Dividendos reclamados: ${e.returnValues.user} +${web3.utils.fromWei(e.returnValues.amount)} BNB`);
    });
    contract.events.RaffleEntered({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Rifa: ${e.returnValues.user} compró ${e.returnValues.tickets} tickets`);
    });
    contract.events.RaffleClosed({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Rifa cerrada. Ganadores: ${e.returnValues.winners.join(", ")}`);
    });
    contract.events.AuctionBid({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Subasta: ${e.returnValues.user} pujó ${web3.utils.fromWei(e.returnValues.amount)} BNB`);
    });
    contract.events.AuctionClosed({fromBlock:'latest'}).on('data', e=>{
        addEventLog(`Subasta cerrada. Ganadores: ${e.returnValues.winners.join(", ")}`);
    });
}

function addEventLog(text){
    const log = document.createElement("div");
    log.textContent = text;
    document.getElementById("eventLogs").prepend(log);
}

/*************************
 * UPDATE ALL STATS
 *************************/
async function updateAllStats(){
    if(!contract || !account) return;
    await updateDashboard();
    await updateRaffle();
    await updateAuction();
}
