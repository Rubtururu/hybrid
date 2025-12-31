const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3, contract, account, chart;
let nextDividendTime = 0;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;
document.getElementById("boostBtn").onclick = activateBoost;
document.getElementById("loanBtn").onclick = takeLoan;
document.getElementById("raffleBtn").onclick = enterRaffle;
document.getElementById("drawRaffleBtn").onclick = drawRaffleWinner;

async function connect(){
  if(!window.ethereum){ alert("Instala MetaMask"); return;}
  web3 = new Web3(window.ethereum);
  try{
    const accounts = await ethereum.request({method:'eth_requestAccounts'});
    account = accounts[0];
    const chainId = await ethereum.request({method:'eth_chainId'});
    if(chainId!=='0x61'){ alert("Cambia MetaMask a BSC Testnet"); return;}
    contract = new web3.eth.Contract(ABI,CONTRACT_ADDRESS);
    alert("Wallet conectada: "+account);
    loadStats();
    initChart();
  }catch(e){alert("Error MetaMask: "+e.message);}
}

async function loadStats() {
  if(!contract || !account) return;
  try{
    const [
      tvl, divPool, totalUsers, totalShares, volume, totalDeposited, totalWithdrawn, rafflePot,
      lastDividend, lastVolume
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

    // Mostrar stats generales
    document.getElementById("tvl").innerText = web3.utils.fromWei(tvl.toString());
    document.getElementById("divPool").innerText = web3.utils.fromWei(divPool.toString());
    document.getElementById("users").innerText = totalUsers; // <-- SIN fromWei()
    document.getElementById("volume").innerText = web3.utils.fromWei(volume.toString());
    document.getElementById("totalShares").innerText = web3.utils.fromWei(totalShares.toString());
    document.getElementById("totalDeposited").innerText = web3.utils.fromWei(totalDeposited.toString());
    document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei(totalWithdrawn.toString());
    document.getElementById("rafflePot").innerText = web3.utils.fromWei(rafflePot.toString());

    // Mostrar mis stats
    const u = await contract.methods.users(account).call();
    const pending = await contract.methods.pendingDividends(account).call();
    const userShares = parseFloat(web3.utils.fromWei(u.shares.toString()));
    const totalSharesFloat = parseFloat(web3.utils.fromWei(totalShares.toString()));
    const mySharePercent = totalSharesFloat > 0 ? ((userShares / totalSharesFloat) * 100).toFixed(2) : 0;

    document.getElementById("dep").innerText = web3.utils.fromWei(u.deposited.toString());
    document.getElementById("withdrawn").innerText = web3.utils.fromWei(u.withdrawn.toString());
    document.getElementById("shares").innerText = web3.utils.fromWei(u.shares.toString());
    document.getElementById("claimed").innerText = web3.utils.fromWei(u.dividendsClaimed.toString());
    document.getElementById("pending").innerText = web3.utils.fromWei(pending.toString());
    document.getElementById("mySharePercent").innerText = mySharePercent + "%";

    // Next Dividend (1% del pool de dividendos)
    const nextDividend = parseFloat(web3.utils.fromWei(divPool.toString())) * 0.01;
    document.getElementById("nextDividend").innerText = nextDividend.toFixed(6) + " BNB";

    // Boost y préstamo
    document.getElementById("boost").innerText = u.boostBP>0 ? `${u.boostBP/100}% hasta ${new Date(u.boostEnd*1000).toLocaleString()}` : '-';
    document.getElementById("loan").innerText = u.loanAmount>0 ? `${web3.utils.fromWei(u.loanAmount)} BNB hasta ${new Date(u.loanEnd*1000).toLocaleString()}` : '-';

    // Cuenta atrás dividendos
    updateCountdown(lastDividend);

    updateChart(tvl, divPool);
    loadRafflePlayers();
  } catch(err){
    console.error(err);
  }
}

// ---------- Cuenta atrás dividendos ----------
function updateCountdown(lastDividendTimestamp){
  const countdownEl = document.getElementById("countdown");
  const interval = setInterval(() => {
    const now = Math.floor(Date.now()/1000);
    const nextPay = parseInt(lastDividendTimestamp) + 24*3600; // 24h
    const remaining = nextPay - now;
    if(remaining<=0){ countdownEl.innerText = "Dividendos disponibles"; clearInterval(interval);}
    else{
      const h = Math.floor(remaining/3600);
      const m = Math.floor((remaining%3600)/60);
      const s = remaining%60;
      countdownEl.innerText = `${h}h ${m}m ${s}s`;
    }
  },1000);
}
