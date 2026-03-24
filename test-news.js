const { fetchAndTranslateNews } = require("./src/news");

async function main() {
  console.log("開始新聞抓取與翻譯測試...");
  const news = await fetchAndTranslateNews();
  console.log("\n抓取結果 (前 3 則):");
  console.log(JSON.stringify(news.slice(0, 3), null, 2));
  console.log(`\n共抓取 ${news.length} 則新聞。`);
}

main();
