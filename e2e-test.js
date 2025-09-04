// 簡易E2Eテスト - ページのロードとルーティングエラーの確認
// Node.js + Puppeteerを使用（ESM対応）

import puppeteer from "puppeteer";

async function runE2ETests() {
  console.log("簡易E2Eテストを開始します...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // コンソールエラーを監視（404などのリソースエラーは除外）
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        // React Routerエラーなど重要なエラーのみキャッチ
        if (
          text.includes("Route") ||
          text.includes("React") ||
          text.includes("Uncaught")
        ) {
          console.error(`ページでエラーが発生しました: ${text}`);
          throw new Error(`ページエラー: ${text}`);
        }
      }
    });

    // メインページの読み込み（プレビューサーバーのポートを使用）
    const url = "http://localhost:4173/CultureFestival/";

    console.log(`メインページをテスト中... ${url}`);

    // サーバーが起動しているかチェック
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 10000 });
    } catch (error) {
      if (error.message.includes("net::ERR_CONNECTION_REFUSED")) {
        console.error("サーバーが起動していません。以下を実行してください:");
        console.error("1. npm run build");
        console.error("2. npm run preview");
        process.exit(1);
      }
      throw error;
    }

    // コンテンツページへの遷移
    console.log("コンテンツページへの遷移をテスト中...");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click('a[href="/contents"]'),
    ]);

    // 各コンテンツへの遷移をテスト
    const contentLinks = await page.$$eval('a[href^="/contents/"]', (links) =>
      links.map((link) => link.getAttribute("href")),
    );

    for (const link of contentLinks.slice(0, 2)) {
      // 最初の2つだけテスト
      console.log(`${link} へのルーティングをテスト中...`);
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click(`a[href="${link}"]`),
      ]);

      // 戻る
      await page.goBack({ waitUntil: "networkidle0" });
    }

    console.log("マップページへの遷移をテスト中...");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click('a[href="/map"]'),
    ]);

    console.log("全てのテストが成功しました！");
  } catch (error) {
    console.error("テスト失敗:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runE2ETests();

/*
sudo apt-get update
sudo apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libgbm1 \
  libasound2 \
  libnspr4 \
  libxcomposite1 \
  libxrandr2 \
  libxdamage1 \
  libxfixes3 \
  libxext6 \
  libx11-xcb1 \
  libxcb1 \
  libx11-6 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libcairo2 \
  libgtk-3-0 \
  fonts-liberation \
  libnss3 \
  lsb-release

  TODO こんなんせんでも手動でbuild -> preview起動 -> 自分で見に行く で解決
*/
