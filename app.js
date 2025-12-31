/* =========================
   CONFIG
========================= */

const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3;
let contract;
let account;
let chart;

/* =========================
   HELPERS
========================= */

const fromWei = (v) => Web3.utils.fromWei(v.toString(), "ether");
const toWei   = (v) => Web3.utils.toWei(v.toString(), "ether");

const $ = (id) => document.getElementById(id);

/* =========================
   INIT
========================= */

window.addEventListener("load", () => {
  $("connectBtn").onclick  = connect;
  $("depositBtn").onclick  = deposit;
  $("withdrawBtn").onclick = withdraw;
  $("claimBtn").onclick    = claim;
  $("boostBtn").onclick    = boost;
  $("loanBtn").onclick     = loan;
  $("raffleBtn").onclick   = raffle;
});

/* =========================
   METAMASK
========================= */

async function connect() {
  if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }

  try {
    web3 = new Web3(window.ethereum);

    const accounts = await ethereum.request({
      method: "eth_requestAccounts"
    });
    account = accounts[0];

    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x61") {
      alert("Cambia a BSC Testnet");
      return;
    }

    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    $("wallet").innerText =
      account.slice(0, 6) + "..." + account.slice(-4);

    await loadStats();
    initChart();

    setInterval(loadStats, 15000);

  } catch (err) {
    console.error("MetaMask error:", err);
    alert("Error MetaMask: " + err.message);
  }
}

/* =========================
   STATS
========================= */

async function loadStats() {
  if (!contract || !account) return;

  try {
    // --- GLOBAL ---
    const dividendPool = await contract.methods.dividendPool().call();
    const totalUsers   = await contract.methods.totalUsers().call();
    const totalShares  = await contract.methods.totalShares().call();
    const rafflePot    = await contract.methods.rafflePot().call();
    const lastDist     = await contract.methods.lastDistributionTime().call();

    const tvlWei = await web3.eth.getBalance(CONTRACT_ADDRESS);

    $("tvl").innerText        = fromWei(tvlWei);
    $("divPool").innerText    = fromWei(dividendPool);
    $("users").innerText     = Number(totalUsers); // ⚠️ NO fromWei
    $("totalShares").innerText = fromWei(totalShares);
    $("rafflePot").innerText = fromWei(rafflePot);

    // --- DAILY DIVIDEND (1%) ---
    const daily = Number(fromWei(dividendPool)) * 0.01;
    $("nextDividend").innerText = daily.toFixed(6);

    startCountdown(Number(lastDist));

    // --- USER ---
    const u = await contract.methods.users(account).call();

    $("dep").innerText       = fromWei(u.deposited);
    $("withdrawn").innerText = fromWei(u.withdrawn);
    $("shares").innerText    = fromWei(u.shares);
    $("claimed").innerText   = fromWei(u.dividendsClaimed);

    const pending = await contract.methods
      .pendingDividends(account)
      .call();
    $("pending").innerText = fromWei(pending);

    // --- SHARE % ---
    let pct = 0;
    if (BigInt(totalShares) > 0n) {
      pct =
        Number(
          (BigInt(u.shares) * 10000n) / BigInt(totalShares)
        ) / 100;
    }
    $("sharePct").innerText = pct.toFixed(2);

    updateChart(tvlWei, dividendPool);

  } catch (err) {
    console.error("Stats error:", err);
  }
}

/* =========================
   COUNTDOWN
========================= */

function startCountdown(lastTime) {
  const next = lastTime + 86400;

  clearInterval(window.countdownInterval);

  window.countdownInterval = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    let diff = next - now;

    if (diff < 0) diff = 0;

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    $("countdown").innerText =
      `${h}h ${m}m ${s}s`;
  }, 1000);
}

/* =========================
   ACTIONS
========================= */

async function deposit() {
  const v = $("amount").value;
  if (!v || isNaN(v)) return alert("Cantidad inválida");

  await contract.methods.deposit().send({
    from: account,
    value: toWei(v)
  });

  loadStats();
}

async function withdraw() {
  const v = $("amount").value;
  if (!v || isNaN(v)) return alert("Cantidad inválida");

  await contract.methods.withdraw(toWei(v)).send({
    from: account
  });

  loadStats();
}

async function claim() {
  await contract.methods.claim().send({ from: account });
  loadStats();
}

async function boost() {
  const v = prompt("BNB para Boost");
  if (!v || isNaN(v)) return;

  await contract.methods
    .activateBoost(toWei(v), 86400)
    .send({ from: account });

  loadStats();
}

async function loan() {
  const v = prompt("BNB para préstamo");
  if (!v || isNaN(v)) return;

  await contract.methods
    .takeLoan(toWei(v), 86400)
    .send({ from: account });

  loadStats();
}

async function raffle() {
  await contract.methods.enterRaffle().send({
    from: account,
    value: toWei("0.01")
  });

  loadStats();
}

/* =========================
   CHART
========================= */

function initChart() {
  const ctx = $("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "TVL (BNB)",
          data: [],
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: "Dividend Pool (BNB)",
          data: [],
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function updateChart(tvl, div) {
  if (!chart) return;

  const t = new Date().toLocaleTimeString();

  chart.data.labels.push(t);
  chart.data.datasets[0].data.push(fromWei(tvl));
  chart.data.datasets[1].data.push(fromWei(div));

  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }

  chart.update();
}
