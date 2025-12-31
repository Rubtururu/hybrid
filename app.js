/* ================== CONFIG ================== */

const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let provider;
let signer;
let contract;
let userAddress;

/* ================== INIT ================== */

async function init() {
    if (!window.ethereum) {
        alert("MetaMask no detectado");
        return;
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();

    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    document.getElementById("wallet").innerText = short(userAddress);

    await refreshAll();
    listenEvents();
}

/* ================== HELPERS ================== */

function short(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function eth(v) {
    return Number(ethers.formatEther(v)).toFixed(6);
}

function countdown(ts) {
    const now = Math.floor(Date.now() / 1000);
    const diff = ts - now;
    if (diff <= 0) return "Finalizando...";
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return `${m}m ${s}s`;
}

/* ================== REFRESH ================== */

async function refreshAll() {
    await Promise.all([
        loadGlobalStats(),
        loadUserStats(),
        loadRaffle(),
        loadAuction()
    ]);
}

/* ================== GLOBAL STATS ================== */

async function loadGlobalStats() {
    const totalStaked = await contract.totalStaked();
    const dividendPool = await contract.dividendPool();
    const dailyPercent = await contract.DAILY_DIVIDEND_PERCENT();

    document.getElementById("totalStaked").innerText = eth(totalStaked);
    document.getElementById("dividendPool").innerText = eth(dividendPool);
    document.getElementById("dailyPercent").innerText = dailyPercent + "%";
}

/* ================== USER STATS ================== */

async function loadUserStats() {
    const u = await contract.users(userAddress);
    const totalStaked = await contract.totalStaked();
    const dividendPool = await contract.dividendPool();

    document.getElementById("myStaked").innerText = eth(u.staked);
    document.getElementById("myWithdrawn").innerText = eth(u.withdrawn);
    document.getElementById("myClaimed").innerText = eth(u.dividendsClaimed);
    document.getElementById("myBoost").innerText = u.dailyBoost + "%";

    let sharePct = 0;
    if (totalStaked > 0n) {
        sharePct = Number(u.staked * 10000n / totalStaked) / 100;
    }

    document.getElementById("myShare").innerText = sharePct + "%";

    let dailyDiv = 0;
    if (totalStaked > 0n) {
        const boosted = u.staked * BigInt(100 + u.dailyBoost) / 100n;
        dailyDiv = (dividendPool / 100n) * boosted / totalStaked;
    }

    document.getElementById("myDailyDiv").innerText = eth(dailyDiv);
}

/* ================== RAFFLE ================== */

async function loadRaffle() {
    const r = await contract.raffle();
    const price = await contract.RAFFLE_TICKET_PRICE();

    document.getElementById("rafflePot").innerText = eth(r.prizePot);
    document.getElementById("raffleCountdown").innerText = countdown(Number(r.endTime));

    const tickets = await contract.queryFilter(
        contract.filters.RaffleEntered(userAddress)
    );

    let myTickets = 0;
    tickets.forEach(e => myTickets += Number(e.args.tickets));

    document.getElementById("myTickets").innerText = myTickets;

    const allTickets = await provider.call({
        to: CONTRACT_ADDRESS,
        data: contract.interface.encodeFunctionData("raffle")
    });

    document.getElementById("raffleTicketPrice").innerText = eth(price);

    let chance = 0;
    if (myTickets > 0) {
        chance = (myTickets / Math.max(1, myTickets)) * 100;
    }

    document.getElementById("raffleChance").innerText = chance.toFixed(2) + "%";
}

/* ================== AUCTION ================== */

async function loadAuction() {
    const a = await contract.auction();
    const inc = await contract.AUCTION_INCREMENT();

    const nextBid = inc * BigInt(a.bidCount + 1);

    document.getElementById("auctionCountdown").innerText = countdown(Number(a.endTime));
    document.getElementById("auctionBidCount").innerText = a.bidCount;
    document.getElementById("nextBid").innerText = eth(nextBid);

    const bids = await contract.queryFilter(contract.filters.AuctionBid());
    const last5 = bids.slice(-5).reverse();

    const list = document.getElementById("auctionTop");
    list.innerHTML = "";
    last5.forEach(b => {
        const li = document.createElement("li");
        li.innerText = short(b.args.user);
        list.appendChild(li);
    });
}

/* ================== ACTIONS ================== */

async function deposit() {
    const val = document.getElementById("depositAmount").value;
    await contract.deposit({ value: ethers.parseEther(val) });
    await refreshAll();
}

async function withdraw() {
    const val = document.getElementById("withdrawAmount").value;
    await contract.withdraw(ethers.parseEther(val));
    await refreshAll();
}

async function claimDividends() {
    await contract.claimDividends();
    await refreshAll();
}

async function enterRaffle() {
    const t = Number(document.getElementById("raffleTickets").value);
    const price = await contract.RAFFLE_TICKET_PRICE();
    await contract.enterRaffle(t, { value: price * BigInt(t) });
    await refreshAll();
}

async function bidAuction() {
    await contract.bidAuction();
    await refreshAll();
}

/* ================== EVENTS ================== */

function listenEvents() {
    contract.on("Deposit", refreshAll);
    contract.on("Withdraw", refreshAll);
    contract.on("DividendsClaimed", refreshAll);
    contract.on("RaffleEntered", refreshAll);
    contract.on("RaffleClosed", refreshAll);
    contract.on("AuctionBid", refreshAll);
    contract.on("AuctionClosed", refreshAll);
}

/* ================== METAMASK ================== */

document.getElementById("connect").onclick = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    await init();
};
