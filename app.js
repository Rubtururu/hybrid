const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let provider, signer, contract, account;
let intervalDividends, intervalAuction, intervalRaffle;

window.addEventListener("load", async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    console.log("Ethers listo.");
  } else {
    alert("Instala MetaMask");
  }
});

async function connectWallet() {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    account = accounts[0];
    document.getElementById("walletAddress").innerText = account;
    loadAllStats();
    startIntervals();
  } catch (e) {
    alert("Error MetaMask: " + e.message);
  }
}

// ---------- STATS ----------
async function loadAllStats() {
  if (!contract || !account) return;
  await loadStakingStats();
  await loadDividendStats();
  await loadAuctionStats();
  await loadRaffleStats();
}

async function loadStakingStats() {
  const user = await contract.users(account);
  const totalStaked = await contract.totalStaked();
  document.getElementById("staked").innerText = ethers.utils.formatEther(user.staked) + " BNB";
  document.getElementById("withdrawn").innerText = ethers.utils.formatEther(user.withdrawn) + " BNB";
  const percentShare = totalStaked.gt(0) ? (user.staked * 100 / totalStaked) : 0;
  document.getElementById("percentShare").innerText = percentShare.toFixed(2) + "%";
}

async function loadDividendStats() {
  const dividendPool = await contract.dividendPool();
  const DAILY_DIVIDEND_PERCENT = await contract.DAILY_DIVIDEND_PERCENT();
  const dailyDividend = dividendPool.mul(DAILY_DIVIDEND_PERCENT).div(100);
  document.getElementById("dividendPool").innerText = ethers.utils.formatEther(dividendPool) + " BNB";
  document.getElementById("dailyDividend").innerText = ethers.utils.formatEther(dailyDividend) + " BNB";

  // Cuenta atrás dividendos
  const lastDay = await contract.lastDividendDay();
  const now = Math.floor(Date.now() / 1000);
  const nextDividend = lastDay.toNumber() + 24 * 60 * 60;
  updateCountdown("countdownDividend", nextDividend - now);
}

async function loadAuctionStats() {
  const auctionInfo = await contract.getAuctionInfo();
  const endTime = auctionInfo.endTime.toNumber();
  const currentBid = auctionInfo.currentBid;
  const bidCount = auctionInfo.bidCount.toNumber();
  const active = auctionInfo.active;
  document.getElementById("auctionActive").innerText = active ? "Activa" : "Cerrada";
  document.getElementById("auctionCurrentBid").innerText = ethers.utils.formatEther(currentBid) + " BNB";
  document.getElementById("auctionBidCount").innerText = bidCount;
  updateCountdown("countdownAuction", endTime - Math.floor(Date.now()/1000));
}

async function loadRaffleStats() {
  const raffleInfo = await contract.getRaffleInfo();
  const endTime = raffleInfo.endTime.toNumber();
  const prizePot = raffleInfo.prizePot;
  const totalTickets = raffleInfo.tickets.length;
  const myTickets = raffleInfo.tickets.filter(t => t.toLowerCase() === account.toLowerCase()).length;
  document.getElementById("rafflePrizePot").innerText = ethers.utils.formatEther(prizePot) + " BNB";
  document.getElementById("raffleTotalTickets").innerText = totalTickets;
  document.getElementById("raffleMyTickets").innerText = myTickets;
  updateCountdown("countdownRaffle", endTime - Math.floor(Date.now()/1000));
}

// ---------- COUNTDOWN ----------
function updateCountdown(elementId, secondsLeft) {
  if (secondsLeft < 0) secondsLeft = 0;
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  document.getElementById(elementId).innerText = `${hours}h ${minutes}m ${seconds}s`;
}

// ---------- ACTIONS ----------
async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if (!amount || isNaN(amount)) return alert("Cantidad inválida");
  await contract.deposit({ value: ethers.utils.parseEther(amount) });
  loadAllStats();
}

async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  if (!amount || isNaN(amount)) return alert("Cantidad inválida");
  await contract.withdraw(ethers.utils.parseEther(amount));
  loadAllStats();
}

async function claimDividends() {
  await contract.claimDividends();
  loadAllStats();
}

async function bidAuction() {
  await contract.bidAuction({ value: ethers.utils.parseEther("0.001") });
  loadAllStats();
}

async function buyRaffleTickets() {
  const tickets = document.getElementById("raffleTickets").value;
  if (!tickets || isNaN(tickets)) return alert("Cantidad inválida");
  await contract.enterRaffle(tickets, { value: ethers.utils.parseEther((0.001*tickets).toString()) });
  loadAllStats();
}

// ---------- INTERVALS ----------
function startIntervals() {
  intervalDividends = setInterval(loadDividendStats, 1000);
  intervalAuction = setInterval(loadAuctionStats, 1000);
  intervalRaffle = setInterval(loadRaffleStats, 1000);
}
