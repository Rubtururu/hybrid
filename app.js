const CONTRACT_ADDRESS = "0x989a4023aaFbB5208ab120bF5C1379f1827B5C05";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionMaxTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionTimeIncrement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAuctionInfo","outputs":[{"internalType":"address[5]","name":"topBidders","type":"address[5]"},{"internalType":"uint256","name":"currentBid","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaffleInfo","outputs":[{"internalType":"address[]","name":"tickets","type":"address[]"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payDividends","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePrizeGuaranteed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffleTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account, chart;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claimDividends;
document.getElementById("bidBtn").onclick = bidAuction;
document.getElementById("raffleBtn").onclick = enterRaffle;

async function connect(){
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
        try{
            const accounts = await ethereum.request({ method:'eth_requestAccounts'});
            account = accounts[0];
            contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
            alert("Wallet conectada: "+account);
            loadStats();
            initChart();
            startIntervals();
        }catch(e){ alert("Error MetaMask: "+e.message);}
    }else{ alert("Instala MetaMask"); }
}

// ---------- STATS ----------
async function loadStats(){
    if(!contract || !account) return;

    const u = await contract.methods.getUserStats(account).call();
    const top = await contract.methods.getAuctionInfo().call();
    const raffle = await contract.methods.getRaffleInfo().call();

    // Global Stats
    document.getElementById("totalDeposited").innerText = web3.utils.fromWei((await contract.methods.totalDeposited().call()).toString());
    document.getElementById("totalWithdrawn").innerText = web3.utils.fromWei((await contract.methods.totalWithdrawn().call()).toString());
    document.getElementById("dividendPool").innerText = web3.utils.fromWei((await contract.methods.dividendPool().call()).toString());
    document.getElementById("totalShares").innerText = web3.utils.fromWei((await contract.methods.totalShares().call()).toString());

    // User Stats
    document.getElementById("deposited").innerText = web3.utils.fromWei(u.deposited);
    document.getElementById("withdrawn").innerText = web3.utils.fromWei(u.withdrawn);
    document.getElementById("shares").innerText = web3.utils.fromWei(u.shares);
    document.getElementById("claimed").innerText = web3.utils.fromWei(u.dividendsClaimed);
    document.getElementById("pending").innerText = web3.utils.fromWei(u.pending);
    let totalShares = await contract.methods.totalShares().call();
    let sharePercent = totalShares>0 ? u.shares*100/totalShares : 0;
    document.getElementById("sharePercent").innerText = sharePercent.toFixed(2);

    // Auction
    document.getElementById("currentBid").innerText = web3.utils.fromWei(top.currentBid.toString());
    updateTopBidders(top.topBidders);
    updateTimer("auctionTimer", top.endTime);

    // Raffle
    document.getElementById("rafflePot").innerText = web3.utils.fromWei(raffle.prizePot.toString());
    document.getElementById("ticketsBought").innerText = raffle.tickets.length;
    updateTimer("raffleTimer", raffle.endTime);

    // Chart
    updateChart(web3.utils.fromWei((await contract.methods.totalDeposited().call()).toString()), web3.utils.fromWei((await contract.methods.dividendPool().call()).toString()));
}

function updateTopBidders(bidders){
    const ol = document.getElementById("topBidders");
    ol.innerHTML = "";
    bidders.forEach(b=>{ if(b!="0x0000000000000000000000000000000000000000"){ 
        let li = document.createElement("li"); li.innerText=b; ol.appendChild(li);}});
}

function updateTimer(id, timestamp){
    let t = timestamp - Math.floor(Date.now()/1000);
    t = t>0?t:0;
    const hours = Math.floor(t/3600);
    const mins = Math.floor((t%3600)/60);
    const secs = t%60;
    document.getElementById(id).innerText = `${hours}h ${mins}m ${secs}s`;
}

function startIntervals(){
    setInterval(loadStats,15000);
    setInterval(()=>{ 
        contract.methods.getAuctionInfo().call().then(top=>updateTimer("auctionTimer",top.endTime));
        contract.methods.getRaffleInfo().call().then(r=>updateTimer("raffleTimer",r.endTime));
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

async function claimDividends(){
    await contract.methods.claimDividends().send({from:account});
    loadStats();
}

async function bidAuction(){
    const amt = prompt("BNB para pujar en subasta");
    if(!amt||isNaN(amt)) return;
    await contract.methods.bidAuction().send({from:account,value:web3.utils.toWei(amt)});
    loadStats();
}

async function enterRaffle(){
    const tickets = prompt("Número de tickets a comprar");
    if(!tickets||isNaN(tickets)) return;
    await contract.methods.enterRaffle(parseInt(tickets)).send({from:account,value:web3.utils.toWei((0.001*tickets).toString())});
    loadStats();
}

// ---------- CHART ----------
let chart;
function initChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx,{
        type:'line',
        data:{
            labels:[],
            datasets:[
                {label:'Total Deposited', data:[], borderColor:'#1e40af', fill:false},
                {label:'Dividend Pool', data:[], borderColor:'#059669', fill:false}
            ]
        },
        options:{responsive:true, animation:{duration:500}, scales:{y:{beginAtZero:true}}}
    });
}

function updateChart(tvl, div){
    if(!chart) return;
    const time = new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(tvl);
    chart.data.datasets[1].data.push(div);
    if(chart.data.labels.length>30){ chart.data.labels.shift(); chart.data.datasets.forEach(d=>d.data.shift());}
    chart.update();
}
