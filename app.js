let web3, contract, account, chart;

const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

document.addEventListener("DOMContentLoaded", () => {
  connectBtn.onclick = connect;
  depositBtn.onclick = deposit;
  withdrawBtn.onclick = withdraw;
  claimBtn.onclick = claim;
  raffleBtn.onclick = enterRaffle;
});

async function connect() {
  if (!window.ethereum) return alert("Instala MetaMask");

  web3 = new Web3(window.ethereum);
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];

  if (await ethereum.request({ method: "eth_chainId" }) !== "0x61")
    return alert("BSC Testnet");

  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  wallet.innerText = account.slice(0, 6) + "..." + account.slice(-4);

  await loadStats();
  initChart();
}

async function loadStats() {
  const [
    tvl, divPool, users, totalShares, rafflePot, lastDividend
  ] = await Promise.all([
    contract.methods.treasuryPool().call(),
    contract.methods.dividendPool().call(),
    contract.methods.totalUsers().call(),
    contract.methods.totalShares().call(),
    contract.methods.rafflePot().call(),
    contract.methods.lastDividendTime().call()
  ]);

  tvlEl(tvl, "tvl");
  tvlEl(divPool, "divPool");
  tvlEl(rafflePot, "rafflePot");

  users.innerText = users;
  totalShares.innerText = web3.utils.fromWei(totalShares);

  const next = web3.utils.fromWei(divPool) * 0.01;
  nextDividend.innerText = next.toFixed(6);

  startCountdown(lastDividend);

  const u = await contract.methods.users(account).call();
  dep.innerText = web3.utils.fromWei(u.deposited);
  withdrawn.innerText = web3.utils.fromWei(u.withdrawn);
  shares.innerText = web3.utils.fromWei(u.shares);

  const pct = totalShares > 0
    ? (u.shares * 100n) / BigInt(totalShares)
    : 0n;

  sharePct.innerText = pct.toString();
  pending.innerText = web3.utils.fromWei(
    await contract.methods.pendingDividends(account).call()
  );

  updateChart(tvl, divPool);
}

function tvlEl(val, id) {
  document.getElementById(id).innerText =
    Number(web3.utils.fromWei(val)).toFixed(6);
}

function startCountdown(last) {
  setInterval(() => {
    const next = Number(last) + 86400;
    const diff = next - Math.floor(Date.now() / 1000);
    if (diff <= 0) return countdown.innerText = "Pagando…";
    countdown.innerText =
      `${Math.floor(diff/3600)}h ${Math.floor(diff%3600/60)}m ${diff%60}s`;
  }, 1000);
}

function initChart() {
  if (chart) chart.destroy();
  chart = new Chart(chartEl(), {
    type: "line",
    data: { labels: [], datasets: [{ data: [] }] },
    options: { responsive: true }
  });
}

function updateChart(tvl, div) {
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(web3.utils.fromWei(tvl));
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

const chartEl = () => document.getElementById("chart").getContext("2d");

async function deposit() {
  await contract.methods.deposit().send({
    from: account,
    value: web3.utils.toWei(amount.value)
  });
  loadStats();
}

async function withdraw() {
  await contract.methods.withdraw(web3.utils.toWei(amount.value))
    .send({ from: account });
  loadStats();
}

async function claim() {
  await contract.methods.claim().send({ from: account });
  loadStats();
}

async function enterRaffle() {
  await contract.methods.enterRaffle().send({
    from: account,
    value: web3.utils.toWei("0.01")
  });
  loadStats();
}
