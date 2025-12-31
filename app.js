const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3;
let contract;
let account;
let chart;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;

async function connect() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x61') {
        alert("Cambia MetaMask a BSC Testnet");
        return;
      }
      contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      loadStats();
      alert("Wallet conectada: " + account);
      initChart();
    } catch (err) {
      alert("Error al conectar MetaMask: " + err.message);
    }
  } else {
    alert("Instala MetaMask");
  }
}

async function loadStats() {
  if (!contract || !account) return;
  try {
    const tvl = await contract.methods.treasuryPool().call();
    const div = await contract.methods.dividendPool().call();
    const users = await contract.methods.totalUsers().call();
    const volume = await contract.methods.volume24h().call();

    document.getElementById("tvl").innerText = web3.utils.fromWei(tvl.toString());
    document.getElementById("divPool").innerText = web3.utils.fromWei(div.toString());
    document.getElementById("users").innerText = users;
    document.getElementById("volume").innerText = web3.utils.fromWei(volume.toString());

    const u = await contract.methods.getUserStats(account).call();
    document.getElementById("dep").innerText = web3.utils.fromWei(u[0].toString());
    document.getElementById("withdrawn").innerText = web3.utils.fromWei(u[1].toString());
    document.getElementById("shares").innerText = web3.utils.fromWei(u[2].toString());
    document.getElementById("claimed").innerText = web3.utils.fromWei(u[3].toString());
    document.getElementById("pending").innerText = web3.utils.fromWei(u[4].toString());

    updateChart(tvl, div);
    loadLeaderboard();
  } catch (err) {
    console.error("Error cargando stats:", err);
  }
}

async function deposit() {
  const amount = document.getElementById("amount").value;
  await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount) });
  loadStats();
}

async function withdraw() {
  const amount = document.getElementById("amount").value;
  await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
  loadStats();
}

async function claim() {
  await contract.methods.claim().send({ from: account });
  loadStats();
}

// ---------- CHART ----------
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
    options: { responsive:true, animation:false }
  });
}

function updateChart(tvl, div) {
  if(!chart) return;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(web3.utils.fromWei(tvl.toString()));
  chart.data.datasets[1].data.push(web3.utils.fromWei(div.toString()));

  if(chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }
  chart.update();
}

// ---------- LEADERBOARD (FAKE DEMO) ----------
async function loadLeaderboard() {
  const lb = document.getElementById("leaderboard");
  lb.innerHTML = "";

  // Demo: top 5 usuarios
  // En producción, habría que obtener direcciones y stats del contrato real
  for(let i=1;i<=5;i++) {
    const li = document.createElement("li");
    li.innerText = `Usuario ${i} - Shares ${(Math.random()*10).toFixed(2)} BNB`;
    lb.appendChild(li);
  }
}

// Recargar stats cada 15 segundos
setInterval(() => { if(contract && account) loadStats(); }, 15000);
