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
  const accs = await ethereum.request({ method: "eth_requestAccounts" });
  account = accs[0];

  const chainId = await ethereum.request({ method: "eth_chainId" });
  if (chainId !== "0x61") return alert("BSC Testnet");

  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  wallet.innerText = account.slice(0,6)+"..."+account.slice(-4);

  await loadStats();
  initChart();
}

async function loadStats() {
  if (!contract || !account) return;

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
  tvl.innerText = formatBNB(treasuryPool);
  divPool.innerText = formatBNB(dividendPool);
  rafflePotEl.innerText = formatBNB(rafflePot);
  users.innerText = Number(totalUsers);
  totalSharesEl.innerText = formatBNB(totalShares);

  const nextDividend = Number(web3.utils.fromWei(dividendPool)) * 0.01;
  nextDividendEl.innerText = nextDividend.toFixed(6);

  startCountdown(Number(lastDividendTime));

  // USER
  const u = await contract.methods.users(account).call();

  dep.innerText = formatBNB(u.deposited);
  withdrawn.innerText = formatBNB(u.withdrawn);
  shares.innerText = formatBNB(u.shares);
  pending.innerText = formatBNB(
    await contract.methods.pendingDividends(account).call()
  );

  // SHARE %
  const myShares = BigInt(u.shares);
  const totShares = BigInt(totalShares);
  const pct = totShares > 0n
    ? Number(myShares * 10000n / totShares) / 100
    : 0;

  sharePct.innerText = pct.toFixed(2);

  updateChart(treasuryPool, dividendPool);
}

// ---------- HELPERS ----------
function formatBNB(v){
  return Number(web3.utils.fromWei(v)).toFixed(6);
}

function startCountdown(last){
  clearInterval(window._cd);
  window._cd = setInterval(()=>{
    const next = last + 86400;
    const now = Math.floor(Date.now()/1000);
    const diff = next - now;
    if(diff<=0){
      countdown.innerText = "Pagando…";
      return;
    }
    countdown.innerText =
      `${Math.floor(diff/3600)}h ${Math.floor(diff%3600/60)}m ${diff%60}s`;
  },1000);
}

// ---------- CHART ----------
function initChart(){
  if(chart){ chart.destroy(); chart=null; }

  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx,{
    type:"line",
    data:{
      labels:[],
      datasets:[
        {label:"TVL", data:[], borderColor:"#3b82f6", tension:0.4},
        {label:"Dividend Pool", data:[], borderColor:"#10b981", tension:0.4}
      ]
    },
    options:{
      responsive:true,
      plugins:{legend:{labels:{color:"#e5e7eb"}}},
      scales:{
        x:{ticks:{color:"#9ca3af"}},
        y:{ticks:{color:"#9ca3af"}}
      }
    }
  });
}

function updateChart(tvl,div){
  if(!chart) return;
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(Number(web3.utils.fromWei(tvl)));
  chart.data.datasets[1].data.push(Number(web3.utils.fromWei(div)));
  if(chart.data.labels.length>20){
    chart.data.labels.shift();
    chart.data.datasets.forEach(d=>d.data.shift());
  }
  chart.update();
}

// ---------- ACTIONS ----------
async function deposit(){
  await contract.methods.deposit().send({
    from:account,
    value:web3.utils.toWei(amount.value)
  });
  loadStats();
}

async function withdraw(){
  await contract.methods.withdraw(
    web3.utils.toWei(amount.value)
  ).send({from:account});
  loadStats();
}

async function claim(){
  await contract.methods.claim().send({from:account});
  loadStats();
}

async function enterRaffle(){
  await contract.methods.enterRaffle().send({
    from:account,
    value:web3.utils.toWei("0.01")
  });
  loadStats();
}
