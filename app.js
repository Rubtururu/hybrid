import pandas as pd
from openpyxl import load_workbook
from openpyxl.chart import LineChart, Reference

ROWS = 1000
ENTRY_PRICE = 3.99

file_name = "rifas_edge_system_PRO.xlsx"

columns = [
    "Fecha",
    "Entradas_Totales",
    "Prize_Pool",

    "Resultado_KING",
    "Resultado_ARRA",
    "Resultado_ALIOLI",

    "Entradas_KING",
    "Entradas_ARRA",
    "Entradas_ALIOLI",

    "Ganancia_KING",
    "Ganancia_ARRA",
    "Ganancia_ALIOLI",

    "Entradas_Tuyas",
    "Costo_Total",

    "EV_Unitario",
    "EV_Total",

    "Ganancia_Total",
    "Neto",

    "EV_Acumulado",
    "Neto_Acumulado",

    "Calidad_Rifa",
    "JUGAR"
]

df = pd.DataFrame("", index=range(ROWS), columns=columns)
df.to_excel(file_name, index=False)

wb = load_workbook(file_name)
ws = wb.active
ws.title = "REGISTRO_RIFAS"
ws.freeze_panes = "A2"

for row in range(2, ROWS + 2):

    ws[f"J{row}"] = f'=IF(D{row}=1,C{row}*0.5,IF(D{row}=2,C{row}*0.3,IF(D{row}=3,C{row}*0.2,0)))'
    ws[f"K{row}"] = f'=IF(E{row}=1,C{row}*0.5,IF(E{row}=2,C{row}*0.3,IF(E{row}=3,C{row}*0.2,0)))'
    ws[f"L{row}"] = f'=IF(F{row}=1,C{row}*0.5,IF(F{row}=2,C{row}*0.3,IF(F{row}=3,C{row}*0.2,0)))'

    ws[f"M{row}"] = f"=G{row}+H{row}+I{row}"
    ws[f"N{row}"] = f"=M{row}*{ENTRY_PRICE}"

    ws[f"O{row}"] = f"=(C{row}/B{row})-{ENTRY_PRICE}"
    ws[f"P{row}"] = f"=O{row}*M{row}"

    ws[f"Q{row}"] = f"=J{row}+K{row}+L{row}"
    ws[f"R{row}"] = f"=Q{row}-N{row}"

    ws[f"S{row}"] = f"=SUM($P$2:P{row})"
    ws[f"T{row}"] = f"=SUM($R$2:R{row})"

    ws[f"U{row}"] = (
        f'=IF(B{row}<10,"EXCELENTE",'
        f'IF(B{row}<=14,"BUENA",'
        f'IF(B{row}<=20,"NEUTRA","MALA")))'
    )

    ws[f"V{row}"] = f'=IF(AND(O{row}>0,B{row}<=20),"SI","NO")'

# DASHBOARD
dash = wb.create_sheet("DASHBOARD")

dash["A1"] = "Métrica"
dash["B1"] = "Valor"

dash["A2"] = "Total Invertido"
dash["B2"] = "=SUM(REGISTRO_RIFAS!N:N)"

dash["A3"] = "Total Ganado"
dash["B3"] = "=SUM(REGISTRO_RIFAS!Q:Q)"

dash["A4"] = "Beneficio Neto"
dash["B4"] = "=B3-B2"

dash["A5"] = "ROI %"
dash["B5"] = "=IF(B2>0,B4/B2,0)"

chart = LineChart()
chart.title = "EV vs Neto acumulado"
chart.y_axis.title = "USD"
chart.x_axis.title = "Rifas"

data = Reference(ws, min_col=19, min_row=1, max_col=20, max_row=ROWS)
chart.add_data(data, titles_from_data=True)
dash.add_chart(chart, "D2")

# RESUMEN DIARIO
daily = wb.create_sheet("RESUMEN_DIARIO")

daily["A1"] = "Fecha"
daily["B1"] = "Invertido"
daily["C1"] = "Ganado"
daily["D1"] = "Neto"

daily["A2"] = "=UNIQUE(REGISTRO_RIFAS!A2:A1000)"
daily["B2"] = "=SUMIF(REGISTRO_RIFAS!A:A,A2,REGISTRO_RIFAS!N:N)"
daily["C2"] = "=SUMIF(REGISTRO_RIFAS!A:A,A2,REGISTRO_RIFAS!Q:Q)"
daily["D2"] = "=C2-B2"

wb.save(file_name)

print("Archivo creado:", file_name)
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
