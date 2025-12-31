const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";

// ABI completo con todas las funciones
const ABI = [
  {"constant":true,"inputs":[],"name":"treasuryPool","outputs":[{"name":"","type":"uint256"}],"type":"function"},
  {"constant":true,"inputs":[],"name":"dividendPool","outputs":[{"name":"","type":"uint256"}],"type":"function"},
  {"constant":true,"inputs":[],"name":"totalUsers","outputs":[{"name":"","type":"uint256"}],"type":"function"},
  {"constant":true,"inputs":[],"name":"volume24h","outputs":[{"name":"","type":"uint256"}],"type":"function"}, 
  {"constant":true,"inputs":[],"name":"creatorFee","outputs":[{"name":"","type":"uint256"}],"type":"function"}, 
  {"constant":true,"inputs":[],"name":"totalDeposits","outputs":[{"name":"","type":"uint256"}],"type":"function"}, 
  {"constant":true,"inputs":[],"name":"totalWithdrawn","outputs":[{"name":"","type":"uint256"}],"type":"function"}, 
  {"constant":true,"inputs":[],"name":"totalClaimed","outputs":[{"name":"","type":"uint256"}],"type":"function"}, 
  {"constant":true,"inputs":[],"name":"totalShares","outputs":[{"name":"","type":"uint256"}],"type":"function"}, 
  {"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserStats","outputs":[
    {"name":"deposited","type":"uint256"},
    {"name":"withdrawn","type":"uint256"},
    {"name":"shares","type":"uint256"},
    {"name":"claimed","type":"uint256"},
    {"name":"pending","type":"uint256"},
    {"name":"dummy1","type":"uint256"},
    {"name":"dummy2","type":"uint256"},
    {"name":"dummy3","type":"uint256"}
  ],"type":"function"},
  {"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},
  {"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"type":"function"},
  {"constant":false,"inputs":[],"name":"claim","outputs":[],"type":"function"}
];

let web3, contract, account, chart;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;

// ------------------ CONNECT ------------------
async function connect(){
  if(window.ethereum){
    web3 = new Web3(window.ethereum);
    try{
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x61'){ alert("Cambia MetaMask a BSC Testnet"); return; }
      contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      alert("Wallet conectada: " + account);
      loadStats();
      initChart();
    }catch(err){ alert("Error al conectar MetaMask: "+err.message); }
  }else{ alert("Instala MetaMask"); }
}

// ------------------ LOAD STATS ------------------
async function loadStats(){
  if(!contract || !account) return;
  try{
    const [tvl, divPool, users, volume, creatorFee, totalDeposits, totalWithdrawn, totalClaimed, totalShares] = await Promise.all([
      contract.methods.treasuryPool().call(),
      contract.methods.dividendPool().call(),
      contract.methods.totalUsers().call(),
      contract.methods.volume24h().call(),
      contract.methods.creatorFee().call(),
      contract.methods.totalDeposits().call(),
      contract.methods.totalWithdrawn().call(),
      contract.methods.totalClaimed().call(),
      contract.methods.totalShares().call()
    ]);

    document.getElementById("tvl").innerText = web3.utils.fromWei(tvl);
    document.getElementById("divPool").innerText = web3.utils.fromWei(divPool);
    document.getElementById("users").innerText = users;
    document.getElementById("volume").innerText = web3.utils.fromWei(volume);
    document.getElementById("creatorFee").innerText = web3.utils.fromWei(creatorFee);
    document.getElementById("totalDeposits").innerText = web3.utils.fromWei(totalDeposits);
    document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei(totalWithdrawn);
    document.getElementById("totalClaimed").innerText = web3.utils.fromWei(totalClaimed);
    document.getElementById("totalShares").innerText = web3.utils.fromWei(totalShares);

    const u = await contract.methods.getUserStats(account).call();
    document.getElementById("dep").innerText = web3.utils.fromWei(u[0].toString());
    document.getElementById("withdrawn").innerText = web3.utils.fromWei(u[1].toString());
    document.getElementById("shares").innerText = web3.utils.fromWei(u[2].toString());
    document.getElementById("claimed").innerText = web3.utils.fromWei(u[3].toString());
    document.getElementById("pending").innerText = web3.utils.fromWei(u[4].toString());

    // Dividend info aproximada
    const daily = parseFloat(web3.utils.fromWei(divPool)) * 0.01; 
    document.getElementById("dailyDividend").innerText = daily.toFixed(6);
    document.getElementById("lastDividend").innerText = new Date().toLocaleString();
    const next = new Date(Date.now() + 24*3600*1000);
    document.getElementById("nextDividend").innerText = next.toLocaleString();

    updateChart(tvl, divPool);

  }catch(err){ console.error("Error cargando stats:", err); }
}

// ------------------ ACTIONS ------------------
async function deposit(){
  const amount = document.getElementById("amount").value;
  if(!amount || isNaN(amount)) return alert("Ingresa cantidad válida");
  await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount) });
  loadStats();
}

async function withdraw(){
  const amount = document.getElementById("amount").value;
  if(!amount || isNaN(amount)) return alert("Ingresa cantidad válida");
  await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
  loadStats();
}

async function claim(){
  await contract.methods.claim().send({ from: account });
  loadStats();
}

// ------------------ CHART ------------------
function initChart(){
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx,{
    type:'line',
    data:{
      labels:[],
      datasets:[
        { label:'TVL BNB', data:[], borderColor:'#1e90ff', fill:false },
        { label:'Dividend Pool BNB', data:[], borderColor:'#00ff99', fill:false }
      ]
    },
    options:{responsive:true, animation:false}
  });
}

function updateChart(tvl, div){
  if(!chart) return;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(web3.utils.fromWei(tvl.toString()));
  chart.data.datasets[1].data.push(web3.utils.fromWei(div.toString()));
  if(chart.data.labels.length>20){
    chart.data.labels.shift();
    chart.data.datasets.forEach(d=>d.data.shift());
  }
  chart.update();
}

// ------------------ AUTO REFRESH ------------------
setInterval(()=>{ if(contract && account) loadStats(); },15000);
