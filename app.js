const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountTreasury","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStaked","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingStaked","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctionBids","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionPrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"topBid","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"},{"internalType":"address[]","name":"lastBidders","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleStats","outputs":[{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"tickets","type":"uint256"},{"internalType":"uint256","name":"timeLeft","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserShare","outputs":[{"internalType":"uint256","name":"stakingShareBP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionPrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastAuctionWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRafflePrizes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRaffleWinners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAuctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"raffleTickets","outputs":[{"internalType":"address","name":"user","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setAuctionDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setDividendPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setRaffleDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account;

// Inicialización
window.addEventListener("load", async () => {
  initTabs();
  initButtons();
  await attemptConnect();
  setInterval(updateStats, 1000); // actualizar cada segundo
});

// Tabs SPA
function initTabs() {
  document.querySelectorAll("nav button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
      document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.target).classList.add("active");
    };
  });
}

// Conexión e inicialización
async function attemptConnect() {
  if (!window.ethereum) return alert("Instala MetaMask");
  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      account = accounts[0];
      document.getElementById("accountDisplay").innerText = account;
      updateStats();
      listenToEvents();
    }
  } catch (e) {}
}

async function connectWallet() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];
  document.getElementById("accountDisplay").innerText = account;
  updateStats();
  listenToEvents();
}

// Botones
function initButtons() {
  document.getElementById("connectBtn").onclick = connectWallet;
  document.getElementById("depositBtn").onclick = deposit;
  document.getElementById("withdrawBtn").onclick = withdraw;
  document.getElementById("claimBtn").onclick = claimDividends;
  document.getElementById("raffleBtn").onclick = enterRaffle;
  document.getElementById("bidBtn").onclick = bidAuction;
}

// Actualizar estadísticas
async function updateStats() {
  if (!account) return;

  // Staking
  const treasuryPool = await contract.methods.treasuryPool().call();
  const dividendPool = await contract.methods.dividendPool().call();
  const user = await contract.methods.users(account).call();
  const userShare = await contract.methods.getUserShare(account).call();

  document.getElementById("treasuryPool").innerText = web3.utils.fromWei(treasuryPool);
  document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool);
  document.getElementById("userStaked").innerText = web3.utils.fromWei(user.staked);
  document.getElementById("userDividends").innerText = web3.utils.fromWei(user.dividendsClaimed);
  document.getElementById("userShare").innerText = (userShare / 100).toFixed(2);

  // Raffle
  const raffle = await contract.methods.getRaffleStats().call();
  document.getElementById("rafflePrizePot").innerText = web3.utils.fromWei(raffle.prizePot);
  document.getElementById("raffleTicketsTotal").innerText = raffle.tickets;
  document.getElementById("raffleTimeLeft").innerText = raffle.timeLeft;

  try {
    const winners = await contract.methods.lastRaffleWinners().call();
    const list = document.getElementById("raffleWinners");
    list.innerHTML = "";
    winners.forEach(w => {
      if (w && w !== "0x0000000000000000000000000000000000000000") {
        list.innerHTML += `<li>${w}</li>`;
      }
    });
  } catch {}

  // Auction
  const auction = await contract.methods.getAuctionStats().call();
  document.getElementById("auctionPrizePot").innerText = web3.utils.fromWei(auction.prizePot);
  document.getElementById("auctionTopBid").innerText = web3.utils.fromWei(auction.topBid);
  document.getElementById("auctionTimeLeft").innerText = auction.timeLeft;

  const bidders = document.getElementById("auctionLastBidders");
  bidders.innerHTML = "";
  auction.lastBidders.forEach(b => {
    bidders.innerHTML += `<li>${b}</li>`;
  });
}

// Funciones Staking
async function deposit() {
  const val = document.getElementById("depositAmount").value;
  if (!val || val <= 0) return alert("Cantidad inválida");
  await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(val.toString(), "ether") });
}

async function withdraw() {
  const val = document.getElementById("withdrawAmount").value;
  if (!val || val <= 0) return alert("Cantidad inválida");
  await contract.methods.withdraw(web3.utils.toWei(val.toString(), "ether")).send({ from: account });
}

async function claimDividends() {
  await contract.methods.claimDividends().send({ from: account });
}

// Raffle
async function enterRaffle() {
  const t = parseInt(document.getElementById("raffleTickets").value);
  if (!t || t <= 0) return alert("Tickets inválidos");
  const val = web3.utils.toWei((0.001 * t).toString(), "ether");
  await contract.methods.enterRaffle(t).send({ from: account, value: val });
}

// Auction
async function bidAuction() {
  await contract.methods.bidAuction().send({ from: account, value: await contract.methods.auctionBids().call().then(b=>b.length==0? web3.utils.toWei("0.001","ether"): web3.utils.toWei((b.length+1).toString(),"ether")) });
}

// Eventos
function listenToEvents() {
  contract.events.allEvents({}, (err, event) => {
    if (!err) {
      const log = document.createElement("p");
      log.innerText = JSON.stringify(event.event) + " — " + JSON.stringify(event.returnValues);
      document.getElementById("eventLogs").prepend(log);
    }
  });
}
