// app.js

const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contract;
let account;
let chart;

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        console.log("MetaMask detectado");
    } else {
        alert("Instala MetaMask para usar esta DApp");
        return;
    }

    // Asignar eventos a los botones
    document.getElementById("connectBtn").addEventListener('click', connect);
    document.getElementById("depositBtn").addEventListener('click', deposit);
    document.getElementById("withdrawBtn").addEventListener('click', withdraw);
    document.getElementById("claimBtn").addEventListener('click', claimDividends);
    document.getElementById("auctionBidBtn").addEventListener('click', bidAuction);
    document.getElementById("auctionCloseBtn").addEventListener('click', closeAuction);
    document.getElementById("raffleEnterBtn").addEventListener('click', enterRaffle);
    document.getElementById("raffleCloseBtn").addEventListener('click', closeRaffle);

    initChart();
});

// Conectar MetaMask
async function connect() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x61') { // BSC Testnet
            alert("Cambia a BSC Testnet");
            return;
        }
        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        alert("Wallet conectada: " + account);
        loadStats();
    } catch (err) {
        console.error(err);
        alert("Error al conectar MetaMask: " + err.message);
    }
}

// ---------- STATS ----------
async function loadStats() {
    if (!contract || !account) return;
    try {
        const [
            totalDeposited,
            totalWithdrawn,
            dividendPool,
            totalShares,
            userStats,
            auctionInfo,
            raffleInfo
        ] = await Promise.all([
            contract.methods.totalDeposited().call(),
            contract.methods.totalWithdrawn().call(),
            contract.methods.dividendPool().call(),
            contract.methods.totalShares().call(),
            contract.methods.getUserStats(account).call(),
            contract.methods.getAuctionInfo().call(),
            contract.methods.getRaffleInfo().call()
        ]);

        // STAKING
        document.getElementById("totalDeposited").innerText = web3.utils.fromWei(totalDeposited);
        document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei(totalWithdrawn);
        document.getElementById("dividendPool").innerText = web3.utils.fromWei(dividendPool);
        document.getElementById("totalShares").innerText = web3.utils.fromWei(totalShares);

        // USER STATS
        document.getElementById("myDeposited").innerText = web3.utils.fromWei(userStats.deposited);
        document.getElementById("myWithdrawn").innerText = web3.utils.fromWei(userStats.withdrawn);
        document.getElementById("myShares").innerText = web3.utils.fromWei(userStats.shares);
        document.getElementById("myDividendsClaimed").innerText = web3.utils.fromWei(userStats.dividendsClaimed);
        document.getElementById("myPendingDividends").innerText = web3.utils.fromWei(userStats.pending);

        // PERCENT SHARE
        let percentShare = totalShares > 0 ? (userStats.shares / totalShares * 100).toFixed(2) : 0;
        document.getElementById("myPercentShare").innerText = percentShare + "%";

        // AUCTION INFO
        document.getElementById("auctionTopBidders").innerText = auctionInfo[0].join(", ");
        document.getElementById("auctionCurrentBid").innerText = web3.utils.fromWei(auctionInfo[1]);
        document.getElementById("auctionEndTime").innerText = new Date(auctionInfo[2]*1000).toLocaleString();
        document.getElementById("auctionActive").innerText = auctionInfo[3] ? "Yes" : "No";

        // RAFFLE INFO
        document.getElementById("raffleTicketsSold").innerText = raffleInfo[0].length;
        document.getElementById("rafflePrizePot").innerText = web3.utils.fromWei(raffleInfo[1]);
        document.getElementById("raffleEndTime").innerText = new Date(raffleInfo[2]*1000).toLocaleString();
        document.getElementById("raffleActive").innerText = raffleInfo[3] ? "Yes" : "No";

        // UPDATE CHART
        updateChart(totalDeposited, dividendPool);

    } catch (err) {
        console.error(err);
    }
}

// ---------- ACTIONS ----------
async function deposit() {
    const amount = document.getElementById("depositAmount").value;
    if (!amount || isNaN(amount)) return alert("Cantidad inválida");
    await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount) });
    loadStats();
}

async function withdraw() {
    const amount = document.getElementById("withdrawAmount").value;
    if (!amount || isNaN(amount)) return alert("Cantidad inválida");
    await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
    loadStats();
}

async function claimDividends() {
    await contract.methods.claimDividends().send({ from: account });
    loadStats();
}

// ---------- AUCTION ----------
async function bidAuction() {
    const bidAmount = document.getElementById("auctionBidAmount").value;
    if (!bidAmount || isNaN(bidAmount)) return alert("Cantidad inválida");
    await contract.methods.bidAuction().send({ from: account, value: web3.utils.toWei(bidAmount) });
    loadStats();
}

async function closeAuction() {
    await contract.methods.closeAuction().send({ from: account });
    loadStats();
}

// ---------- RAFFLE ----------
async function enterRaffle() {
    const tickets = document.getElementById("raffleTickets").value;
    if (!tickets || isNaN(tickets)) return alert("Cantidad inválida");
    await contract.methods.enterRaffle(tickets).send({ from: account, value: web3.utils.toWei((tickets * 0.001).toString()) });
    loadStats();
}

async function closeRaffle() {
    await contract.methods.closeRaffle().send({ from: account });
    loadStats();
}

// ---------- CHART ----------
let chart;
function initChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Total Deposited BNB', data: [], borderColor: '#1e90ff', fill: false },
                { label: 'Dividend Pool BNB', data: [], borderColor: '#00ff99', fill: false }
            ]
        },
        options: { responsive: true, animation: { duration: 500 }, scales: { y: { beginAtZero: true } } }
    });
}

function updateChart(totalDeposited, dividendPool) {
    if (!chart) return;
    const time = new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(web3.utils.fromWei(totalDeposited));
    chart.data.datasets[1].data.push(web3.utils.fromWei(dividendPool));

    if (chart.data.labels.length > 30) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(d => d.data.shift());
    }
    chart.update();
}

// Recargar stats cada 15 segundos
setInterval(() => {
    if (contract && account) loadStats();
}, 15000);
