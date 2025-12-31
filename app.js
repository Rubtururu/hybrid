const CONTRACT_ADDRESS="0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";
const ABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"boost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RaffleEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"prize","type":"uint256"}],"name":"RaffleWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accDividendPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"activateBoost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawRaffleWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"effectiveShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterRaffle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"lastDividendTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVolumeReset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"pendingDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rafflePlayers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rafflePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"takeLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"dividendsClaimed","type":"uint256"},{"internalType":"uint256","name":"lastAction","type":"uint256"},{"internalType":"uint256","name":"boostBP","type":"uint256"},{"internalType":"uint256","name":"boostEnd","type":"uint256"},{"internalType":"uint256","name":"loanAmount","type":"uint256"},{"internalType":"uint256","name":"loanEnd","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volume24h","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
let web3,contract,account,chart;

window.onload=()=>{
    document.getElementById("connectBtn").onclick=connect;
    document.getElementById("depositBtn").onclick=deposit;
    document.getElementById("withdrawBtn").onclick=withdraw;
    document.getElementById("claimBtn").onclick=claim;
    document.getElementById("boostBtn").onclick=activateBoost;
    document.getElementById("loanBtn").onclick=takeLoan;
    document.getElementById("raffleBtn").onclick=enterRaffle;
};

async function connect(){
    if(window.ethereum){
        web3=new Web3(window.ethereum);
        try{
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            account=accounts[0];
            const chainId=await ethereum.request({method:'eth_chainId'});
            if(chainId!=='0x61'){alert("Cambia MetaMask a BSC Testnet"); return;}
            contract=new web3.eth.Contract(ABI,CONTRACT_ADDRESS);
            alert("Wallet conectada: "+account);
            loadStats(); initChart();
        }catch(err){console.error(err); alert("Error MetaMask: "+err.message);}
    }else{alert("Instala MetaMask");}
}

// --------------------- CONTADORES ANIMADOS ---------------------
function animateValue(id,start,end,duration){
    let obj=document.getElementById(id); let range=end-start;
    let minTimer=50; let stepTime=Math.abs(Math.floor(duration/range));
    stepTime=Math.max(stepTime,minTimer); let startTime=new Date().getTime();
    let endTime=start+range;
    let timer=setInterval(function(){
        let now=new Date().getTime(); let remaining=Math.max((duration-(now-startTime))/duration,0);
        let value=Math.round(end-(range*remaining)*10000)/10000; obj.innerText=value.toFixed(4)+obj.dataset.suffix||'';
        if(value===end) clearInterval(timer);
    },stepTime);
}

// ---------------------- LOAD STATS -----------------------------
async function loadStats(){
    if(!contract||!account)return;
    try{
        const [treasuryPool,dividendPool,totalShares,totalUsers,totalDeposited,totalWithdrawn,rafflePot]=await Promise.all([
            contract.methods.treasuryPool().call(),
            contract.methods.dividendPool().call(),
            contract.methods.totalShares().call(),
            contract.methods.totalUsers().call(),
            contract.methods.totalDeposited().call(),
            contract.methods.totalWithdrawn().call(),
            contract.methods.rafflePot().call()
        ]);

        // Animate global stats
        animateValue("tvl",0,parseFloat(web3.utils.fromWei(treasuryPool)),800);
        animateValue("divPool",0,parseFloat(web3.utils.fromWei(dividendPool)),800); highlight("divPool");
        animateValue("totalShares",0,parseFloat(web3.utils.fromWei(totalShares)),800);
        document.getElementById("users").innerText=totalUsers;
        animateValue("totalBNB",0,parseFloat(web3.utils.fromWei(totalDeposited)),800);
        animateValue("rafflePot",0,parseFloat(web3.utils.fromWei(rafflePot)),800); highlight("rafflePot");

        // User stats
        const user=await contract.methods.users(account).call();
        const pending=await contract.methods.pendingDividends(account).call();
        animateValue("dep",0,parseFloat(web3.utils.fromWei(user.deposited)),800);
        animateValue("withdrawn",0,parseFloat(web3.utils.fromWei(user.withdrawn)),800);
        animateValue("shares",0,parseFloat(web3.utils.fromWei(user.shares)),800);
        animateValue("pending",0,parseFloat(web3.utils.fromWei(pending)),800);
        animateValue("claimed",0,parseFloat(web3.utils.fromWei(user.dividendsClaimed)),800);
        document.getElementById("boost").innerText=user.boostBP>0?`${user.boostBP/100}% hasta ${new Date(user.boostEnd*1000).toLocaleString()}`:'-';
        document.getElementById("loan").innerText=user.loanAmount>0?`${web3.utils.fromWei(user.loanAmount)} BNB hasta ${new Date(user.loanEnd*1000).toLocaleString()}`:'-';

        const lastDividend=await contract.methods.lastDividendTime().call();
        const nextDividendTime=parseInt(lastDividend)+86400;
        const userSharePercent=parseFloat(web3.utils.fromWei(user.shares))/parseFloat(web3.utils.fromWei(totalShares))*100;
        document.getElementById("nextDividend").innerText=new Date(nextDividendTime*1000).toLocaleString();
        document.getElementById("userSharePercent").innerText=userSharePercent.toFixed(2)+" %";
        document.getElementById("dailyDividend").innerText=(parseFloat(web3.utils.fromWei(dividendPool))*0.01).toFixed(4)+" BNB";

        // Raffle
        const rafflePlayers=[];
        for(let i=0;i<totalUsers;i++){
            try{const p=await contract.methods.rafflePlayers(i).call(); if(p) rafflePlayers.push(p);}catch{}
        }
        const userPos=rafflePlayers.indexOf(account);
        document.getElementById("rafflePlayers").innerText=rafflePlayers.length;
        document.getElementById("raffleUserPos").innerText=userPos>=0?userPos+1:'-';
        document.getElementById("raffleNext").innerText=new Date((lastDividend+86400)*1000).toLocaleString();

        updateChart(parseFloat(web3.utils.fromWei(treasuryPool)),parseFloat(web3.utils.fromWei(dividendPool)));
    }catch(err){console.error(err);}
}

// ---------------------- HIGHLIGHT -----------------------------
function highlight(id){
    const el=document.getElementById(id);
    el.classList.add('glow');
    setTimeout(()=>{el.classList.remove('glow');},1000);
}

// ---------------------- CHART -----------------------------
function initChart(){
    const ctx=document.getElementById('chart').getContext('2d');
    chart=new Chart(ctx,{
        type:'line',
        data:{labels:[],datasets:[
            {label:'TVL BNB',data:[],borderColor:'#1e90ff',backgroundColor:'rgba(30,144,255,0.2)',fill:true},
            {label:'Dividend Pool BNB',data:[],borderColor:'#00ff99',backgroundColor:'rgba(0,255,153,0.2)',fill:true}
        ]},
        options:{responsive:true,animation:{duration:800},scales:{y:{beginAtZero:true}}}
    });
}

function updateChart(tvl,div){
    if(!chart) return;
    const time=new Date().toLocaleTimeString();
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(tvl);
    chart.data.datasets[1].data.push(div);
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

setInterval(()=>{if(contract&&account) loadStats();},15000);
