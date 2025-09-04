import React from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Gacha: React.FC = () => {
  return (
    <ContentPageLayout title="ガチャシミュレーション">
      <div className="prose dark:prose-invert max-w-none">
        <p>このページではガチャシミュレーションについての内容を表示します。</p>

        <h2 className="mt-8 text-2xl font-bold">準備中</h2>
        <p>このページは現在開発中です。もうしばらくお待ちください。</p>
      </div>
    </ContentPageLayout>
  );
};

export default Gacha;
