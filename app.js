const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountTreasury","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStaked","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingStaked","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctionBids","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionPrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"topBid","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"},{"internalType":"address[]","name":"lastBidders","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"tickets","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserShare","outputs":[{"internalType":"uint256","name":"stakingShareBP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionPrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRafflePrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRaffleWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAuctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"raffleTickets","outputs":[{"internalType":"address","name":"user","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setAuctionDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setDividendPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setRaffleDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contract;
let account = null;

window.addEventListener("load", async () => {
    initTabs();
    initButtons();
    await checkMetaMask();
    setInterval(updateStats, 5000);
});

function initTabs(){
    document.querySelectorAll(".tab").forEach(tab=>{
        tab.onclick=()=>{
            document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
            document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.target).classList.add("active");
        }
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

// --------------------
// CONNECT METAMASK
// --------------------
async function checkMetaMask(){
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    } else {
        alert("MetaMask no encontrada");
    }
}

async function connect(){
    const accounts = await ethereum.request({method:"eth_requestAccounts"});
    account = accounts[0];
    document.getElementById("accountDisplay").innerText = account;
    await updateStats();
}

// --------------------
// STAKING
// --------------------
async function deposit(){
    const amount = parseFloat(document.getElementById("depositAmount").value);
    if(!amount || amount <= 0) return alert("Ingresa cantidad válida");
    await contract.methods.deposit().send({from: account, value: web3.utils.toWei(amount.toString(),"ether")});
    await updateStats();
}

async function withdraw(){
    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    if(!amount || amount <= 0) return alert("Ingresa cantidad válida");
    await contract.methods.withdraw(web3.utils.toWei(amount.toString(),"ether")).send({from: account});
    await updateStats();
}

async function claimDividends(){
    await contract.methods.claimDividends().send({from: account});
    await updateStats();
}

// --------------------
// RAFFLE
// --------------------
async function enterRaffle(){
    const tickets = parseInt(document.getElementById("raffleTickets").value);
    if(!tickets || tickets <=0) return alert("Ingresa tickets válidos");
    const value = tickets * 0.001;
    await contract.methods.enterRaffle(tickets).send({from: account, value: web3.utils.toWei(value.toString(),"ether")});
    await updateStats();
}

// --------------------
// AUCTION
// --------------------
async function bidAuction(){
    await contract.methods.bidAuction().send({from: account, value: await contract.methods.getCurrentBid().call()});
    await updateStats();
}

// --------------------
// STATS
// --------------------
async function updateStats(){
    if(!account) return;
    const treasuryPool = await contract.methods.treasuryPool().call();
    const dividendPool = await contract.methods.dividendPool().call();
    const userStaked = await contract.methods.users(account).call().then(u=>u.staked);
    const userShare = await contract.methods.getUserShare(account).call();

    document.getElementById("treasuryPool").innerText = web3.utils.fromWei(treasuryPool);
    document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool);
    document.getElementById("userStaked").innerText = web3.utils.fromWei(userStaked);
    document.getElementById("userShare").innerText = userShare / 100;
    document.getElementById("userDividends").innerText = web3.utils.fromWei((await contract.methods.users(account).call()).dividendsClaimed);

    const raffleStats = await contract.methods.getRaffleStats().call();
    document.getElementById("rafflePrizePot").innerText = web3.utils.fromWei(raffleStats.prizePot);
    document.getElementById("raffleTicketsTotal").innerText = raffleStats.tickets;
    document.getElementById("raffleTimeLeft").innerText = raffleStats.timeLeft;

    const auctionStats = await contract.methods.getAuctionStats().call();
    document.getElementById("auctionPrizePot").innerText = web3.utils.fromWei(auctionStats.prizePot);
    document.getElementById("auctionTopBid").innerText = web3.utils.fromWei(auctionStats.topBid);
    document.getElementById("auctionTimeLeft").innerText = auctionStats.timeLeft;

    const raffleWinnersEl = document.getElementById("raffleWinners");
    raffleWinnersEl.innerHTML = "";
    try{
        const winners = await contract.methods.lastRaffleWinners().call();
        winners.forEach(w=>{
            if(w!="0x0000000000000000000000000000000000000000") raffleWinnersEl.innerHTML += `<li>${w}</li>`;
        });
    } catch{}

    const auctionBiddersEl = document.getElementById("auctionLastBidders");
    auctionBiddersEl.innerHTML = "";
    try{
        const lastBidders = auctionStats.lastBidders;
        lastBidders.forEach(b=>auctionBiddersEl.innerHTML += `<li>${b}</li>`);
    } catch{}
}
