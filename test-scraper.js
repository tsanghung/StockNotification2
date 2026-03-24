const { fetchStockData } = require("./src/scraper");

async function main() {
  console.log("開始股市數據抓取測試...");
  const data = await fetchStockData();
  console.log("\n抓取結果 (JSON):");
  console.log(JSON.stringify(data, null, 2));
}

main();
