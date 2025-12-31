const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account, chart;

// Elementos DOM
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

// ---------- CONNECT ----------
async function connect() {
  if (!window.ethereum) { alert("Instala MetaMask"); return; }
  web3 = new Web3(window.ethereum);
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if(chainId !== "0x61"){ alert("Cambia MetaMask a BSC Testnet"); return; }
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    alert("Wallet conectada: " + account);
    loadStats();
    initChart();
    setInterval(updateAll, 15000);
  } catch(e) { alert("Error MetaMask: "+e.message); }
}

// ---------- LOAD STATS ----------
async function loadStats(){
  if(!contract || !account) return;

  try {
    // Stats globales
    const [
      totalDeposited, totalWithdrawn, totalShares, dividendPool,
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

    // Global Stats
    document.getElementById("totalDeposited").innerText = web3.utils.fromWei(totalDeposited) + " BNB";
    document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei(totalWithdrawn) + " BNB";
    document.getElementById("totalShares").innerText = web3.utils.fromWei(totalShares);
    document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool) + " BNB";

    // User Stats
    document.getElementById("userDeposited").innerText = web3.utils.fromWei(userStats.deposited);
    document.getElementById("userWithdrawn").innerText = web3.utils.fromWei(userStats.withdrawn);
    document.getElementById("userShares").innerText = web3.utils.fromWei(userStats.shares);
    const sharePercent = totalShares > 0 ? (userStats.shares/totalShares)*100 : 0;
    document.getElementById("userSharePercent").innerText = sharePercent.toFixed(2) + "%";
    document.getElementById("userDividendsClaimed").innerText = web3.utils.fromWei(userStats.dividendsClaimed);
    document.getElementById("userPendingDividends").innerText = web3.utils.fromWei(userStats.pending);

    // Auction
    const auctionTopList = document.getElementById("auctionTopBidders");
    auctionTopList.innerHTML = "";
    auctionInfo.topBidders.forEach(addr => {
      if(addr !== "0x0000000000000000000000000000000000000000")
        auctionTopList.innerHTML += `<li>${addr}</li>`;
    });
    document.getElementById("auctionCurrentBid").innerText = web3.utils.fromWei(auctionInfo.currentBid) + " BNB";
    updateCountdown("auctionCountdown", auctionInfo.endTime);

    // Raffle
    const raffleTickets = raffleInfo.tickets.length;
    document.getElementById("raffleTotalTickets").innerText = raffleTickets;
    document.getElementById("rafflePrizePot").innerText = web3.utils.fromWei(raffleInfo.prizePot) + " BNB";
    updateCountdown("raffleCountdown", raffleInfo.endTime);

    // User Tickets
    const myTickets = raffleInfo.tickets.filter(t => t.toLowerCase() === account.toLowerCase()).length;
    document.getElementById("userRaffleTickets").innerText = myTickets;

    // Update Chart
    updateChart(web3.utils.fromWei(totalDeposited), web3.utils.fromWei(dividendPool));

  } catch(err){ console.error(err); }
}

// ---------- ACTIONS ----------
async function deposit(){
  const amt = document.getElementById("depositAmount").value;
  if(!amt || isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.deposit().send({from: account, value: web3.utils.toWei(amt)});
  loadStats();
}

async function withdraw(){
  const amt = document.getElementById("withdrawAmount").value;
  if(!amt || isNaN(amt)) return alert("Cantidad inválida");
  await contract.methods.withdraw(web3.utils.toWei(amt)).send({from: account});
  loadStats();
}

async function claim(){
  await contract.methods.claimDividends().send({from: account});
  loadStats();
}

async function bidAuction(){
  const currentBidWei = await contract.methods.getAuctionInfo().call().then(a=>a.currentBid);
  const nextBid = web3.utils.fromWei((BigInt(currentBidWei) + BigInt(web3.utils.toWei("0.001"))).toString());
  await contract.methods.bidAuction().send({from: account, value: web3.utils.toWei(nextBid)});
  loadStats();
}

async function enterRaffle(){
  const numTickets = document.getElementById("raffleTickets").value;
  if(!numTickets || isNaN(numTickets)) return alert("Cantidad inválida");
  await contract.methods.enterRaffle(numTickets).send({from: account, value: web3.utils.toWei((0.001*numTickets).toString())});
  loadStats();
}

// ---------- COUNTDOWN ----------
function updateCountdown(elementId, timestamp){
  const elem = document.getElementById(elementId);
  const interval = setInterval(()=>{
    const now = Math.floor(Date.now()/1000);
    let diff = timestamp - now;
    if(diff<0) diff = 0;
    const h = Math.floor(diff/3600);
    const m = Math.floor((diff%3600)/60);
    const s = diff%60;
    elem.innerText = `${h}h ${m}m ${s}s`;
  },1000);
}

// ---------- CHART ----------
let chart;
function initChart(){
  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx,{
    type:'line',
    data:{labels:[], datasets:[
      {label:'Total Deposited BNB', data:[], borderColor:'#1e90ff', fill:false, tension:0.3},
      {label:'Dividend Pool BNB', data:[], borderColor:'#00cc99', fill:false, tension:0.3}
    ]},
    options:{responsive:true, animation:{duration:500}, scales:{y:{beginAtZero:true}}}
  });
}

function updateChart(totalDeposited, dividendPool){
  if(!chart) return;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(totalDeposited);
  chart.data.datasets[1].data.push(dividendPool);
  if(chart.data.labels.length>30){
    chart.data.labels.shift();
    chart.data.datasets.forEach(d=>d.data.shift());
  }
  chart.update();
}

// ---------- UPDATE ALL ----------
async function updateAll(){
  loadStats();
}

