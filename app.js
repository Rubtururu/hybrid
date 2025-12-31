const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3, contract, account, chart;

window.onload = () => {
    document.getElementById("connectBtn").onclick = connect;
    document.getElementById("depositBtn").onclick = deposit;
    document.getElementById("withdrawBtn").onclick = withdraw;
    document.getElementById("claimBtn").onclick = claim;
    document.getElementById("boostBtn").onclick = activateBoost;
    document.getElementById("loanBtn").onclick = takeLoan;
    document.getElementById("raffleBtn").onclick = enterRaffle;
};

async function connect() {
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
        try{
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            account = accounts[0];
            const chainId = await ethereum.request({method:'eth_chainId'});
            if(chainId!=='0x61'){alert("Cambia MetaMask a BSC Testnet"); return;}
            contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
            alert("Wallet conectada: "+account);
            loadStats();
            initChart();
        }catch(err){console.error(err); alert("Error MetaMask: "+err.message);}
    } else { alert("Instala MetaMask"); }
}

// ---------------------- LOAD STATS -----------------------------
async function loadStats(){
    if(!contract||!account) return;
    try{
        const [
            treasuryPool, dividendPool, totalShares, rafflePot,
            totalUsers, totalDeposited, totalWithdrawn, volume24h
        ] = await Promise.all([
            contract.methods.treasuryPool().call(),
            contract.methods.dividendPool().call(),
            contract.methods.totalShares().call(),
            contract.methods.rafflePot().call(),
            contract.methods.totalUsers().call(),
            contract.methods.totalDeposited().call(),
            contract.methods.totalWithdrawn().call(),
            contract.methods.volume24h().call()
        ]);

        document.getElementById("tvl").innerText=parseFloat(web3.utils.fromWei(treasuryPool)).toFixed(4)+" BNB";
        document.getElementById("divPool").innerText=parseFloat(web3.utils.fromWei(dividendPool)).toFixed(4)+" BNB";
        document.getElementById("totalShares").innerText=parseFloat(web3.utils.fromWei(totalShares)).toFixed(2);
        document.getElementById("users").innerText=totalUsers;
        document.getElementById("rafflePot").innerText=parseFloat(web3.utils.fromWei(rafflePot)).toFixed(4)+" BNB";
        document.getElementById("volume").innerText=parseFloat(web3.utils.fromWei(volume24h)).toFixed(4)+" BNB";
        document.getElementById("totalBNB").innerText=parseFloat(web3.utils.fromWei(totalDeposited)).toFixed(4)+" BNB";
        document.getElementById("treasury").innerText=parseFloat(web3.utils.fromWei(treasuryPool)).toFixed(4)+" BNB";
        document.getElementById("totalWithdrawn").innerText=parseFloat(web3.utils.fromWei(totalWithdrawn)).toFixed(4)+" BNB";

        // User stats
        const user = await contract.methods.users(account).call();
        const pending = await contract.methods.pendingDividends(account).call();

        document.getElementById("dep").innerText=parseFloat(web3.utils.fromWei(user.deposited)).toFixed(4)+" BNB";
        document.getElementById("withdrawn").innerText=parseFloat(web3.utils.fromWei(user.withdrawn)).toFixed(4)+" BNB";
        document.getElementById("shares").innerText=parseFloat(web3.utils.fromWei(user.shares)).toFixed(2);
        document.getElementById("pending").innerText=parseFloat(web3.utils.fromWei(pending)).toFixed(4)+" BNB";
        document.getElementById("claimed").innerText=parseFloat(web3.utils.fromWei(user.dividendsClaimed)).toFixed(4)+" BNB";
        document.getElementById("boost").innerText=user.boostBP>0?`${user.boostBP/100}% hasta ${new Date(user.boostEnd*1000).toLocaleString()}`:'-';
        document.getElementById("loan").innerText=user.loanAmount>0?`${web3.utils.fromWei(user.loanAmount)} BNB hasta ${new Date(user.loanEnd*1000).toLocaleString()}`:'-';

        // Dividend & share
        const lastDividend = await contract.methods.lastDividendTime().call();
        const accPerShare = await contract.methods.accDividendPerShare().call();
        const nextDividendTime = parseInt(lastDividend)+86400;
        const userSharePercent = parseFloat(web3.utils.fromWei(user.shares))/parseFloat(web3.utils.fromWei(totalShares))*100;
        document.getElementById("lastDividend").innerText=new Date(lastDividend*1000).toLocaleString();
        document.getElementById("nextDividend").innerText=new Date(nextDividendTime*1000).toLocaleString();
        document.getElementById("userSharePercent").innerText=userSharePercent.toFixed(2)+" %";
        document.getElementById("dailyDividend").innerText=parseFloat(web3.utils.fromWei(dividendPool)*0.01).toFixed(4)+" BNB";

        // Raffle
        const rafflePlayers = [];
        const playerCount = parseInt(await contract.methods.totalUsers().call()); // assume all users eligible
        for(let i=0;i<playerCount;i++){
            const p = await contract.methods.rafflePlayers(i).call().catch(()=>null);
            if(p) rafflePlayers.push(p);
        }
        const userPos = rafflePlayers.indexOf(account);
        document.getElementById("rafflePlayers").innerText=rafflePlayers.length;
        document.getElementById("raffleUserPos").innerText=userPos>=0?userPos+1:'-';
        document.getElementById("raffleNext").innerText=new Date((lastDividend+86400)*1000).toLocaleString();

        // Creator fee
        const creatorFee = await contract.methods.owner().call();
        document.getElementById("creatorFee").innerText=creatorFee;

        updateChart(tvl=treasuryPool, div=dividendPool);
    } catch(err){console.error(err);}
}

