const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account, chart;
let auctionTimer, raffleTimer;

// ----------- ELEMENTOS DOM ------------
const connectBtn = document.getElementById("connectBtn");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const claimBtn = document.getElementById("claimBtn");
const bidBtn = document.getElementById("bidBtn");
const enterRaffleBtn = document.getElementById("enterRaffleBtn");

// STATS
const totalDepositedEl = document.getElementById("totalDeposited");
const totalWithdrawnEl = document.getElementById("totalWithdrawn");
const dividendPoolEl = document.getElementById("dividendPool");
const totalSharesEl = document.getElementById("totalShares");

const userDepositedEl = document.getElementById("userDeposited");
const userWithdrawnEl = document.getElementById("userWithdrawn");
const userSharesEl = document.getElementById("userShares");
const userSharePercentEl = document.getElementById("userSharePercent");
const userDividendsClaimedEl = document.getElementById("userDividendsClaimed");
const userPendingDividendsEl = document.getElementById("userPendingDividends");
const userTicketsEl = document.getElementById("userTickets");

// AUCTION
const auctionCurrentBidEl = document.getElementById("auctionCurrentBid");
const auctionCountdownEl = document.getElementById("auctionCountdown");
const auctionTopBiddersEl = document.getElementById("auctionTopBidders");

// RAFFLE
const rafflePrizePotEl = document.getElementById("rafflePrizePot");
const raffleCountdownEl = document.getElementById("raffleCountdown");
const raffleTotalTicketsEl = document.getElementById("raffleTotalTickets");
const raffleTopWinnersEl = document.getElementById("raffleTopWinners");

// CHART
const ctx = document.getElementById('chart').getContext('2d');

// ----------- FUNCIONES -----------

async function connect() {
    if (!window.ethereum) {
        alert("Instala MetaMask");
        return;
    }
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        connectBtn.innerText = "Conectado: " + account;
        initChart();
        updateAll();
        setInterval(updateAll, 15000);
    } catch (e) {
        alert("Error MetaMask: " + e.message);
    }
}

async function updateAll() {
    if (!contract || !account) return;
    await Promise.all([updateStats(), updateUserStats(), updateAuction(), updateRaffle()]);
}

// ----------- STATS -----------

async function updateStats() {
    const totalDeposited = await contract.methods.totalDeposited().call();
    const totalWithdrawn = await contract.methods.totalWithdrawn().call();
    const dividendPool = await contract.methods.dividendPool().call();
    const totalShares = await contract.methods.totalShares().call();

    totalDepositedEl.innerText = web3.utils.fromWei(totalDeposited);
    totalWithdrawnEl.innerText = web3.utils.fromWei(totalWithdrawn);
    dividendPoolEl.innerText = web3.utils.fromWei(dividendPool);
    totalSharesEl.innerText = web3.utils.fromWei(totalShares);

    updateChart(web3.utils.fromWei(totalDeposited), web3.utils.fromWei(dividendPool));
}

async function updateUserStats() {
    const user = await contract.methods.getUserStats(account).call();
    userDepositedEl.innerText = web3.utils.fromWei(user.deposited);
    userWithdrawnEl.innerText = web3.utils.fromWei(user.withdrawn);
    userSharesEl.innerText = web3.utils.fromWei(user.shares);
    userDividendsClaimedEl.innerText = web3.utils.fromWei(user.dividendsClaimed);
    userPendingDividendsEl.innerText = web3.utils.fromWei(user.pending);

    const totalShares = await contract.methods.totalShares().call();
    const sharePercent = totalShares > 0 ? user.shares * 100 / totalShares : 0;
    userSharePercentEl.innerText = sharePercent.toFixed(2);

    // Tickets
    const raffleInfo = await contract.methods.getRaffleInfo().call();
    const ticketsUser = raffleInfo.tickets.filter(t => t.toLowerCase() === account.toLowerCase()).length;
    userTicketsEl.innerText = ticketsUser;
    raffleTotalTicketsEl.innerText = raffleInfo.tickets.length;
}

