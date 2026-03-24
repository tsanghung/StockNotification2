const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();

/**
 * 抓取 Yahoo Finance 的股市數據
 * 包含：道瓊 (^DJI), S&P 500 (^GSPC), NASDAQ (^IXIC), 費城半導體 (^SOX), 台積電 ADR (TSM)
 */
async function fetchStockData() {
  const symbols = [
    { name: "道瓊工業指數", symbol: "^DJI" },
    { name: "S&P 500 指數", symbol: "^GSPC" },
    { name: "NASDAQ 指數", symbol: "^IXIC" },
    { name: "費城半導體指數", symbol: "^SOX" },
    { name: "台積電 ADR", symbol: "TSM" },
  ];

  const results = [];

  try {
    for (const item of symbols) {
      console.log(`正在抓取 ${item.name} (${item.symbol})...`);
      // 使用 yahoo-finance2 獲取即時報價
      const quote = await yahooFinance.quote(item.symbol);
      
      if (quote) {
        results.push({
          name: item.name,
          symbol: item.symbol,
          price: quote.regularMarketPrice.toLocaleString(),
          change: quote.regularMarketChange.toFixed(2),
          change_percent: (quote.regularMarketChangePercent).toFixed(2) + "%",
        });
      } else {
        console.warn(`無法獲取 ${item.name} 的數據`);
      }
    }
  } catch (error) {
    console.error("抓取過程中發生錯誤:", error);
  }

  return results;
}

module.exports = { fetchStockData };
