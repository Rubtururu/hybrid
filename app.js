const CONTRACT = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const BNB_USD = 870;

let web3, contract, account;

// ---------- CONNECT ----------
document.getElementById("connectBtn").onclick = async () => {
  if (!window.ethereum) return alert("Install MetaMask");

  web3 = new Web3(window.ethereum);
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];

  contract = new web3.eth.Contract(ABI, CONTRACT);
  loadAll();
};

// ---------- LOAD ----------
async function loadAll() {
  loadStats();
  loadUser();
  loadRaffle();
  loadAuction();
  loadEvents();
}

async function loadStats() {
  const pool = await contract.methods.dividendPool().call();
  const staked = await contract.methods.totalStaked().call();

  set("divPool", pool);
  set("totalStaked", staked);

  const daily = pool * 1 / 100;
  document.getElementById("dailyPrizeBNB").innerText = web3.utils.fromWei(daily.toString());
  document.getElementById("dailyPrizeUSD").innerText = (daily / 1e18 * BNB_USD).toFixed(2);
}

async function loadUser() {
  const u = await contract.methods.users(account).call();
  const pending = await contract.methods.dividendPool().call() * u.staked / await contract.methods.totalStaked().call();

  set("myStake", u.staked);
  set("pendingDivs", pending);

  const share = u.staked > 0 ? (u.staked * 100 / await contract.methods.totalStaked().call()) : 0;
  document.getElementById("myShare").innerText = share.toFixed(2);
}

async function loadRaffle() {
  const r = await contract.methods.raffle().call();
  set("rafflePrize", r.prizePot);
  startCountdown("raffleCountdown", r.endTime);
}

async function loadAuction() {
  const a = await contract.methods.auction().call();
  const next = (Number(a.bidCount) + 1) * 0.001;
  document.getElementById("nextBid").innerText = next.toFixed(3);
  startCountdown("auctionCountdown", a.endTime);
}

// ---------- HELPERS ----------
function set(id, wei) {
  document.getElementById(id).innerText = web3.utils.fromWei(wei.toString());
}

function startCountdown(id, end) {
  setInterval(() => {
    const diff = end - Math.floor(Date.now() / 1000);
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600);
    const m = Math.floor(diff % 3600 / 60);
    const s = diff % 60;
    document.getElementById(id).innerText = `${h}h ${m}m ${s}s`;
  }, 1000);
}
