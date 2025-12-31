<!-- Incluye Web3.js y Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/web3@1.10.1/dist/web3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05"; // reemplaza por tu contrato
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contract;
let account;
let chart;
let statsInterval;

// ------------------ CONEXION METAMASK ------------------
async function connect() {
    if (!window.ethereum) {
        alert("Instala MetaMask para usar la dApp");
        return;
    }
    try {
        web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x61'){ // BSC Testnet
            alert("Cambia MetaMask a BSC Testnet");
            return;
        }

        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        console.log("Wallet conectada:", account);
        alert("Wallet conectada: " + account);

        await loadStats();
        initChart();
        startIntervals();
    } catch (err) {
        console.error("Error MetaMask:", err);
        alert("Error MetaMask: " + err.message);
    }
}

// ------------------ ESTADISTICAS ------------------
async function loadStats() {
    if (!contract || !account) return;

    try {
        const [
            userStats,
            auctionInfo,
            raffleInfo
        ] = await Promise.all([
            contract.methods.getUserStats(account).call(),
            contract.methods.getAuctionInfo().call(),
            contract.methods.getRaffleInfo().call()
        ]);

        // Stats usuario
        document.getElementById("dep").innerText = web3.utils.fromWei(userStats.deposited.toString());
        document.getElementById("withdrawn").innerText = web3.utils.fromWei(userStats.withdrawn.toString());
        document.getElementById("shares").innerText = web3.utils.fromWei(userStats.shares.toString());
        document.getElementById("claimed").innerText = web3.utils.fromWei(userStats.dividendsClaimed.toString());
        document.getElementById("pending").innerText = web3.utils.fromWei(userStats.pending.toString());

        // Auction
        document.getElementById("auctionCurrentBid").innerText = web3.utils.fromWei(auctionInfo.currentBid.toString());
        document.getElementById("auctionEnd").innerText = new Date(auctionInfo.endTime*1000).toLocaleString();

        // Raffle
        document.getElementById("rafflePot").innerText = web3.utils.fromWei(raffleInfo.prizePot.toString());
        document.getElementById("raffleEnd").innerText = new Date(raffleInfo.endTime*1000).toLocaleString();

        updateChart(userStats.shares, raffleInfo.prizePot);

    } catch (err) {
        console.error("Error cargando stats:", err);
    }
}

// ------------------ ACCIONES ------------------
async function deposit() {
    const amt = document.getElementById("amount").value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amt) });
    await loadStats();
}

async function withdraw() {
    const amt = document.getElementById("amount").value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.methods.withdraw(web3.utils.toWei(amt)).send({ from: account });
    await loadStats();
}

async function claimDividends() {
    await contract.methods.claimDividends().send({ from: account });
    await loadStats();
}

async function bidAuction() {
    const amt = document.getElementById("auctionBid").value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.methods.bidAuction().send({ from: account, value: web3.utils.toWei(amt) });
    await loadStats();
}

async function enterRaffle() {
    const tickets = document.getElementById("raffleTickets").value;
    if(!tickets || isNaN(tickets)) return alert("Número de tickets inválido");
    await contract.methods.enterRaffle(tickets).send({ from: account, value: web3.utils.toWei((tickets*0.001).toString()) });
    await loadStats();
}

// ------------------ CHART ------------------
function initChart() {
    const ctx = document.getElementById("chart").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                { label: "Mis Shares", data: [], borderColor: "#1e90ff", fill:false },
                { label: "Raffle Prize Pot", data: [], borderColor: "#00cc66", fill:false }
            ]
        },
        options: { responsive:true, animation:{ duration: 500 }, scales:{ y:{ beginAtZero:true } } }
    });
}

function updateChart(shares, rafflePot) {
    if(!chart) return;
    const time = new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(web3.utils.fromWei(shares.toString()));
    chart.data.datasets[1].data.push(web3.utils.fromWei(rafflePot.toString()));
    if(chart.data.labels.length>20){
        chart.data.labels.shift();
        chart.data.datasets.forEach(d=>d.data.shift());
    }
    chart.update();
}

// ------------------ INTERVALOS ------------------
function startIntervals() {
    if(statsInterval) clearInterval(statsInterval);
    statsInterval = setInterval(()=>{ loadStats(); }, 15000);
}

// ------------------ BOTONES ------------------
document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claimDividends;
document.getElementById("auctionBidBtn").onclick = bidAuction;
document.getElementById("raffleEnterBtn").onclick = enterRaffle;

</script>
