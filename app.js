// ------------------- CONFIG -------------------
const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let provider, signer, contract, account;
let dividendTimer, auctionTimer, raffleTimer;

// ------------------- CONEXIÓN -------------------
async function connect() {
    try {
        if (!window.ethereum) { alert("Instala MetaMask"); return; }
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        account = await signer.getAddress();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        document.getElementById("connectBtn").innerText = `Wallet: ${account}`;
        loadStats();
        startTimers();
        console.log("Conectado con MetaMask:", account);
    } catch(e) {
        alert("Error MetaMask: " + e.message);
    }
}

// ------------------- ESTADÍSTICAS -------------------
async function loadStats() {
    if (!contract) return;

    try {
        // ---------- Datos de staking ----------
        const [totalStaked, dividendPool, lastDividendDay] = await Promise.all([
            contract.totalStaked(),
            contract.dividendPool(),
            contract.lastDividendDay()
        ]);

        const user = await contract.users(account);
        const userStats = await contract.getUserStats(account);

        document.getElementById("totalStaked").innerText = ethers.formatEther(totalStaked);
        document.getElementById("dividendPool").innerText = ethers.formatEther(dividendPool);
        document.getElementById("deposited").innerText = ethers.formatEther(userStats.deposited);
        document.getElementById("withdrawn").innerText = ethers.formatEther(userStats.withdrawn);
        document.getElementById("dividendsClaimed").innerText = ethers.formatEther(userStats.dividendsClaimed);
        document.getElementById("pendingDividends").innerText = ethers.formatEther(userStats.pending);

        // Calcula % de share
        const totalShares = await contract.totalStaked(); // el staking total define shares
        const userSharePercent = totalShares > 0 ? (userStats.shares / totalShares * 100).toFixed(2) : 0;
        document.getElementById("sharePercent").innerText = userSharePercent + "%";

        // ---------- Datos de subasta ----------
        const auctionInfo = await contract.auction();
        document.getElementById("auctionEndTime").innerText = new Date(auctionInfo.endTime * 1000).toLocaleString();
        document.getElementById("auctionBidCount").innerText = auctionInfo.bidCount;
        document.getElementById("auctionActive").innerText = auctionInfo.active ? "Activa" : "Cerrada";

        // ---------- Datos de rifa ----------
        const raffleInfo = await contract.raffle();
        document.getElementById("raffleEndTime").innerText = new Date(raffleInfo.endTime * 1000).toLocaleString();
        document.getElementById("rafflePrizePot").innerText = ethers.formatEther(raffleInfo.prizePot);
        document.getElementById("raffleActive").innerText = raffleInfo.active ? "Activa" : "Cerrada";

        // Número de tickets del usuario y total
        const tickets = await contract.getRaffleInfo();
        const userTickets = tickets.tickets.filter(t => t.toLowerCase() === account.toLowerCase()).length;
        document.getElementById("userTickets").innerText = userTickets;
        document.getElementById("totalTickets").innerText = tickets.tickets.length;

    } catch(err) {
        console.error("Error cargando stats:", err);
    }
}

// ------------------- BOTONES -------------------
async function deposit() {
    const amt = document.getElementById("depositAmount").value;
    if (!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.deposit({ value: ethers.parseEther(amt) });
    loadStats();
}

async function withdraw() {
    const amt = document.getElementById("withdrawAmount").value;
    if (!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.withdraw(ethers.parseEther(amt));
    loadStats();
}

async function claimDividends() {
    await contract.claimDividends();
    loadStats();
}

async function bidAuction() {
    await contract.bidAuction({ value: await contract.AUCTION_INCREMENT() });
    loadStats();
}

async function enterRaffle() {
    const numTickets = parseInt(document.getElementById("raffleTickets").value);
    if (!numTickets || numTickets <= 0) return alert("Cantidad inválida");
    await contract.enterRaffle(numTickets, { value: ethers.parseEther((0.001 * numTickets).toString()) });
    loadStats();
}

// ------------------- CUENTAS ATRÁS -------------------
function startTimers() {
    if (dividendTimer) clearInterval(dividendTimer);
    dividendTimer = setInterval(updateTimers, 1000);
}

async function updateTimers() {
    if (!contract) return;

    const now = Math.floor(Date.now() / 1000);

    // Dividend countdown
    const lastDividendDay = await contract.lastDividendDay();
    const nextDividend = lastDividendDay + 86400; // 24h
    const diffDiv = nextDividend - now;
    document.getElementById("dividendCountdown").innerText = secondsToHMS(diffDiv);

    // Auction countdown
    const auctionInfo = await contract.auction();
    const diffAuction = auctionInfo.endTime - now;
    document.getElementById("auctionCountdown").innerText = secondsToHMS(diffAuction);

    // Raffle countdown
    const raffleInfo = await contract.raffle();
    const diffRaffle = raffleInfo.endTime - now;
    document.getElementById("raffleCountdown").innerText = secondsToHMS(diffRaffle);
}

function secondsToHMS(seconds) {
    if (seconds < 0) return "0h 0m 0s";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

// ------------------- EVENTOS -------------------
document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claimDividends;
document.getElementById("auctionBidBtn").onclick = bidAuction;
document.getElementById("raffleEnterBtn").onclick = enterRaffle;

// Auto-refresh stats cada 15 segundos
setInterval(loadStats, 15000);
