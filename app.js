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

async function loadStats(){
  if(!contract||!account) return;
  try{
    const [tvl,div,users,totalShares,volume,totalDeposited,totalWithdrawn,rafflePot,lastDividend,lastVolume] = await Promise.all([
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

    updateStat("tvl",tvl);
    updateStat("divPool",div);
    updateStat("users",users);
    updateStat("volume",volume);
    updateStat("totalShares",totalShares);
    updateStat("totalDeposited",totalDeposited);
    updateStat("totalWithdrawn",totalWithdrawn);
    updateStat("rafflePot",rafflePot);

    nextDividendTime = parseInt(lastDividend)+24*3600;
    updateDividendCountdown();

    const u = await contract.methods.users(account).call();
    const pending = await contract.methods.pendingDividends(account).call();

    document.getElementById("dep").innerText = web3.utils.fromWei(u.deposited.toString());
    document.getElementById("withdrawn").innerText = web3.utils.fromWei(u.withdrawn.toString());
    document.getElementById("shares").innerText = web3.utils.fromWei(u.shares.toString());
    document.getElementById("claimed").innerText = web3.utils.fromWei(u.dividendsClaimed.toString());
    document.getElementById("pending").innerText = web3.utils.fromWei(pending.toString());

    const sharePct = u.shares>0 && totalShares>0 ? ((u.shares/totalShares)*100).toFixed(2) : '0';
    document.getElementById("myShare").innerText = sharePct;

    document.getElementById("boost").innerText = u.boostBP>0?`${u.boostBP/100}% hasta ${new Date(u.boostEnd*1000).toLocaleString()}`:'-';
    document.getElementById("loan").innerText = u.loanAmount>0?`${web3.utils.fromWei(u.loanAmount)} BNB hasta ${new Date(u.loanEnd*1000).toLocaleString()}`:'-';
    document.getElementById("lastAction").innerText = u.lastAction>0?new Date(u.lastAction*1000).toLocaleString():'-';

    updateChart(tvl,div);
    loadRafflePlayers();
  }catch(err){console.error(err);}
}

function updateStat(id,value){
  const el=document.getElementById(id);
  const old = el.innerText;
  el.innerText = web3.utils.fromWei(value.toString());
  if(old!==el.innerText){ el.classList.add("update"); setTimeout(()=>el.classList.remove("update"),600);}
}

// ---------- Dividend Countdown ----------
function updateDividendCountdown(){
  if(!nextDividendTime) return;
  const countdownEl = document.getElementById("divCountdown");
  const interval = setInterval(()=>{
    const now = Math.floor(Date.now()/1000);
    const diff = nextDividendTime-now;
    if(diff<=0){ countdownEl.innerText = "00:00:00"; clearInterval(interval); loadStats(); return;}
    const h = Math.floor(diff/3600).toString().padStart(2,'0');
    const m = Math.floor((diff%3600)/60).toString().padStart(2,'0');
    const s = (diff%60).toString().padStart(2,'0');
    countdownEl.innerText = `${h}:${m}:${s}`;
  },1000);
}

// ---------- ACTIONS ----------
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
async function claim(){ await contract.methods.claim().send({from:account}); loadStats();}
async function activateBoost(){const amt=prompt("BNB para Boost"); if(!amt||isNaN(amt)) return; await contract.methods.activateBoost(web3.utils.toWei(amt),3600*24).send({from:account}); loadStats();}
async function takeLoan(){const amt=prompt("BNB para préstamo"); if(!amt||isNaN(amt)) return; await contract.methods.takeLoan(web3.utils.toWei(amt),3600*24).send({from:account}); loadStats();}
async function enterRaffle(){ await contract.methods.enterRaffle().send({from:account,value:web3.utils.toWei('0.01')}); loadStats();}

// ---------- DRAW RAFFLE ----------
async function drawRaffleWinner(){
  try{
    await contract.methods.drawRaffleWinner().send({from:account});
    alert("Sorteo realizado!");
    loadRafflePlayers();
    loadStats();
  }catch(e){alert("Error al sortear: "+e.message);}
}

// ---------- RAFFLE PLAYERS ----------
async function loadRafflePlayers(){
  const ul=document.getElementById("leaderboard");
  ul.innerHTML='';
  const pot = parseFloat(web3.utils.fromWei(await contract.methods.rafflePot().call()));
  const totalPlayers = parseInt(await contract.methods.totalUsers().call());
  for(let i=0;i<Math.min(5,totalPlayers);i++){
    const p = await contract.methods.rafflePlayers(i).call().catch(()=>null);
    if(p){
      const share = (pot/totalPlayers).toFixed(4);
      const li=document.createElement("li");
      li.innerText = `${p} - Pot Share ${share} BNB`;
      ul.appendChild(li);
    }
  }
  const winnerEl = document.getElementById("raffleWinner");
  winnerEl.innerText = '';
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

// ---------- Refresh Stats ----------
setInterval(()=>{if(contract&&account) loadStats();},15000);
