/*************************
 * CONFIG
 *************************/
const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const BNB_USD = 870;

/*************************
 * GLOBALS
 *************************/
let web3;
let contract;
let account = null;

/*************************
 * ON LOAD
 *************************/
window.addEventListener("load", () => {
  initTabs();
  initButtons();
});

/*************************
 * TABS SPA
 *************************/
function initTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    };
  });
}

/*************************
 * BUTTONS
 *************************/
function initButtons() {
  $("#connectBtn").onclick = connect;
  $("#depositBtn").onclick = deposit;
  $("#withdrawBtn").onclick = withdraw;
  $("#claimBtn").onclick = claim;
  $("#raffleBtn").onclick = enterRaffle;
  $("#bidBtn").onclick = bidAuction;
}

/*************************
 * CONNECT METAMASK
 *************************/
async function connect() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  web3 = new Web3(window.ethereum);
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];

  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  $("#connectBtn").innerText =
    account.slice(0, 6) + "..." + account.slice(-4);

  await loadAll();
}

/*************************
 * LOAD ALL
 *************************/
async function loadAll() {
  await loadGlobals();
  await loadUser();
  await loadAuction();
  await loadRaffle();
  await loadEvents();
}

/*************************
 * GLOBAL STATS
 *************************/
async function loadGlobals() {
  const totalStaked = await contract.methods.totalStaked().call();
  const divPool = await contract.methods.dividendPool().call();

  setBNB("totalStaked", totalStaked);
  setBNB("dividendPool", divPool);

  const daily = BigInt(divPool) * BigInt(await contract.methods.DAILY_DIVIDEND_PERCENT().call()) / 100n;
  $("#dailyBNB").innerText = fromWei(daily);
  $("#dailyUSD").innerText = (Number(fromWei(daily)) * BNB_USD).toFixed(2);
}

/*************************
 * USER STATS
 *************************/
async function loadUser() {
  if (!account) return;

  const u = await contract.methods.users(account).call();
  const totalStaked = await contract.methods.totalStaked().call();

  setBNB("myStaked", u.staked);
  setBNB("myWithdrawn", u.withdrawn);
  setBNB("myClaimed", u.dividendsClaimed);

  let share = 0;
  if (totalStaked > 0) {
    share = (Number(u.staked) / Number(totalStaked)) * 100;
  }

  $("#myShare").innerText = share.toFixed(2);
  $("#myBoost").innerText = u.dailyBoost + "%";
}

/*************************
 * AUCTION
 *************************/
async function loadAuction() {
  const a = await contract.methods.auction().call();

  const nextBid = (Number(a.bidCount) + 1) * 0.001;
  $("#auctionBid").innerText = nextBid.toFixed(3);

  startCountdown("auctionCountdown", a.endTime);
}

async function bidAuction() {
  const a = await contract.methods.auction().call();
  const value = ((Number(a.bidCount) + 1) * 0.001).toFixed(3);

  await contract.methods.bidAuction().send({
    from: account,
    value: web3.utils.toWei(value)
  });

  loadAuction();
}

/*************************
 * RAFFLE
 *************************/
async function loadRaffle() {
  const r = await contract.methods.raffle().call();

  setBNB("rafflePot", r.prizePot);
  startCountdown("raffleCountdown", r.endTime);
}

async function enterRaffle() {
  const tickets = Number($("#ticketInput").value);
  if (!tickets || tickets <= 0) return;

  const price = await contract.methods.RAFFLE_TICKET_PRICE().call();
  const total = BigInt(price) * BigInt(tickets);

  await contract.methods.enterRaffle(tickets).send({
    from: account,
    value: total.toString()
  });

  loadRaffle();
}

/*************************
 * WALLET ACTIONS
 *************************/
async function deposit() {
  const amount = $("#depositInput").value;
  await contract.methods.deposit().send({
    from: account,
    value: web3.utils.toWei(amount)
  });
  loadAll();
}

async function withdraw() {
  const amount = $("#withdrawInput").value;
  await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
  loadAll();
}

async function claim() {
  await contract.methods.claimDividends().send({ from: account });
  loadAll();
}

/*************************
 * EVENTS (LAST 10)
 *************************/
async function loadEvents() {
  const events = await contract.getPastEvents("allEvents", {
    fromBlock: "latest",
    toBlock: "latest"
  });

  const box = $("#events");
  box.innerHTML = "";

  events.slice(-10).reverse().forEach(e => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerText = e.event;
    box.appendChild(div);
  });
}

/*************************
 * HELPERS
 *************************/
function $(id) {
  return document.getElementById(id);
}

function fromWei(v) {
  return web3.utils.fromWei(v.toString());
}

function setBNB(id, wei) {
  $(id).innerText = fromWei(wei);
}

function startCountdown(id, end) {
  const el = $(id);
  if (!el) return;

  clearInterval(el._timer);

  el._timer = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    const diff = end - now;

    if (diff <= 0) {
      el.innerText = "Finished";
      clearInterval(el._timer);
      return;
    }

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    el.innerText = `${h}h ${m}m ${s}s`;
  }, 1000);
}
