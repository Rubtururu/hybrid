document.addEventListener("DOMContentLoaded", () => {
  const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
  const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

  let web3, contract, account, chart;

  // Botones
  const connectBtn = document.getElementById("connectBtn");
  const depositBtn = document.getElementById("depositBtn");
  const withdrawBtn = document.getElementById("withdrawBtn");
  const claimBtn = document.getElementById("claimBtn");
  const boostBtn = document.getElementById("boostBtn");
  const loanBtn = document.getElementById("loanBtn");
  const raffleBtn = document.getElementById("raffleBtn");

  connectBtn.onclick = connect;
  depositBtn.onclick = deposit;
  withdrawBtn.onclick = withdraw;
  claimBtn.onclick = claim;
  boostBtn.onclick = activateBoost;
  loanBtn.onclick = takeLoan;
  raffleBtn.onclick = enterRaffle;

  // ---------- CONEXIÓN A METAMASK ----------
  async function connect() {
    if (!window.ethereum) { alert("Instala MetaMask"); return; }
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x61'){ alert("Cambia MetaMask a BSC Testnet"); return; }
      contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      alert("Wallet conectada: " + account);
      loadStats();
      initChart();
    } catch(e){ alert("Error MetaMask: "+e.message); }
  }

  // ---------- CARGAR ESTADÍSTICAS ----------
  async function loadStats() {
  if (!contract || !account) return;

  try {
    // --- Stats globales ---
    const [
      tvl, divPool, totalUsers, totalShares, volume, totalDeposited, totalWithdrawn, rafflePot,
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

    // Actualizar HTML con animación si cambia
    updateStat("tvl", tvl);
    updateStat("divPool", divPool);
    updateStat("users", totalUsers);
    updateStat("totalShares", totalShares);
    updateStat("volume", volume);
    updateStat("totalDeposited", totalDeposited);
    updateStat("totalWithdrawn", totalWithdrawn);
    updateStat("rafflePot", rafflePot);
    document.getElementById("lastDividendTime").innerText = new Date(lastDividendTime*1000).toLocaleString();
    document.getElementById("lastVolumeReset").innerText = new Date(lastVolumeReset*1000).toLocaleString();

    // --- Stats del usuario ---
    const u = await contract.methods.users(account).call();
    const deposited = u[0];
    const withdrawn = u[1];
    const shares = u[2];
    const rewardDebt = u[3];
    const dividendsClaimed = u[4];
    const lastAction = u[5];
    const boostBP = u[6];
    const boostEnd = u[7];
    const loanAmount = u[8];
    const loanEnd = u[9];

    const pendingDiv = await contract.methods.pendingDividends(account).call();

    document.getElementById("dep").innerText = web3.utils.fromWei(deposited.toString());
    document.getElementById("withdrawn").innerText = web3.utils.fromWei(withdrawn.toString());
    document.getElementById("shares").innerText = web3.utils.fromWei(shares.toString());
    document.getElementById("claimed").innerText = web3.utils.fromWei(dividendsClaimed.toString());
    document.getElementById("pending").innerText = web3.utils.fromWei(pendingDiv.toString());
    document.getElementById("boost").innerText = boostBP>0 ? `${boostBP/100}% hasta ${new Date(boostEnd*1000).toLocaleString()}` : '-';
    document.getElementById("loan").innerText = loanAmount>0 ? `${web3.utils.fromWei(loanAmount.toString())} BNB hasta ${new Date(loanEnd*1000).toLocaleString()}` : '-';
    document.getElementById("lastAction").innerText = new Date(lastAction*1000).toLocaleString();

    // --- Actualizar Chart ---
    updateChart(tvl, divPool);

    // --- Cargar jugadores de la rifa ---
    loadRafflePlayers();

  } catch(err) {
    console.error("Error cargando stats:", err);
  }
}

// Función de animación de stats si cambian
function updateStat(id, value) {
  const el = document.getElementById(id);
  const old = el.innerText;
  const newVal = web3.utils.fromWei(value.toString());
  el.innerText = newVal;
  if(old !== newVal) {
    el.classList.add("update");
    setTimeout(() => el.classList.remove("update"), 600);
  }
}

// Recargar stats cada 15 segundos
setInterval(() => { if(contract && account) loadStats(); }, 15000);

