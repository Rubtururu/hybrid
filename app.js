const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3;
let contract;
let account;
let chart;
let countdownInterval;

/* =========================
   BOTONES
========================= */
window.addEventListener("load", () => {
  document.getElementById("connectBtn").onclick = connect;
  document.getElementById("depositBtn").onclick = deposit;
  document.getElementById("withdrawBtn").onclick = withdraw;
  document.getElementById("claimBtn").onclick = claim;
  document.getElementById("boostBtn").onclick = activateBoost;
  document.getElementById("loanBtn").onclick = takeLoan;
  document.getElementById("raffleBtn").onclick = enterRaffle;
});

/* =========================
   CONEXIÓN
========================= */
async function connect() {
  if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }

  web3 = new Web3(window.ethereum);

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];

    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x61") {
      alert("Cambia a BSC Testnet");
      return;
    }

    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    document.getElementById("wallet").innerText =
      account.slice(0, 6) + "..." + account.slice(-4);

    await loadStats();
    initChart();

  } catch (e) {
    alert("Error MetaMask: " + e.message);
  }
}

/* =========================
   LOAD STATS
========================= */
async function loadStats() {
  if (!contract || !account) return;

  try {
    const [
      treasuryPool,
      dividendPool,
      totalUsers,
      totalShares,
      rafflePot,
      lastDividendTime
    ] = await Promise.all([
      contract.methods.treasuryPool().call(),
      contract.methods.dividendPool().call(),
      contract.methods.totalUsers().call(),
      contract.methods.totalShares().call(),
      contract.methods.rafflePot().call(),
      contract.methods.lastDividendTime().call()
    ]);

    // GLOBAL
    set("tvl", fromWei(treasuryPool));
    set("divPool", fromWei(dividendPool));
    set("users", totalUsers);
    set("totalShares", fromWei(totalShares));
    set("rafflePot", fromWei(rafflePot));

    // Dividendos diarios (1%)
    const dailyDividend = web3.utils.toBN(dividendPool)
      .mul(web3.utils.toBN(1))
      .div(web3.utils.toBN(100));
    set("nextDividend", fromWei(dailyDividend));

    // USER
    const u = await contract.methods.users(account).call();
    const pending = await contract.methods.pendingDividends(account).call();

    set("dep", fromWei(u.deposited));
    set("withdrawn", fromWei(u.withdrawn));
    set("shares", fromWei(u.shares));
    set("claimed", fromWei(u.dividendsClaimed));
    set("pending", fromWei(pending));

    // % SHARE
    let pct = 0;
    if (totalShares > 0) {
      pct =
        (Number(fromWei(u.shares)) / Number(fromWei(totalShares))) * 100;
    }
    document.getElementById("sharePct").innerText = pct.toFixed(2);

    // COUNTDOWN
    startCountdown(lastDividendTime);

    // CHART
    updateChart(treasuryPool, dividendPool);

  } catch (err) {
    console.error("loadStats error:", err);
  }
}

/* =========================
   HELPERS
========================= */
function set(id, val) {
  document.getElementById(id).innerText = val;
}

function fromWei(v) {
  return Number(web3.utils.fromWei(v.toString())).toFixed(6);
}

/* =========================
   COUNTDOWN
========================= */
function startCountdown(last) {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const next = Number(last) + 86400;
    const now = Math.floor(Date.now() / 1000);
    let diff = next - now;
    if (diff < 0) diff = 0;

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    document.getElementById("countdown").innerText =
      `${h}h ${m}m ${s}s`;
  }, 1000);
}

/* =========================
   ACTIONS
========================= */
async function deposit() {
  const amt = document.getElementById("amount").value;
  if (!amt) return;
  await contract.methods.deposit().send({
    from: account,
    value: web3.utils.toWei(amt)
  });
  loadStats();
}

async function withdraw() {
  const amt = document.getElementById("amount").value;
  if (!amt) return;
  await contract.methods.withdraw(web3.utils.toWei(amt)).send({
    from: account
  });
  loadStats();
}

async function claim() {
  await contract.methods.claim().send({ from: account });
  loadStats();
}

async function activateBoost() {
  const amt = prompt("BNB para boost");
  if (!amt) return;
  await contract.methods.activateBoost(0, 86400).send({
    from: account,
    value: web3.utils.toWei(amt)
  });
  loadStats();
}

async function takeLoan() {
  const amt = prompt("BNB préstamo");
  if (!amt) return;
  await contract.methods.takeLoan(web3.utils.toWei(amt), 86400).send({
    from: account
  });
  loadStats();
}

async function enterRaffle() {
  await contract.methods.enterRaffle().send({
    from: account,
    value: web3.utils.toWei("0.01")
  });
  loadStats();
}

/* =========================
   CHART
========================= */
function initChart() {
  const ctx = document.getElementById("chart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "TVL", data: [], borderColor: "#3b82f6", tension: 0.3 },
        { label: "Dividends", data: [], borderColor: "#22c55e", tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "#fff" } } },
      scales: {
        x: { ticks: { color: "#9ca3af" } },
        y: { ticks: { color: "#9ca3af" } }
      }
    }
  });
}

function updateChart(tvl, div) {
  if (!chart) return;
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(fromWei(tvl));
  chart.data.datasets[1].data.push(fromWei(div));

  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }
  chart.update();
}
