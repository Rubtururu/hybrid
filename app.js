// app.js
const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, account, contract;
let chart;

// ---------- BOTONES ----------
document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;
document.getElementById("bidBtn").onclick = bidAuction;
document.getElementById("enterRaffleBtn").onclick = enterRaffle;

// ---------- CONEXION METAMASK ----------
async function connect() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

      console.log("Conectado con MetaMask:", account);
      alert("Wallet conectada: " + account);
      loadStats();
      initChart();
    } catch (err) {
      console.error("Error MetaMask:", err);
      alert("Error MetaMask: " + err.message);
    }
  } else {
    alert("Instala MetaMask para usar esta app");
  }
}

// ---------- LOAD STATS ----------
async function loadStats() {
  if (!contract || !account) return;

  try {
    // Datos generales
    const [
      totalDeposited,
      totalWithdrawn,
      dividendPool,
      totalShares,
      auctionInfo,
      raffleInfo
    ] = await Promise.all([
      contract.methods.totalDeposited().call(),
      contract.methods.totalWithdrawn().call(),
      contract.methods.dividendPool().call(),
      contract.methods.totalShares().call(),
      contract.methods.getAuctionInfo().call(),
      contract.methods.getRaffleInfo().call()
    ]);

    document.getElementById("totalDeposited").innerText = web3.utils.fromWei(totalDeposited.toString());
    document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei(totalWithdrawn.toString());
    document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool.toString());
    document.getElementById("totalShares").innerText = web3.utils.fromWei(totalShares.toString());

    // Datos del usuario
    const userStats = await contract.methods.getUserStats(account).call();
    document.getElementById("userDeposited").innerText = web3.utils.fromWei(userStats.deposited.toString());
    document.getElementById("userWithdrawn").innerText = web3.utils.fromWei(userStats.withdrawn.toString());
    document.getElementById("userShares").innerText = web3.utils.fromWei(userStats.shares.toString());
    document.getElementById("userDividendsClaimed").innerText = web3.utils.fromWei(userStats.dividendsClaimed.toString());
    document.getElementById("userPendingDividends").innerText = web3.utils.fromWei(userStats.pending.toString());

    // Auction
    document.getElementById("auctionCurrentBid").innerText = web3.utils.fromWei(auctionInfo.currentBid.toString());
    document.getElementById("auctionEndTime").innerText = new Date(auctionInfo.endTime * 1000).toLocaleString();

    // Raffle
    document.getElementById("rafflePrizePot").innerText = web3.utils.fromWei(raffleInfo.prizePot.toString());
    document.getElementById("raffleEndTime").innerText = new Date(raffleInfo.endTime * 1000).toLocaleString();

    // Actualizar gráfico
    updateChart(totalDeposited, dividendPool);

  } catch (err) {
    console.error("Error cargando stats:", err);
  }
}

// ---------- ACCIONES ----------
async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if (!amount || isNaN(amount)) return alert("Cantidad inválida");
  try {
    await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount) });
    loadStats();
  } catch (err) {
    console.error(err);
  }
}

async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  if (!amount || isNaN(amount)) return alert("Cantidad inválida");
  try {
    await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
    loadStats();
  } catch (err) {
    console.error(err);
  }
}

async function claim() {
  try {
    await contract.methods.claimDividends().send({ from: account });
    loadStats();
  } catch (err) {
    console.error(err);
  }
}

// ---------- AUCTION ----------
async function bidAuction() {
  const amount = document.getElementById("auctionBidAmount").value;
  if (!amount || isNaN(amount)) return alert("Cantidad inválida");
  try {
    await contract.methods.bidAuction().send({ from: account, value: web3.utils.toWei(amount) });
    loadStats();
  } catch (err) {
    console.error(err);
  }
}

// ---------- RAFFLE ----------
async function enterRaffle() {
  const tickets = document.getElementById("raffleTickets").value;
  if (!tickets || isNaN(tickets)) return alert("Número de tickets inválido");
  try {
    await contract.methods.enterRaffle(tickets).send({ from: account, value: web3.utils.toWei((tickets*0.001).toString()) });
    loadStats();
  } catch (err) {
    console.error(err);
  }
}

// ---------- CHART ----------
function initChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        { label: 'Total Deposited BNB', data: [], borderColor: '#1e90ff', fill: false },
        { label: 'Dividend Pool BNB', data: [], borderColor: '#00ff99', fill: false }
      ]
    },
    options: { responsive: true, animation: { duration: 500 } }
  });
}

function updateChart(totalDeposited, dividendPool) {
  if (!chart) return;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(web3.utils.fromWei(totalDeposited.toString()));
  chart.data.datasets[1].data.push(web3.utils.fromWei(dividendPool.toString()));
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }
  chart.update();
}

// ---------- AUTO REFRESH ----------
setInterval(() => { if(contract && account) loadStats(); }, 15000);
