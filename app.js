const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3, contract, account, chart;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;
document.getElementById("boostBtn").onclick = activateBoost;
document.getElementById("loanBtn").onclick = takeLoan;
document.getElementById("raffleBtn").onclick = enterRaffle;

async function connect() {
  if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }
  web3 = new Web3(window.ethereum);
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x61') {
      alert("Cambia MetaMask a BSC Testnet");
      return;
    }
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    alert("Wallet conectada: " + account);
    loadStats();
    initChart();
  } catch (err) {
    alert("Error MetaMask: " + err.message);
  }
}

// ---------- LOAD STATS ----------
async function loadStats() {
  if (!contract || !account) return;
  try {
    // Stats generales
    const [
      tvlWei, divWei, totalUsers, totalSharesWei, volumeWei,
      totalDepositedWei, totalWithdrawnWei, rafflePotWei,
      lastDividendTime, lastVolumeReset
    ] = await Promise.all([
      contract.methods.treasuryPool().call(),
      contract.methods.dividendPool().call(),
      contract.methods.totalUsers().call(),
      contract.methods.totalShares().call(),
      contract.methods.volume24h().call(),
      contract.methods.totalDeposited().call(),
      contract.methods.totalWithdrawn().call(),
      contract.methods.rafflePot().call(),
      contract.methods.lastDividendTime().call(),
      contract.methods.lastVolumeReset().call()
    ]);

    setStat("tvl", tvlWei);
    setStat("divPool", divWei);
    document.getElementById("users").innerText = totalUsers;
    setStat("totalShares", totalSharesWei);
    setStat("volume", volumeWei);
    setStat("totalDeposited", totalDepositedWei);
    setStat("totalWithdrawn", totalWithdrawnWei);
    setStat("rafflePot", rafflePotWei);
    document.getElementById("lastDividend").innerText = formatTimestamp(lastDividendTime);
    document.getElementById("lastVolumeReset").innerText = formatTimestamp(lastVolumeReset);

    // Stats del usuario
    const user = await contract.methods.users(account).call();
    document.getElementById("dep").innerText = fromWeiSafe(user.deposited);
    document.getElementById("withdrawn").innerText = fromWeiSafe(user.withdrawn);
    document.getElementById("shares").innerText = fromWeiSafe(user.shares);
    document.getElementById("claimed").innerText = fromWeiSafe(user.dividendsClaimed);
    const pending = await contract.methods.pendingDividends(account).call();
    document.getElementById("pending").innerText = fromWeiSafe(pending);

    document.getElementById("boost").innerText = user.boostBP > 0 ?
      `${user.boostBP / 100}% hasta ${formatTimestamp(user.boostEnd)}` : '-';
    document.getElementById("loan").innerText = user.loanAmount > 0 ?
      `${fromWeiSafe(user.loanAmount)} BNB hasta ${formatTimestamp(user.loanEnd)}` : '-';
    document.getElementById("lastAction").innerText = formatTimestamp(user.lastAction);

    updateChart(tvlWei, divWei);
    loadRafflePlayers(totalUsers, rafflePotWei);

  } catch (err) {
    console.error("Error cargando stats:", err);
  }
}

function fromWeiSafe(value) {
  if (!value) return '0';
  return parseFloat(web3.utils.fromWei(value.toString())).toFixed(6);
}

function formatTimestamp(ts) {
  if (!ts || ts === '0') return '-';
  return new Date(ts * 1000).toLocaleString();
}

function setStat(id, valueWei) {
  const el = document.getElementById(id);
  const old = el.innerText;
  el.innerText = fromWeiSafe(valueWei);
  if (old !== el.innerText) {
    el.classList.add("update");
    setTimeout(() => el.classList.remove("update"), 600);
  }
}

// ---------- ACTIONS ----------
async function deposit() {
  const amt = document.getElementById("amount").value;
  if (!amt || isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amt) });
  loadStats();
}

async function withdraw() {
  const amt = document.getElementById("amount").value;
  if (!amt || isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.withdraw(web3.utils.toWei(amt)).send({ from: account });
  loadStats();
}

async function claim() {
  await contract.methods.claim().send({ from: account });
  loadStats();
}

async function activateBoost() {
  const amt = prompt("BNB para Boost");
  if (!amt || isNaN(amt)) return;
  await contract.methods.activateBoost(web3.utils.toWei(amt), 3600 * 24).send({ from: account });
  loadStats();
}

async function takeLoan() {
  const amt = prompt("BNB para préstamo");
  if (!amt || isNaN(amt)) return;
  await contract.methods.takeLoan(web3.utils.toWei(amt), 3600 * 24).send({ from: account });
  loadStats();
}

async function enterRaffle() {
  await contract.methods.enterRaffle().send({ from: account, value: web3.utils.toWei('0.01') });
  loadStats();
}

// ---------- CHART ----------
let chart;
function initChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        { label: 'TVL BNB', data: [], borderColor: '#1e90ff', fill: false },
        { label: 'Dividend Pool BNB', data: [], borderColor: '#00ff99', fill: false }
      ]
    },
    options: { responsive: true, animation: { duration: 500 }, scales: { y: { beginAtZero: true } } }
  });
}

function updateChart(tvlWei, divWei) {
  if (!chart) return;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(parseFloat(web3.utils.fromWei(tvlWei.toString())));
  chart.data.datasets[1].data.push(parseFloat(web3.utils.fromWei(divWei.toString())));
  if (chart.data.labels.length > 30) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }
  chart.update();
}

// ---------- RAFFLE PLAYERS ----------
async function loadRafflePlayers(totalUsers, rafflePotWei) {
  const ul = document.getElementById("leaderboard");
  ul.innerHTML = '';
  for (let i = 0; i < Math.min(5, totalUsers); i++) {
    let player;
    try { player = await contract.methods.rafflePlayers(i).call(); } catch { continue; }
    const li = document.createElement("li");
    const share = parseFloat(web3.utils.fromWei(rafflePotWei)) / totalUsers;
    li.innerText = `${player} - Pot Share ${share.toFixed(6)} BNB`;
    ul.appendChild(li);
  }
}

// ---------- AUTO REFRESH ----------
setInterval(() => { if (contract && account) loadStats(); }, 15000);
