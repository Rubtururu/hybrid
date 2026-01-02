/*************************
 * CONFIG
 *************************/
const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contract;
let account = null;

/*************************
 * ON LOAD
 *************************/
window.addEventListener("load", () => {
  initTabs();
  initButtons();
  setInterval(() => {
    updateDashboard();
    updateRaffle();
    updateAuction();
  }, 5000);
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
  document.getElementById("connectBtn").onclick = connect;
  document.getElementById("depositBtn").onclick = deposit;
  document.getElementById("withdrawBtn").onclick = withdraw;
  document.getElementById("claimBtn").onclick = claim;
  document.getElementById("raffleBtn").onclick = enterRaffle;
  document.getElementById("bidBtn").onclick = bidAuction;
}

/*************************
 * CONNECT METAMASK
 *************************/
async function connect() {
  if (!window.ethereum) return alert("MetaMask no encontrado");
  web3 = new Web3(window.ethereum);
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];
  document.getElementById("userAddress").innerText = account;
  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  listenEvents();
  updateDashboard();
  updateRaffle();
  updateAuction();
}

/*************************
 * DASHBOARD
 *************************/
async function updateDashboard() {
  if (!contract || !account) return;

  try {
    const totalStaked = await contract.methods.totalStaked().call();
    const dividendPool = await contract.methods.dividendPool().call();
    const user = await contract.methods.users(account).call();

    // Calcula dividendos pendientes (aprox)
    const dailyDiv = await contract.methods.DAILY_DIVIDEND_PERCENT().call();
    const pendingDiv = web3.utils.toBN(user.staked).mul(web3.utils.toBN(dailyDiv)).div(web3.utils.toBN(100));

    document.getElementById("totalStaked").innerText = web3.utils.fromWei(totalStaked.toString());
    document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool.toString());
    document.getElementById("userStaked").innerText = web3.utils.fromWei(user.staked.toString());
    document.getElementById("userDividends").innerText = web3.utils.fromWei(user.dividendsClaimed.toString());
    document.getElementById("dailyBoost").innerText = user.dailyBoost;
  } catch (err) {
    console.error("Error dashboard:", err);
  }
}

/*************************
 * STAKING
 *************************/
async function deposit() {
  if (!account) return alert("Conecta MetaMask primero");
  const val = document.getElementById("depositAmount").value;
  if (!val || val <= 0) return alert("Cantidad inválida");
  try {
    await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(val.toString()) });
    updateDashboard();
  } catch (err) {
    console.error("Deposit error:", err);
  }
}

async function withdraw() {
  if (!account) return alert("Conecta MetaMask primero");
  const val = document.getElementById("withdrawAmount").value;
  if (!val || val <= 0) return alert("Cantidad inválida");
  try {
    await contract.methods.withdraw(web3.utils.toWei(val.toString())).send({ from: account });
    updateDashboard();
  } catch (err) {
    console.error("Withdraw error:", err);
  }
}

async function claim() {
  if (!account) return alert("Conecta MetaMask primero");
  try {
    await contract.methods.claimDividends().send({ from: account });
    updateDashboard();
  } catch (err) {
    console.error("Claim error:", err);
  }
}

/*************************
 * RAFFLE
 *************************/
async function updateRaffle() {
  if (!contract) return;
  try {
    const raffle = await contract.methods.raffle().call();
    const prize = raffle.prizePot;
    const timeLeft = raffle.endTime - Math.floor(Date.now() / 1000);
    document.getElementById("rafflePrize").innerText = web3.utils.fromWei(prize.toString());
    document.getElementById("raffleTime").innerText = timeLeft > 0 ? timeLeft : 0;
  } catch (err) {
    console.error("Raffle update error:", err);
  }
}

async function enterRaffle() {
  if (!account) return alert("Conecta MetaMask primero");
  const tickets = document.getElementById("raffleTickets").value;
  if (!tickets || tickets <= 0) return alert("Tickets inválidos");

  try {
    const ticketPrice = await contract.methods.RAFFLE_TICKET_PRICE().call();
    const total = web3.utils.toBN(ticketPrice).mul(web3.utils.toBN(tickets));
    await contract.methods.enterRaffle(tickets).send({ from: account, value: total });
    updateRaffle();
  } catch (err) {
    console.error("Enter raffle error:", err);
  }
}

/*************************
 * AUCTION
 *************************/
async function updateAuction() {
  if (!contract) return;
  try {
    const auction = await contract.methods.auction().call();
    const topBid = auction.bidCount; // Cantidad total de bids (Wei)
    const timeLeft = auction.endTime - Math.floor(Date.now() / 1000);
    document.getElementById("topBid").innerText = web3.utils.fromWei(topBid.toString());
    document.getElementById("auctionTime").innerText = timeLeft > 0 ? timeLeft : 0;
  } catch (err) {
    console.error("Auction update error:", err);
  }
}

async function bidAuction() {
  if (!account) return alert("Conecta MetaMask primero");
  try {
    const increment = await contract.methods.AUCTION_INCREMENT().call();
    await contract.methods.bidAuction().send({ from: account, value: increment });
    updateAuction();
  } catch (err) {
    console.error("Bid auction error:", err);
  }
}

/*************************
 * EVENTS
 *************************/
function listenEvents() {
  contract.events.Deposit().on("data", e => logEvent(`Deposit: ${e.returnValues.user} depositó ${web3.utils.fromWei(e.returnValues.amount)} tBNB`));
  contract.events.Withdraw().on("data", e => logEvent(`Withdraw: ${e.returnValues.user} retiró ${web3.utils.fromWei(e.returnValues.amount)} tBNB`));
  contract.events.DividendsClaimed().on("data", e => logEvent(`Dividends: ${e.returnValues.user} cobró ${web3.utils.fromWei(e.returnValues.amount)} tBNB`));
  contract.events.RaffleEntered().on("data", e => logEvent(`Raffle: ${e.returnValues.user} entró con ${e.returnValues.tickets} tickets`));
  contract.events.RaffleClosed().on("data", e => logEvent(`Raffle Cerrada: Ganadores ${e.returnValues.winners}`));
  contract.events.AuctionBid().on("data", e => logEvent(`Subasta: ${e.returnValues.user} pujó ${web3.utils.fromWei(e.returnValues.bidNumber)} tBNB`));
  contract.events.AuctionClosed().on("data", e => logEvent(`Subasta Cerrada: Ganadores ${e.returnValues.winners}`));
}

function logEvent(msg) {
  const div = document.createElement("p");
  div.innerText = msg;
  document.getElementById("eventLog").prepend(div);
}
