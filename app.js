const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3, contract, account, chart, countdownInterval, nextDivTime;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;
document.getElementById("boostBtn").onclick = activateBoost;
document.getElementById("loanBtn").onclick = takeLoan;
document.getElementById("raffleBtn").onclick = enterRaffle;

async function connect() {
  if (!window.ethereum) { alert("Instala MetaMask"); return; }
  web3 = new Web3(window.ethereum);
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x61'){ alert("Cambia MetaMask a BSC Testnet"); return; }
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    alert("Wallet conectada: " + account);
    loadStats();
    initChart();
  } catch(e){ alert("Error MetaMask: "+e.message); }
}

// ---------- LOAD STATS ----------
async function loadStats() {
  if(!contract || !account) return;
  try{
    const [
      tvl, div, users, totalShares, volume, totalDeposited, totalWithdrawn, rafflePot,
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

    const u = await contract.methods.users(account).call();
    const pending = await contract.methods.pendingDividends(account).call();

    // Stats globales
    updateStat("tvl", tvl);
    updateStat("divPool", div);
    document.getElementById("dailyDiv").innerText = (parseFloat(web3.utils.fromWei(div)) * 0.01).toFixed(6);
    document.getElementById("users").innerText = users;
    updateStat("totalShares", totalShares);
    updateStat("volume", volume);
    updateStat("totalDeposited", totalDeposited);
    updateStat("totalWithdrawn", totalWithdrawn);
    updateStat("rafflePot", rafflePot);

    // Stats usuario
    updateUserStat("dep", u.deposited);
    updateUserStat("withdrawn", u.withdrawn);
    updateUserStat("shares", u.shares);
    updateUserStat("claimed", u.dividendsClaimed);
    updateUserStat("pending", pending);

    // Mi % share
    const totalS = parseFloat(web3.utils.fromWei(totalShares));
    const myS = parseFloat(web3.utils.fromWei(u.shares));
    let sharePercent = totalS > 0 ? ((myS / totalS) * 100).toFixed(2) : 0;
    if (totalS === myS && totalS > 0) sharePercent = 100;
    document.getElementById("sharePercent").innerText = sharePercent;

    // Boost, Loan y última acción
    document.getElementById("boost").innerText = u.boostBP > 0 ? `${u.boostBP/100}% hasta ${new Date(u.boostEnd*1000).toLocaleString()}` : '-';
    document.getElementById("loan").innerText = u.loanAmount>0 ? `${web3.utils.fromWei(u.loanAmount)} BNB hasta ${new Date(u.loanEnd*1000).toLocaleString()}` : '-';
    document.getElementById("lastAction").innerText = new Date(u.lastAction*1000).toLocaleString();

    // Cuenta atrás dividendos
    nextDivTime = parseInt(lastDividend) + 24*3600;
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);

    updateChart(tvl, div);
    loadRafflePlayers();

  } catch(err){ console.error(err); }
}

function updateStat(id,value){
  const el = document.getElementById(id);
  const old = el.innerText;
  el.innerText = web3.utils.fromWei(value.toString());
  if(old !== el.innerText){ el.classList.add("update"); setTimeout(()=>el.classList.remove("update"),600); }
}

function updateUserStat(id,value){
  const el = document.getElementById(id);
  const old = el.innerText;
  el.innerText = web3.utils.fromWei(value.toString());
  if(old !== el.innerText){ el.classList.add("update"); setTimeout(()=>el.classList.remove("update"),600); }
}

// ---------- CUENTA ATRÁS ----------
function updateCountdown(){
  const countdownEl = document.getElementById("nextDiv");
  if(!nextDivTime){ countdownEl.innerText = "-"; return; }
  const now = Math.floor(Date.now()/1000);
  let diff = nextDivTime - now;
  if(diff<0) diff=0;
  const h = Math.floor(diff/3600);
  const m = Math.floor((diff%3600)/60);
  const s = diff%60;
  countdownEl.innerText = `${h}h ${m}m ${s}s`;
}

// ---------- ACCIONES ----------
async function deposit(){ 
  const amt = document.getElementById("amount").value;
  if(!amt||isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.deposit().send({from:account,value:web3.utils.toWei(amt)});
  loadStats();
}
async function withdraw(){
  const amt = document.getElementById("amount").value;
  if(!amt||isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.withdraw(web3.utils.toWei(amt)).send({from:account});
  loadStats();
}
async function claim(){ await contract.methods.claim().send({from:account}); loadStats(); }
async function activateBoost(){
  const amt=prompt("BNB para Boost"); 
  if(!amt||isNaN(amt)) return;
  await contract.methods.activateBoost(web3.utils.toWei(amt),3600*24).send({from:account});
  loadStats();
}
async function takeLoan(){
  const amt=prompt("BNB para préstamo"); 
  if(!amt||isNaN(amt)) return;
  await contract.methods.takeLoan(web3.utils.toWei(amt),3600*24).send({from:account});
  loadStats();
}
async function enterRaffle(){ 
  await contract.methods.enterRaffle().send({from:account,value:web3.utils.toWei('0.01')}); 
  loadStats();
}

// ---------- CHART ----------
function initChart(){
  const ctx=document.getElementById('chart').getContext('2d');
  chart=new Chart(ctx,{type:'line',data:{labels:[],datasets:[
    {label:'TVL BNB',data:[],borderColor:'#1e90ff',fill:false},
    {label:'Dividend Pool BNB',data:[],borderColor:'#00ff99',fill:false}
  ]},options:{responsive:true,animation:{duration:500},scales:{y:{beginAtZero:true}}}});
}

function updateChart(tvl,div){
  if(!chart) return;
  const time=new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(web3.utils.fromWei(tvl.toString()));
  chart.data.datasets[1].data.push(web3.utils.fromWei(div.toString()));
  if(chart.data.labels.length>30){ chart.data.labels.shift(); chart.data.datasets.forEach(d=>d.data.shift()); }
  chart.update();
}

// ---------- RAFFLE PLAYERS ----------
async function loadRafflePlayers(){
  const ul=document.getElementById("leaderboard");
  ul.innerHTML='';
  const totalPlayers = parseInt(await contract.methods.totalUsers().call());
  const pot = parseFloat(web3.utils.fromWei(await contract.methods.rafflePot().call()));
  for(let i=0;i<Math.min(5,totalPlayers);i++){
    const p = await contract.methods.rafflePlayers(i).call().catch(()=>null);
    if(p){
      const li=document.createElement("li");
      li.innerText = `${p} - Pot Share ${(pot/totalPlayers).toFixed(6)} BNB`;
      ul.appendChild(li);
    }
  }
}

// ---------- AUTO REFRESH ----------
setInterval(()=>{if(contract && account) loadStats();},15000);
