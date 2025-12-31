const CONTRACT_ADDRESS = "0x36420c27638f21Aebae9e4b8B98c7AB27CB6d9d6";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidNumber","type":"uint256"}],"name":"AuctionBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[5]","name":"winners","type":"address[5]"},{"indexed":false,"internalType":"uint256[5]","name":"prizes","type":"uint256[5]"}],"name":"RaffleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"RaffleEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_INCREMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"AUCTION_MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAILY_DIVIDEND_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAFFLE_TICKET_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auction","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"bidCount","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bidAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tickets","type":"uint256"}],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raffle","outputs":[{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"prizePot","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint16","name":"dailyBoost","type":"uint16"},{"internalType":"uint32","name":"lastBoostDay","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3, contract, account;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        document.getElementById('connectBtn').onclick = connectWallet;
        document.getElementById('depositBtn').onclick = deposit;
        document.getElementById('withdrawBtn').onclick = withdraw;
        document.getElementById('claimBtn').onclick = claimDividends;
        document.getElementById('raffleBtn').onclick = enterRaffle;
        document.getElementById('auctionBtn').onclick = bidAuction;
    } else {
        alert("Instala MetaMask para usar este dashboard.");
    }
});

async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
        document.getElementById('walletAddress').innerText = account;
        loadStats();
        startIntervals();
    } catch (err) {
        alert("Error MetaMask: " + err.message);
    }
}

async function loadStats() {
    if (!account) return;
    // General
    const totalStaked = await contract.methods.totalStaked().call();
    const dividendPool = await contract.methods.dividendPool().call();
    const lastDividend = await contract.methods.lastDividendDay().call();
    document.getElementById('totalStaked').innerText = web3.utils.fromWei(totalStaked);
    document.getElementById('dividendPool').innerText = web3.utils.fromWei(dividendPool);
    document.getElementById('lastDividend').innerText = new Date(lastDividend*1000).toLocaleString();

    // User stats
    const u = await contract.methods.users(account).call();
    const myStaked = u.staked;
    const myWithdrawn = u.withdrawn;
    const myDividends = u.dividendsClaimed;
    const myShare = totalStaked>0 ? (myStaked*100/totalStaked).toFixed(2) : 0;

    document.getElementById('myStaked').innerText = web3.utils.fromWei(myStaked.toString());
    document.getElementById('myWithdrawn').innerText = web3.utils.fromWei(myWithdrawn.toString());
    document.getElementById('myDividends').innerText = web3.utils.fromWei(myDividends.toString());
    document.getElementById('myShare').innerText = myShare;

    // Raffle
    const r = await contract.methods.raffle().call();
    document.getElementById('rafflePot').innerText = web3.utils.fromWei(r.prizePot.toString());
    document.getElementById('raffleEnd').innerText = new Date(r.endTime*1000).toLocaleString();

    // Auction
    const a = await contract.methods.auction().call();
    document.getElementById('auctionCurrent').innerText = web3.utils.fromWei(a.currentBid.toString());
    document.getElementById('auctionEnd').innerText = new Date(a.endTime*1000).toLocaleString();
}

function startIntervals() {
    setInterval(loadStats, 5000); // refresh stats cada 5s
}

async function deposit() {
    const amt = document.getElementById('amount').value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.methods.deposit().send({from:account, value:web3.utils.toWei(amt)});
    loadStats();
}

async function withdraw() {
    const amt = document.getElementById('amount').value;
    if(!amt || isNaN(amt)) return alert("Cantidad inválida");
    await contract.methods.withdraw(web3.utils.toWei(amt)).send({from:account});
    loadStats();
}

async function claimDividends() {
    await contract.methods.claimDividends().send({from:account});
    loadStats();
}

async function enterRaffle() {
    const tickets = document.getElementById('raffleTickets').value;
    if(!tickets || isNaN(tickets)) return alert("Cantidad inválida");
    await contract.methods.enterRaffle(tickets).send({from:account, value:web3.utils.toWei((tickets*0.001).toString())});
    loadStats();
}

async function bidAuction() {
    await contract.methods.bidAuction().send({from:account, value:web3.utils.toWei('0.001')});
    loadStats();
}
