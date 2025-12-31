const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account;

/* ================= CONNECT ================= */

async function connectWallet() {
  if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }

  web3 = new Web3(window.ethereum);

  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];

  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  document.getElementById("wallet").innerText =
    account.slice(0, 6) + "..." + account.slice(-4);

  loadAll();
  setInterval(loadAll, 15000);
}

/* ================= LOAD ALL ================= */

async function loadAll() {
  await loadGlobalStats();
  await loadUserStats();
  await loadAuction();
  await loadRaffle();
}

/* ================= GLOBAL ================= */

async function loadGlobalStats() {
  const totalDeposited = await contract.methods.totalDeposited().call();
  const totalWithdrawn = await contract.methods.totalWithdrawn().call();
  const totalShares = await contract.methods.totalShares().call();
  const dividendPool = await contract.methods.dividendPool().call();

  document.getElementById("totalDeposited").innerText =
    web3.utils.fromWei(totalDeposited) + " BNB";
  document.getElementById("totalWithdrawn").innerText =
    web3.utils.fromWei(totalWithdrawn) + " BNB";
  document.getElementById("totalShares").innerText =
    web3.utils.fromWei(totalShares);
  document.getElementById("dividendPool").innerText =
    web3.utils.fromWei(dividendPool) + " BNB";
}

/* ================= USER ================= */

async function loadUserStats() {
  if (!account) return;

  const stats = await contract.methods.getUserStats(account).call();
  const totalShares = await contract.methods.totalShares().call();

  document.getElementById("userDeposited").innerText =
    web3.utils.fromWei(stats.deposited) + " BNB";

  document.getElementById("userWithdrawn").innerText =
    web3.utils.fromWei(stats.withdrawn) + " BNB";

  document.getElementById("userShares").innerText =
    web3.utils.fromWei(stats.shares);

  document.getElementById("userClaimed").innerText =
    web3.utils.fromWei(stats.dividendsClaimed) + " BNB";

  document.getElementById("userPending").innerText =
    web3.utils.fromWei(stats.pending) + " BNB";

  let percent = 0;
  if (totalShares > 0) {
    percent = (stats.shares * 100) / totalShares;
  }

  document.getElementById("userSharePercent").innerText =
    percent.toFixed(2) + "%";
}

/* ================= ACTIONS ================= */

async function deposit() {
  const value = document.getElementById("deposit").value;
  if (!value) return;

  await contract.methods.deposit().send({
    from: account,
    value: web3.utils.toWei(value)
  });

  loadAll();
}

async function withdraw() {
  const value = document.getElementById("withdraw").value;
  if (!value) return;

  await contract.methods.withdraw(
    web3.utils.toWei(value)
  ).send({ from: account });

  loadAll();
}

async function claimDividends() {
  await contract.methods.claimDividends().send({ from: account });
  loadAll();
}

/* ================= AUCTION ================= */

async function loadAuction() {
  const info = await contract.methods.getAuctionInfo().call();

  document.getElementById("auctionBid").innerText =
    web3.utils.fromWei(info.currentBid) + " BNB";

  document.getElementById("nextBid").innerText =
    web3.utils.fromWei(
      (BigInt(info.currentBid) + BigInt(web3.utils.toWei("0.001"))).toString()
    ) + " BNB";

  renderCountdown("auctionCountdown", info.endTime);

  const ul = document.getElementById("auctionTop");
  ul.innerHTML = "";

  info.topBidders.forEach(a => {
    if (a !== "0x0000000000000000000000000000000000000000") {
      const li = document.createElement("li");
      li.innerText = a;
      ul.appendChild(li);
    }
  });
}

async function bidAuction() {
  const info = await contract.methods.getAuctionInfo().call();
  const nextBid =
    BigInt(info.currentBid) + BigInt(web3.utils.toWei("0.001"));

  await contract.methods.bidAuction().send({
    from: account,
    value: nextBid.toString()
  });

  loadAuction();
}

/* ================= RAFFLE ================= */

async function loadRaffle() {
  const info = await contract.methods.getRaffleInfo().call();

  document.getElementById("rafflePot").innerText =
    web3.utils.fromWei(info.prizePot) + " BNB";

  document.getElementById("raffleTicketsTotal").innerText =
    info.tickets.length;

  const myTickets = info.tickets.filter(
    t => t.toLowerCase() === account.toLowerCase()
  ).length;

  document.getElementById("raffleMyTickets").innerText = myTickets;

  let chance = 0;
  if (info.tickets.length > 0) {
    chance = (myTickets / info.tickets.length) * 100;
  }

  document.getElementById("raffleChance").innerText =
    chance.toFixed(2) + "%";

  renderCountdown("raffleCountdown", info.endTime);
}

async function enterRaffle() {
  const tickets = document.getElementById("raffleTickets").value;
  if (!tickets) return;

  const price = await contract.methods.raffleTicketPrice().call();
  const total = BigInt(price) * BigInt(tickets);

  await contract.methods.enterRaffle(tickets).send({
    from: account,
    value: total.toString()
  });

  loadRaffle();
}

/* ================= UTIL ================= */

function renderCountdown(id, end) {
  const el = document.getElementById(id);
  const now = Math.floor(Date.now() / 1000);
  const diff = end - now;

  if (diff <= 0) {
    el.innerText = "Finalizado";
    return;
  }

  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;

  el.innerText = `${h}h ${m}m ${s}s`;
}
