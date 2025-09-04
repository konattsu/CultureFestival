import React from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Tech: React.FC = () => {
  return (
    <ContentPageLayout title="使用技術">
      <div className="prose dark:prose-invert max-w-none">
        <p>このページでは本サイトの制作に使用された技術について紹介します。</p>

        <h2 className="mt-8 text-2xl font-bold">準備中</h2>
        <p>このページは現在開発中です。もうしばらくお待ちください。</p>
      </div>
    </ContentPageLayout>
  );
};

export default Tech;
