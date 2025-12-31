const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]; // Pega el ABI completo

let web3, contract, account, chart;

// Elementos
const connectBtn = document.getElementById("connectBtn");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const claimBtn = document.getElementById("claimBtn");
const bidBtn = document.getElementById("bidBtn");
const enterRaffleBtn = document.getElementById("enterRaffleBtn");

connectBtn.onclick = connect;
depositBtn.onclick = deposit;
withdrawBtn.onclick = withdraw;
claimBtn.onclick = claim;
bidBtn.onclick = bidAuction;
enterRaffleBtn.onclick = enterRaffle;

async function connect(){
  if(!window.ethereum){ alert("Instala MetaMask"); return; }
  web3 = new Web3(window.ethereum);
  try{
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if(chainId !== "0x61"){ alert("Cambia a BSC Testnet"); return; }
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    alert("Wallet conectada: " + account);
    await loadAllStats();
    initChart();
    startIntervals();
  }catch(e){ alert("Error MetaMask: "+e.message); }
}

// ---------- STATS ----------

async function loadAllStats(){
  if(!contract || !account) return;

  // Stats globales
  const [
    totalDep, totalWith, totalS, dividendPool,
    auctionInfo, raffleInfo, userStats
  ] = await Promise.all([
    contract.methods.totalDeposited().call(),
    contract.methods.totalWithdrawn().call(),
    contract.methods.totalShares().call(),
    contract.methods.dividendPool().call(),
    contract.methods.getAuctionInfo().call(),
    contract.methods.getRaffleInfo().call(),
    contract.methods.getUserStats(account).call()
  ]);

  // Mostrar stats globales
  document.getElementById("totalDeposited").innerText = web3.utils.fromWei(totalDep);
  document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei(totalWith);
  document.getElementById("totalShares").innerText = web3.utils.fromWei(totalS);
  document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool);

  // Stats usuario
  document.getElementById("userDeposited").innerText = web3.utils.fromWei(userStats.deposited);
  document.getElementById("userWithdrawn").innerText = web3.utils.fromWei(userStats.withdrawn);
  document.getElementById("userShares").innerText = web3.utils.fromWei(userStats.shares);
  document.getElementById("userDividendsClaimed").innerText = web3.utils.fromWei(userStats.dividendsClaimed);
  document.getElementById("userPendingDividends").innerText = web3.utils.fromWei(userStats.pending);

  const percentShare = totalS > 0 ? userStats.shares * 100 / totalS : 0;
  document.getElementById("userSharePercent").innerText = percentShare.toFixed(2) + "%";

  // Subasta
  updateAuctionUI(auctionInfo);

  // Rifa
  updateRaffleUI(raffleInfo);

  // Chart
  updateChart(totalDep, dividendPool);
}

// ---------- ACCIONES ----------

async function deposit(){
  const amt = document.getElementById("depositAmount").value;
  if(!amt || isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amt) });
  loadAllStats();
}

async function withdraw(){
  const amt = document.getElementById("withdrawAmount").value;
  if(!amt || isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.withdraw(web3.utils.toWei(amt)).send({ from: account });
  loadAllStats();
}

async function claim(){
  await contract.methods.claimDividends().send({ from: account });
  loadAllStats();
}

// Subasta
async function bidAuction(){
  const currentBid = await contract.methods.getAuctionInfo().call().then(a=>a.currentBid);
  const value = web3.utils.toBN(currentBid).add(web3.utils.toBN(web3.utils.toWei("0.001")));
  await contract.methods.bidAuction().send({ from: account, value });
  loadAllStats();
}

// Rifa
async function enterRaffle(){
  const tickets = parseInt(document.getElementById("raffleTickets").value);
  if(isNaN(tickets) || tickets < 1) return alert("Número inválido");
  await contract.methods.enterRaffle(tickets).send({ from: account, value: web3.utils.toWei((tickets*0.001).toString()) });
  loadAllStats();
}

// ---------- CHART ----------

let chart;
function initChart(){
  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx,{
    type:"line",
    data:{ labels:[], datasets:[
      { label:"TVL", data:[], borderColor:"#1e90ff", fill:false },
      { label:"Dividend Pool", data:[], borderColor:"#00cc99", fill:false }
    ]},
    options:{ responsive:true, animation:{duration:500}, scales:{y:{beginAtZero:true}} }
  });
}

function updateChart(tvl, div){
  if(!chart) return;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(web3.utils.fromWei(tvl));
  chart.data.datasets[1].data.push(web3.utils.fromWei(div));
  if(chart.data.labels.length>30){ chart.data.labels.shift(); chart.data.datasets.forEach(d=>d.data.shift()); }
  chart.update();
}

// ---------- UI Helpers ----------

function updateAuctionUI(info){
  document.getElementById("auctionCurrentBid").innerText = web3.utils.fromWei(info.currentBid);
  const end = parseInt(info.endTime)*1000;
  startCountdown("auctionCountdown", end);

  // Top bidders
  const ul = document.getElementById("auctionTopBidders");
  ul.innerHTML = "";
  info.topBidders.forEach(b=>{
    if(b !== "0x0000000000000000000000000000000000000000"){
      const li = document.createElement("li"); li.innerText = b; ul.appendChild(li);
    }
  });
}

function updateRaffleUI(info){
  document.getElementById("rafflePrizePot").innerText = web3.utils.fromWei(info.prizePot);
  const end = parseInt(info.endTime)*1000;
  startCountdown("raffleCountdown", end);

  document.getElementById("raffleTotalTickets").innerText = info.tickets.length;

  const ul = document.getElementById("raffleTopWinners");
  ul.innerHTML = "";
}

// ---------- COUNTDOWN ----------

function startCountdown(id, endTime){
  const el = document.getElementById(id);
  if(!el) return;
  function update(){
    const now = Date.now();
    const diff = Math.max(0,endTime-now);
    const h = Math.floor(diff/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    el.innerText = `${h}h ${m}m ${s}s`;
  }
  update();
  setInterval(update,1000);
}

// ---------- AUTO REFRESH ----------
function startIntervals(){
  setInterval(loadAllStats,15000);
  setInterval(async ()=>{
    const auctionInfo = await contract.methods.getAuctionInfo().call();
    const raffleInfo = await contract.methods.getRaffleInfo().call();
    updateAuctionUI(auctionInfo);
    updateRaffleUI(raffleInfo);
  },5000);
}
