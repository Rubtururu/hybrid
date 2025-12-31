const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let provider, signer, contract;
let account;

const connectBtn = document.getElementById("connectBtn");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const claimBtn = document.getElementById("claimBtn");
const bidBtn = document.getElementById("bidBtn");
const raffleBtn = document.getElementById("raffleBtn");

connectBtn.onclick = connect;
depositBtn.onclick = deposit;
withdrawBtn.onclick = withdraw;
claimBtn.onclick = claimDividends;
bidBtn.onclick = bidAuction;
raffleBtn.onclick = enterRaffle;

async function connect() {
    if (!window.ethereum) { alert("Instala MetaMask"); return; }
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    account = await signer.getAddress();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    document.getElementById("walletAddress").innerText = account;
    loadStats();
    setInterval(loadStats, 5000);
}

async function loadStats(){
    if(!contract || !account) return;

    // --- User Stats ---
    const user = await contract.users(account);
    const totalStaked = await contract.totalStaked();
    const dividendPool = await contract.dividendPool();
    const pending = totalStaked > 0 ? dividendPool * user.staked / totalStaked : 0;
    const sharePercent = totalStaked > 0 ? (user.staked*100/totalStaked).toFixed(2) : 0;

    document.getElementById("staked").innerText = ethers.formatEther(user.staked);
    document.getElementById("withdrawn").innerText = ethers.formatEther(user.withdrawn);
    document.getElementById("divClaimed").innerText = ethers.formatEther(user.dividendsClaimed);
    document.getElementById("pendingDiv").innerText = ethers.formatEther(pending);
    document.getElementById("sharePercent").innerText = sharePercent;

    // --- Dividend Pool ---
    document.getElementById("divPool").innerText = ethers.formatEther(dividendPool);
    const dailyDividend = dividendPool/100;
    document.getElementById("nextDividend").innerText = ethers.formatEther(dailyDividend);

    // Countdown to next dividend (simple 24h)
    const lastDay = await contract.lastDividendDay();
    let nextTime = Number(lastDay) + 24*3600;
    updateCountdown("divCountdown", nextTime);

    // --- Auction ---
    const auctionInfo = await contract.auction();
    document.getElementById("auctionActive").innerText = auctionInfo.active ? "Sí" : "No";
    document.getElementById("currentBid").innerText = ethers.formatEther(auctionInfo.currentBid || 0);
    document.getElementById("bidCount").innerText = auctionInfo.bidCount;
    updateCountdown("auctionCountdown", Number(auctionInfo.endTime));

    // --- Raffle ---
    const raffleInfo = await contract.raffle();
    document.getElementById("raffleActive").innerText = raffleInfo.active ? "Sí" : "No";
    document.getElementById("rafflePot").innerText = ethers.formatEther(raffleInfo.prizePot);
    document.getElementById("raffleCountdown").innerText = "--:--:--";

    // Por ahora no se obtiene top 5 ni tickets, puedes expandir con getRaffleInfo y getAuctionInfo si implementas esas funciones en el contrato
}

// --- Countdown Helper ---
function updateCountdown(id, target){
    function tick(){
        const now = Math.floor(Date.now()/1000);
        let diff = target - now;
        if(diff<0) diff=0;
        const h = Math.floor(diff/3600);
        const m = Math.floor((diff%3600)/60);
        const s = diff%60;
        document.getElementById(id).innerText = `${h}h ${m}m ${s}s`;
    }
    tick();
    setInterval(tick,1000);
}

// --- Actions ---
async function deposit(){
    const amt = document.getElementById("depositAmount").value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.deposit({value: ethers.parseEther(amt)});
    loadStats();
}

async function withdraw(){
    const amt = document.getElementById("withdrawAmount").value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.withdraw(ethers.parseEther(amt));
    loadStats();
}

async function claimDividends(){
    await contract.claimDividends();
    loadStats();
}

async function bidAuction(){
    await contract.bidAuction({value: ethers.parseEther("0.001")});
    loadStats();
}

async function enterRaffle(){
    const tickets = document.getElementById("ticketAmount").value;
    if(!tickets || isNaN(tickets)) return alert("Cantidad inválida");
    await contract.enterRaffle(tickets,{value: ethers.parseEther((tickets*0.001).toString())});
    loadStats();
}
