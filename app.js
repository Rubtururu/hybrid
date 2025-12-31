const CONTRACT_ADDRESS = "0x2A9C22f5b3Ccf204D1d7d11305a8F1D2FF5AbaE2";

const ABI = [
  "function treasuryPool() view returns (uint256)",
  "function dividendPool() view returns (uint256)",
  "function totalUsers() view returns (uint256)",
  "function deposit() payable",
  "function withdraw(uint256)",
  "function claim()",
  "function getUserStats(address) view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"
];

let provider, signer, contract, user;

document.getElementById("connectBtn").onclick = connect;
document.getElementById("depositBtn").onclick = deposit;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("claimBtn").onclick = claim;

async function connect() {
  if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  user = await signer.getAddress();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  loadStats();
}

async function loadStats() {
  const tvl = await contract.treasuryPool();
  const div = await contract.dividendPool();
  const users = await contract.totalUsers();

  document.getElementById("tvl").innerText = ethers.utils.formatEther(tvl);
  document.getElementById("divPool").innerText = ethers.utils.formatEther(div);
  document.getElementById("users").innerText = users;

  const u = await contract.getUserStats(user);
  document.getElementById("dep").innerText = ethers.utils.formatEther(u[0]);
  document.getElementById("shares").innerText = ethers.utils.formatEther(u[2]);
  document.getElementById("pending").innerText = ethers.utils.formatEther(u[4]);
}

async function deposit() {
  const amount = document.getElementById("amount").value;
  const tx = await contract.deposit({
    value: ethers.utils.parseEther(amount)
  });
  await tx.wait();
  loadStats();
}

async function withdraw() {
  const amount = document.getElementById("amount").value;
  const tx = await contract.withdraw(
    ethers.utils.parseEther(amount)
  );
  await tx.wait();
  loadStats();
}

async function claim() {
  const tx = await contract.claim();
  await tx.wait();
  loadStats();
}