// ----------- ACCIONES -----------

async function deposit() {
    const amount = document.getElementById("depositAmount").value;
    if (!amount || isNaN(amount)) return alert("Cantidad inválida");
    await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount) });
    updateAll();
}

async function withdraw() {
    const amount = document.getElementById("withdrawAmount").value;
    if (!amount || isNaN(amount)) return alert("Cantidad inválida");
    await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
    updateAll();
}

async function claim() {
    await contract.methods.claimDividends().send({ from: account });
    updateAll();
}

// ----------- AUCTION -----------

async function updateAuction() {
    const info = await contract.methods.getAuctionInfo().call();
    auctionCurrentBidEl.innerText = web3.utils.fromWei(info.currentBid || "0");

    // Top bidders
    auctionTopBiddersEl.innerHTML = "";
    info.topBidders.forEach(addr => {
        if (addr && addr !== "0x0000000000000000000000000000000000000000") {
            const li = document.createElement("li");
            li.innerText = addr;
            auctionTopBiddersEl.appendChild(li);
        }
    });

    // Countdown
    clearInterval(auctionTimer);
    auctionTimer = setInterval(() => {
        const remaining = info.endTime - Math.floor(Date.now() / 1000);
        if (remaining > 0) {
            const h = Math.floor(remaining / 3600);
            const m = Math.floor((remaining % 3600) / 60);
            const s = remaining % 60;
            auctionCountdownEl.innerText = `${h}h ${m}m ${s}s`;
        } else {
            auctionCountdownEl.innerText = "0h 0m 0s";
        }
    }, 1000);
}

async function bidAuction() {
    const amount = document.getElementById("auctionBidAmount").value;
    if (!amount || isNaN(amount)) return alert("Cantidad inválida");
    await contract.methods.bidAuction().send({ from: account, value: web3.utils.toWei(amount) });
    updateAuction();
}

// ----------- RAFFLE -----------

async function updateRaffle() {
    const info = await contract.methods.getRaffleInfo().call();
    rafflePrizePotEl.innerText = web3.utils.fromWei(info.prizePot || "0");
    raffleTotalTicketsEl.innerText = info.tickets.length;

    // Countdown
    clearInterval(raffleTimer);
    raffleTimer = setInterval(() => {
        const remaining = info.endTime - Math.floor(Date.now() / 1000);
        if (remaining > 0) {
            const h = Math.floor(remaining / 3600);
            const m = Math.floor((remaining % 3600) / 60);
            const s = remaining % 60;
            raffleCountdownEl.innerText = `${h}h ${m}m ${s}s`;
        } else {
            raffleCountdownEl.innerText = "0h 0m 0s";
        }
    }, 1000);
}

async function enterRaffle() {
    const numTickets = document.getElementById("raffleTickets").value;
    if (!numTickets || isNaN(numTickets) || numTickets < 1) return alert("Tickets inválidos");
    await contract.methods.enterRaffle(numTickets).send({ from: account, value: web3.utils.toWei((0.001 * numTickets).toString()) });
    updateRaffle();
}

// ----------- CHART -----------

function initChart() {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Total Deposited', data: [], borderColor: '#1e90ff', fill: false },
                { label: 'Dividend Pool', data: [], borderColor: '#00ff99', fill: false }
            ]
        },
        options: { responsive: true, animation: { duration: 500 }, scales: { y: { beginAtZero: true } } }
    });
}

function updateChart(deposited, dividend) {
    if (!chart) return;
    const time = new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(deposited);
    chart.data.datasets[1].data.push(dividend);
    if (chart.data.labels.length > 30) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(d => d.data.shift());
    }
    chart.update();
}

// ----------- EVENTOS BOTONES ------------
connectBtn.onclick = connect;
depositBtn.onclick = deposit;
withdrawBtn.onclick = withdraw;
claimBtn.onclick = claim;
bidBtn.onclick = bidAuction;
enterRaffleBtn.onclick = enterRaffle;