// ---------------------- CHART -----------------------------
function initChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx,{
        type:'line',
        data:{
            labels:[],
            datasets:[
                {label:'TVL BNB',data:[],borderColor:'#1e90ff',fill:false},
                {label:'Dividend Pool BNB',data:[],borderColor:'#00ff99',fill:false}
            ]
        },
        options:{responsive:true,animation:{duration:500},scales:{y:{beginAtZero:true}}}
    });
}

function updateChart(tvl,div){
    if(!chart) return;
    const time=new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(parseFloat(web3.utils.fromWei(tvl)));
    chart.data.datasets[1].data.push(parseFloat(web3.utils.fromWei(div)));
    if(chart.data.labels.length>30){chart.data.labels.shift(); chart.data.datasets.forEach(d=>d.data.shift());}
    chart.update();
}

// ---------------------- ACTIONS -----------------------------
async function deposit(){const amount=document.getElementById("amount").value;if(!amount||isNaN(amount))return alert("Cantidad inválida");try{await contract.methods.deposit().send({from:account,value:web3.utils.toWei(amount)});loadStats();}catch(err){console.error(err);}}
async function withdraw(){const amount=document.getElementById("amount").value;if(!amount||isNaN(amount))return alert("Cantidad inválida");try{await contract.methods.withdraw(web3.utils.toWei(amount)).send({from:account});loadStats();}catch(err){console.error(err);}}
async function claim(){try{await contract.methods.claim().send({from:account});loadStats();}catch(err){console.error(err);}}
async function activateBoost(){const amt=prompt("BNB para boost");if(amt) await contract.methods.activateBoost(web3.utils.toWei(amt),3600*24).send({from:account});loadStats();}
async function takeLoan(){const amt=prompt("BNB préstamo");if(amt) await contract.methods.takeLoan(web3.utils.toWei(amt),3600*24).send({from:account});loadStats();}
async function enterRaffle(){try{await contract.methods.enterRaffle().send({from:account,value:web3.utils.toWei('0.01')});loadStats();}catch(err){console.error(err);}}

// ---------------------- AUTO UPDATE ---------------------------
setInterval(()=>{if(contract&&account) loadStats();},15000);
