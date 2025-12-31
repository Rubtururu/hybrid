const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contract;
let account;
let auctionTimer = null;
let raffleTimer = null;

/* ---------- INIT ---------- */
window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    alert("Instala MetaMask");
  }
});

/* ---------- CONNECT ---------- */
async function connectWallet() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];
  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  document.getElementById("wallet").innerText = account;
  refreshAll();
  setInterval(refreshAll, 15000);
}

/* ---------- REFRESH ALL ---------- */
async function refreshAll() {
  if (!contract || !account) return;
  await Promise.all([
    loadGlobalStats(),
    loadUserStats(),
    loadAuction(),
    loadRaffle()
  ]);
}

/* ---------- GLOBAL STATS ---------- */
async function loadGlobalStats() {
  const [
    totalDeposited,
    totalWithdrawn,
    totalShares,
    dividendPool
  ] = await Promise.all([
    contract.methods.totalDeposited().call(),
    contract.methods.totalWithdrawn().call(),
    contract.methods.totalShares().call(),
    contract.methods.dividendPool().call()
  ]);

  setBNB("totalDeposited", totalDeposited);
  setBNB("totalWithdrawn", totalWithdrawn);
  document.getElementById("totalShares").innerText = fromWei(totalShares);
  setBNB("dividendPool", dividendPool);
}

/* ---------- USER STATS ---------- */
async function loadUserStats() {
  const u = await contract.methods.getUserStats(account).call();
  setBNB("userDeposited", u.deposited);
  setBNB("userWithdrawn", u.withdrawn);
  document.getElementById("userShares").innerText = fromWei(u.shares);
  setBNB("userClaimed", u.dividendsClaimed);
  setBNB("userPending", u.pending);

  const totalShares = await contract.methods.totalShares().call();
  const percent = totalShares > 0 ? (u.shares / totalShares) * 100 : 0;
  document.getElementById("userSharePercent").innerText = percent.toFixed(2) + "%";
}

/* ---------- AUCTION ---------- */
async function loadAuction() {
  const a = await contract.methods.getAuctionInfo().call();
  document.getElementById("auctionBid").innerText = fromWei(a.currentBid);
  renderCountdown("auctionCountdown", a.endTime, closeAuctionAuto);

  const list = document.getElementById("auctionTop");
  list.innerHTML = "";
  a.topBidders.forEach(addr => {
    if (addr !== "0x0000000000000000000000000000000000000000") {
      list.innerHTML += `<li>${addr}</li>`;
    }
  });

  const nextBid = BigInt(a.currentBid) + BigInt(web3.utils.toWei("0.001"));
  document.getElementById("nextBid").innerText = web3.utils.fromWei(nextBid.toString());
}

async function bidAuction() {
  const a = await contract.methods.getAuctionInfo().call();
  const nextBid = BigInt(a.currentBid) + BigInt(web3.utils.toWei("0.001"));
  await contract.methods.bidAuction().send({
    from: account,
    value: nextBid.toString()
  });
  refreshAll();
}

async function closeAuctionAuto() {
  try {
    await contract.methods.closeAuction().send({ from: account });
  } catch {}
}

/* ---------- RAFFLE ---------- */
async function loadRaffle() {
  const r = await contract.methods.getRaffleInfo().call();
  setBNB("rafflePot", r.prizePot);
  document.getElementById("raffleTicketsTotal").innerText = r.tickets.length;

  const myTickets = r.tickets.filter(
    t => t.toLowerCase() === account.toLowerCase()
  ).length;

  document.getElementById("raffleMyTickets").innerText = myTickets;

  const chance = r.tickets.length > 0
    ? (myTickets / r.tickets.length) * 5 * 100
    : 0;

  document.getElementById("raffleChance").innerText = chance.toFixed(2) + "%";
  renderCountdown("raffleCountdown", r.endTime, closeRaffleAuto);
}

async function enterRaffle() {
  const n = Number(document.getElementById("raffleTickets").value);
  const value = web3.utils.toWei((0.001 * n).toString());
  await contract.methods.enterRaffle(n).send({ from: account, value });
  refreshAll();
}

async function closeRaffleAuto() {
  try {
    await contract.methods.closeRaffle().send({ from: account });
  } catch {}
}

/* ---------- DIVIDENDS ---------- */
async function claimDividends() {
  await contract.methods.claimDividends().send({ from: account });
  refreshAll();
}

/* ---------- STAKING ---------- */
async function deposit() {
  const amt = document.getElementById("deposit").value;
  await contract.methods.deposit().send({
    from: account,
    value: web3.utils.toWei(amt)
  });
  refreshAll();
}

async function withdraw() {
  const amt = document.getElementById("withdraw").value;
  await contract.methods.withdraw(web3.utils.toWei(amt)).send({ from: account });
  refreshAll();
}

/* ---------- HELPERS ---------- */
function setBNB(id, wei) {
  document.getElementById(id).innerText = fromWei(wei) + " BNB";
}

function fromWei(v) {
  return Number(web3.utils.fromWei(v)).toFixed(4);
}

function renderCountdown(id, end, onFinish) {
  clearInterval(window[id]);
  window[id] = setInterval(() => {
    const diff = end - Math.floor(Date.now() / 1000);
    if (diff <= 0) {
      document.getElementById(id).innerText = "FINALIZANDO...";
      clearInterval(window[id]);
      onFinish();
    } else {
      const m = Math.floor(diff / 60);
      const s = diff % 60;
      document.getElementById(id).innerText = `${m}m ${s}s`;
    }
  }, 1000);
}
