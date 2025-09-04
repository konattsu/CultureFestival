import React from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const HeatExhaustion: React.FC = () => {
  return (
    <ContentPageLayout title="熱中症に注意">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">
          ぜひこのタイミングで水分補給をしてください。
        </p>

        <h2 className="mt-8 text-2xl font-bold">応急処置の方法</h2>
        <p>
          <a
            href="https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/kenkou/nettyuu/nettyuu_taisaku/happen.html"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            target="_blank"
            rel="noreferrer"
          >
            こちらのurl
          </a>
          は厚労省が提供している熱中症の応急処置のサイトです。応急処置の手順をフローチャートにて説明しています。参照してみてください。
        </p>

        <h2 className="mt-8 text-2xl font-bold">体調不良になったら</h2>
        <p>
          体調が悪そうな方やしんどそうにしている方を見かけた場合は、次の対応をお願いします。
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>近くにいる生徒や職員にその旨を伝えてください。</li>
          <li>その生徒や職員が保健室へ連絡に行きます。</li>
          <li>保健室の先生が現場に駆けつけて対応してくださいます。</li>
        </ol>

        <h2 className="mt-8 text-2xl font-bold">休憩室</h2>
        <p>
          2階205室および206室は休憩室としてご利用いただけます。どうぞお気軽にご活用ください。
        </p>
      </div>
    </ContentPageLayout>
  );
};

export default HeatExhaustion;
