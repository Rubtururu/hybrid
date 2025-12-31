// app.js
const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let provider, signer, contract, account;
let intervalStats;

// Botones
const connectBtn = document.getElementById("connectBtn");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const claimBtn = document.getElementById("claimBtn");
const auctionBidBtn = document.getElementById("auctionBidBtn");
const raffleEnterBtn = document.getElementById("raffleEnterBtn");

connectBtn.onclick = connect;
depositBtn.onclick = deposit;
withdrawBtn.onclick = withdraw;
claimBtn.onclick = claimDividends;
auctionBidBtn.onclick = bidAuction;
raffleEnterBtn.onclick = enterRaffle;

// ---------- CONNECT ----------
async function connect() {
    if (!window.ethereum) {
        alert("Instala MetaMask");
        return;
    }

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        account = await signer.getAddress();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        alert("Wallet conectada: " + account);

        loadAllStats();
        if (intervalStats) clearInterval(intervalStats);
        intervalStats = setInterval(loadAllStats, 1000);
    } catch (err) {
        alert("Error MetaMask: " + err.message);
    }
}

// ---------- STATS ----------
async function loadAllStats() {
    if (!contract || !account) return;

    try {
        // Usuario
        const userStats = await contract.users(account);
        const totalStaked = await contract.totalStaked();
        const dividendPool = await contract.dividendPool();

        // Subasta
        const auctionInfo = await contract.auction();
        const raffleInfo = await contract.raffle();
        const lastDividendDay = await contract.lastDividendDay();
        const dailyPercent = await contract.DAILY_DIVIDEND_PERCENT();

        // Update HTML
        document.getElementById("staked").innerText = ethers.utils.formatEther(userStats.staked);
        document.getElementById("withdrawn").innerText = ethers.utils.formatEther(userStats.withdrawn);
        document.getElementById("dividendsClaimed").innerText = ethers.utils.formatEther(userStats.dividendsClaimed);

        // Share %
        const sharePercent = totalStaked.gt(0) ? userStats.staked.mul(100).div(totalStaked) : 0;
        document.getElementById("sharePercent").innerText = sharePercent.toString() + "%";

        // Dividendos diarios
        const dailyDividend = dividendPool.mul(dailyPercent).div(100);
        document.getElementById("dailyDividend").innerText = ethers.utils.formatEther(dailyDividend);

        // Countdown next dividend
        const now = Math.floor(Date.now() / 1000);
        const nextDividendSec = (lastDividendDay.toNumber() + 24*3600) - now;
        document.getElementById("nextDividendCountdown").innerText = formatTime(nextDividendSec);

        // Subasta
        document.getElementById("auctionBidCount").innerText = auctionInfo.bidCount.toString();
        document.getElementById("auctionCurrentBid").innerText = ethers.utils.formatEther(auctionInfo.currentBid || 0);
        const auctionCountdown = auctionInfo.endTime.toNumber() - now;
        document.getElementById("auctionCountdown").innerText = formatTime(auctionCountdown);

        // Rifa
        document.getElementById("rafflePrizePot").innerText = ethers.utils.formatEther(raffleInfo.prizePot || 0);
        const raffleCountdown = raffleInfo.endTime.toNumber() - now;
        document.getElementById("raffleCountdown").innerText = formatTime(raffleCountdown);
        const myTickets = raffleInfo.tickets.filter(t => t.toLowerCase() === account.toLowerCase()).length;
        document.getElementById("myRaffleTickets").innerText = myTickets;
        document.getElementById("totalRaffleTickets").innerText = raffleInfo.tickets.length;
        const raffleSharePercent = raffleInfo.tickets.length > 0 ? Math.floor(myTickets*100/raffleInfo.tickets.length) : 0;
        document.getElementById("raffleSharePercent").innerText = raffleSharePercent + "%";

    } catch (err) {
        console.error(err);
    }
}

function formatTime(sec) {
    if (sec < 0) return "0h 0m 0s";
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
}

// ---------- ACTIONS ----------
async function deposit() {
    const amt = document.getElementById("amount").value;
    if (!amt || isNaN(amt)) return alert("Cantidad inválida");
    const tx = await contract.deposit({ value: ethers.utils.parseEther(amt) });
    await tx.wait();
    loadAllStats();
}

async function withdraw() {
    const amt = document.getElementById("amount").value;
    if (!amt || isNaN(amt)) return alert("Cantidad inválida");
    const tx = await contract.withdraw(ethers.utils.parseEther(amt));
    await tx.wait();
    loadAllStats();
}

async function claimDividends() {
    const tx = await contract.claimDividends();
    await tx.wait();
    loadAllStats();
}

async function bidAuction() {
    const tx = await contract.bidAuction({ value: ethers.utils.parseEther("0.001") });
    await tx.wait();
    loadAllStats();
}

async function enterRaffle() {
    const tickets = parseInt(document.getElementById("raffleTickets").value);
    if (!tickets || tickets <= 0) return alert("Número inválido de tickets");
    const value = ethers.utils.parseEther((tickets*0.001).toString());
    const tx = await contract.enterRaffle(tickets, { value });
    await tx.wait();
    loadAllStats();
}
