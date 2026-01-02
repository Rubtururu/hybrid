/* ================= CONFIG ================= */

const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const BNB_PRICE_USD = 600; // puedes actualizarlo dinámicamente si quieres

let web3;
let contract;
let account;

/* ================= ABI ================= */

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

/* ================= INIT ================= */

window.addEventListener("load", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask no detectado");
    return;
  }

  web3 = new Web3(window.ethereum);

  document.getElementById("connectBtn").onclick = connectWallet;
  setInterval(updateCountdowns, 1000);
});

/* ================= WALLET ================= */

async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account = accounts[0];
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    document.getElementById("wallet").innerText =
      account.slice(0, 6) + "..." + account.slice(-4);

    loadAllData();
    loadEvents();
  } catch (e) {
    console.error("MetaMask error:", e);
  }
}

/* ================= LOAD ALL ================= */

async function loadAllData() {
  await Promise.all([
    loadGlobalStats(),
    loadUserStats(),
    loadAuction(),
    loadRaffle(),
  ]);
}

/* ================= GLOBAL STATS ================= */

async function loadGlobalStats() {
  const totalStaked = await contract.methods.totalStaked().call();
  const dividendPool = await contract.methods.dividendPool().call();

  setBNB("totalStaked", totalStaked);
  setBNB("dividendPool", dividendPool);
}

/* ================= USER STATS ================= */

async function loadUserStats() {
  const u = await contract.methods.users(account).call();

  setBNB("userStaked", u.staked);
  setBNB("userWithdrawn", u.withdrawn);
  setBNB("userClaimed", u.dividendsClaimed);

  document.getElementById("userBoost").innerText = u.dailyBoost + "%";

  const totalStaked = await contract.methods.totalStaked().call();
  const effective =
    Number(u.staked) * (1 + Number(u.dailyBoost) / 100);

  const percent =
    totalStaked > 0 ? (effective / totalStaked) * 100 : 0;

  document.getElementById("userShare").innerText =
    percent.toFixed(2) + "%";
}

/* ================= AUCTION ================= */

let auctionEnd = 0;

async function loadAuction() {
  const a = await contract.methods.auction().call();
  auctionEnd = Number(a.endTime) * 1000;

  document.getElementById("auctionBidCount").innerText = a.bidCount;

  const increment = await contract.methods.AUCTION_INCREMENT().call();
  const nextBid =
    Number(a.bidCount) * Number(increment);

  setBNB("nextBid", nextBid);
}

async function bidAuction() {
  const increment = await contract.methods.AUCTION_INCREMENT().call();
  const a = await contract.methods.auction().call();
  const value = Number(a.bidCount) * Number(increment);

  await contract.methods.bidAuction().send({
    from: account,
    value: value,
  });

  loadAuction();
}

/* ================= RAFFLE ================= */

let raffleEnd = 0;
let raffleTickets = [];

async function loadRaffle() {
  const r = await contract.methods.raffle().call();
  raffleEnd = Number(r.endTime) * 1000;

  setBNB("rafflePot", r.prizePot);

  raffleTickets = await getRaffleTickets();
  document.getElementById("totalTickets").innerText =
    raffleTickets.length;

  const myTickets = raffleTickets.filter(
    (a) => a.toLowerCase() === account.toLowerCase()
  ).length;

  document.getElementById("myTickets").innerText = myTickets;

  const chance =
    raffleTickets.length > 0
      ? ((myTickets / raffleTickets.length) * 100).toFixed(2)
      : "0.00";

  document.getElementById("winChance").innerText = chance + "%";
}

async function buyTickets() {
  const qty = Number(document.getElementById("ticketQty").value);
  const price = await contract.methods.RAFFLE_TICKET_PRICE().call();
  const value = qty * price;

  await contract.methods.enterRaffle(qty).send({
    from: account,
    value: value,
  });

  loadRaffle();
}

/* ================= EVENTS ================= */

async function loadEvents() {
  const events = await contract.getPastEvents("allEvents", {
    fromBlock: "latest",
    toBlock: "pending",
  });

  const last = events.slice(-10).reverse();
  const box = document.getElementById("events");
  box.innerHTML = "";

  last.forEach((e) => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerText = e.event;
    box.appendChild(div);
  });
}

/* ================= COUNTDOWNS ================= */

function updateCountdowns() {
  updateTimer("auctionTimer", auctionEnd);
  updateTimer("raffleTimer", raffleEnd);
}

function updateTimer(id, end) {
  if (!end) return;
  const now = Date.now();
  const diff = end - now;
  if (diff <= 0) {
    document.getElementById(id).innerText = "Ended";
    return;
  }

  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById(id).innerText = `${m}m ${s}s`;
}

/* ================= HELPERS ================= */

function setBNB(id, wei) {
  const bnb = web3.utils.fromWei(wei, "ether");
  const usd = (bnb * BNB_PRICE_USD).toFixed(2);
  document.getElementById(id).innerText =
    `${Number(bnb).toFixed(4)} BNB ($${usd})`;
}
