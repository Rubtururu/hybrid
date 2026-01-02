const CONTRACT_ADDRESS = "0xf9F1fBcE871a369CD629860C5559cb0be7694DD5";
const ABI = [/* ABI completo que me diste */];

let web3;
let contract;
let account;

// Conectar MetaMask
async function connect() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    document.getElementById("walletAddress").innerText = account;
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    updateAllStats();
    listenEvents();
    setInterval(updateAllStats, 5000);
  } else {
    alert("MetaMask no encontrado!");
  }
}

// --------------------------------------------------
// DASHBOARD
// --------------------------------------------------
async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if(!amount || amount <= 0) return alert("Ingrese un monto válido");
  const weiAmount = web3.utils.toWei(amount, "ether");
  await contract.methods.deposit().send({from: account, value: weiAmount});
  updateAllStats();
}

async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  if(!amount || amount <= 0) return alert("Ingrese un monto válido");
  const weiAmount = web3.utils.toWei(amount, "ether");
  await contract.methods.withdraw(weiAmount).send({from: account});
  updateAllStats();
}

async function claimDividends() {
  await contract.methods.claimDividends().send({from: account});
  updateAllStats();
}

// --------------------------------------------------
// RAFFLE
// --------------------------------------------------
async function enterRaffle() {
  const tickets = document.getElementById("raffleBuyAmount").value;
  if(!tickets || tickets <=0) return alert("Ingrese cantidad de tickets");
  const price = await contract.methods.TICKET_PRICE().call();
  const weiAmount = BigInt(price) * BigInt(tickets);
  await contract.methods.enterRaffle(tickets).send({from: account, value: weiAmount.toString()});
  updateAllStats();
}

async function updateRaffle() {
  const stats = await contract.methods.getRaffleStats().call();
  document.getElementById("rafflePot").innerText = web3.utils.fromWei(stats.prizePot, "ether");
  document.getElementById("raffleTickets").innerText = stats.tickets;

  // Contar tickets propios
  let myTickets = 0;
  for(let i=0; i<stats.tickets; i++){
    const ticket = await contract.methods.raffleTickets(i).call();
    if(ticket.user.toLowerCase() === account.toLowerCase()) myTickets++;
  }
  document.getElementById("myTickets").innerText = myTickets;

  const share = stats.tickets == 0 ? 0 : (myTickets * 100 / stats.tickets).toFixed(2);
  document.getElementById("myRaffleShare").innerText = share;

  // Temporizador
  let time = stats.timeLeft;
  const hours = String(Math.floor(time / 3600)).padStart(2,'0');
  const minutes = String(Math.floor((time % 3600)/60)).padStart(2,'0');
  const seconds = String(time % 60).padStart(2,'0');
  document.getElementById("raffleTimer").innerText = `${hours}:${minutes}:${seconds}`;
}

// --------------------------------------------------
// AUCTION
// --------------------------------------------------
async function placeBid() {
  const stats = await contract.methods.getAuctionStats().call();
  const nextBid = BigInt(stats.topBid) + BigInt(await contract.methods.AUCTION_INCREMENT().call());
  await contract.methods.bidAuction().send({from: account, value: nextBid.toString()});
  updateAllStats();
}

async function updateAuction() {
  const stats = await contract.methods.getAuctionStats().call();
  document.getElementById("auctionPot").innerText = web3.utils.fromWei(stats.prizePot, "ether");
  document.getElementById("topBid").innerText = web3.utils.fromWei(stats.topBid, "ether");

  const nextBid = BigInt(stats.topBid) + BigInt(await contract.methods.AUCTION_INCREMENT().call());
  document.getElementById("nextBid").innerText = web3.utils.fromWei(nextBid.toString(), "ether");

  let time = stats.timeLeft;
  const hours = String(Math.floor(time / 3600)).padStart(2,'0');
  const minutes = String(Math.floor((time % 3600)/60)).padStart(2,'0');
  const seconds = String(time % 60).padStart(2,'0');
  document.getElementById("auctionTimer").innerText = `${hours}:${minutes}:${seconds}`;

  // Ranking últimos 5 bidders
  const list = document.getElementById("auctionWinnersList");
  list.innerHTML = "";
  stats.lastBidders.forEach((b)=> {
    const li = document.createElement("li");
    li.innerText = b;
    list.appendChild(li);
  });
}

// --------------------------------------------------
// DASHBOARD STATS
// --------------------------------------------------
async function updateDashboard() {
  const total = await contract.methods.treasuryPool().call();
  const user = await contract.methods.users(account).call();
  const share = await contract.methods.getUserShare(account).call();
  const dividendPool = await contract.methods.dividendPool().call();
  const dividendPercent = await contract.methods.dividendPercent().call();

  document.getElementById("totalStaked").innerText = web3.utils.fromWei(total, "ether");
  document.getElementById("myStaked").innerText = web3.utils.fromWei(user.staked, "ether");
  document.getElementById("myShare").innerText = (share.stakingShareBP/100).toFixed(2);
  document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool, "ether");

  const today = (BigInt(dividendPool) * BigInt(dividendPercent) / 100n).toString();
  document.getElementById("dividendToday").innerText = web3.utils.fromWei(today, "ether");
}

// --------------------------------------------------
// EVENT LOGS
// --------------------------------------------------
function listenEvents() {
  contract.events.allEvents({fromBlock:'latest'})
    .on('data', event => {
      const li = document.createElement("li");
      li.innerText = `${event.event}: ${JSON.stringify(event.returnValues)}`;
      document.getElementById("logsList").prepend(li);
    });
}

// --------------------------------------------------
// UPDATE ALL
// --------------------------------------------------
async function updateAllStats() {
  if(!account) return;
  await updateDashboard();
  await updateRaffle();
  await updateAuction();
}

// --------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------
document.getElementById("connectBtn").addEventListener("click", connect);
document.getElementById("depositBtn").addEventListener("click", deposit);
document.getElementById("withdrawBtn").addEventListener("click", withdraw);
document.getElementById("claimBtn").addEventListener("click", claimDividends);
document.getElementById("raffleBtn").addEventListener("click", enterRaffle);
document.getElementById("bidBtn").addEventListener("click", placeBid);

// Actualizar temporizadores cada segundo
setInterval(()=> {
  updateRaffle();
  updateAuction();
}, 1000);
