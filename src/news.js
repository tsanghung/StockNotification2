const axios = require("axios");
const xml2js = require("xml2js");
const translate = require("google-translate-api-next");

/**
 * 抓取新聞並翻譯
 * 來源：Reuters (國際), Economic Daily News (國內), Google News (AI)
 */
async function fetchAndTranslateNews() {
  const rssFeeds = [
    { name: "國際政經", url: "https://www.reutersagency.com/feed/?best-topics=business&post_type=best", category: "Politics_Economy", lang: "en" },
    { name: "國內政經", url: "https://money.udn.com/rssfeed/news/1001?ch=money", category: "Politics_Economy", lang: "zh" },
    { name: "AI 趨勢", url: "https://news.google.com/rss/search?q=AI&hl=en-US&gl=US&ceid=US:en", category: "AI_Trends", lang: "en" },
  ];

  const results = [];
  const parser = new xml2js.Parser();

  for (const feed of rssFeeds) {
    console.log(`正在抓取 ${feed.name} 源...`);
    try {
      const response = await axios.get(feed.url, { timeout: 10000 });
      const xml = response.data;
      const parsed = await parser.parseStringPromise(xml);
      
      const items = parsed.rss.channel[0].item.slice(0, 10); // 每個源取前 10 則
      
      for (const item of items) {
        const title = item.title[0];
        const link = item.link[0];
        const pubDate = item.pubDate ? item.pubDate[0] : "";
        
        let translatedTitle = title;
        if (feed.lang === "en") {
          try {
            const res = await translate(title, { to: "zh-TW" });
            translatedTitle = res.text;
          } catch (trError) {
            console.warn(`翻譯失敗: ${title}`);
          }
        }

        results.push({
          title: translatedTitle,
          original_title: title,
          source_url: link,
          category: feed.category,
          publish_time: pubDate,
          lang: feed.lang
        });
      }
    } catch (error) {
      console.error(`抓取 ${feed.name} 失敗:`, error.message);
    }
  }

  return results;
}

module.exports = { fetchAndTranslateNews };
