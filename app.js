const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";

const ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "treasuryPool",
    "outputs": [{"name": "","type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "dividendPool",
    "outputs": [{"name": "","type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalUsers",
    "outputs": [{"name": "","type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name":"user","type":"address"}],
    "name":"getUserStats",
    "outputs":[
      {"name":"deposited","type":"uint256"},
      {"name":"withdrawn","type":"uint256"},
      {"name":"shares","type":"uint256"},
      {"name":"claimed","type":"uint256"},
      {"name":"pending","type":"uint256"},
      {"name":"dummy1","type":"uint256"},
      {"name":"dummy2","type":"uint256"},
      {"name":"dummy3","type":"uint256"}
    ],
    "type":"function"
  },
  { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "type": "function" },
  { "constant": false, "inputs": [{"name":"amount","type":"uint256"}], "name": "withdraw", "outputs": [], "type": "function" },
  { "constant": false, "inputs": [], "name": "claim", "outputs": [], "type": "function" }
];

let web3;
let contract;
let account;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;

async function connect() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // pedir conexión MetaMask
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    loadStats();
  } else {
    alert("Instala MetaMask");
  }
}

async function loadStats() {
  const tvl = await contract.methods.treasuryPool().call();
  const div = await contract.methods.dividendPool().call();
  const users = await contract.methods.totalUsers().call();

  document.getElementById("tvl").innerText = web3.utils.fromWei(tvl);
  document.getElementById("divPool").innerText = web3.utils.fromWei(div);
  document.getElementById("users").innerText = users;

  const u = await contract.methods.getUserStats(account).call();
  document.getElementById("dep").innerText = web3.utils.fromWei(u[0]);
  document.getElementById("shares").innerText = web3.utils.fromWei(u[2]);
  document.getElementById("pending").innerText = web3.utils.fromWei(u[4]);
}

async function deposit() {
  const amount = document.getElementById("amount").value;
  await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount) });
  loadStats();
}

async function withdraw() {
  const amount = document.getElementById("amount").value;
  await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
  loadStats();
}

async function claim() {
  await contract.methods.claim().send({ from: account });
  loadStats();
}
