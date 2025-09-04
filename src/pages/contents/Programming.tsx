import React from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Programming: React.FC = () => {
  return (
    <ContentPageLayout title="Hello World">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          "Hello,
          world!"という文字列は、環境構築が終わった時のテスト、プログラミング学習の第一歩などの場面で使用されます。プログラミングに没頭するようになった理由の一つに"Hello,
          world!"の出力に感動したからだという人も少なくないはずです。疑似的に皆様方にこの体験をしていただけるようこのコンテンツを作成しました。
        </p>

        <h2>歴史</h2>
        <p>
          「Hello,
          world!」を使う理由ははっきりと解明されていませんが、起源は明確に残されています。「ブライアン・カーニハン」さんと「デニス・リッチー」さんが1978年に出版された「プログラミング言語C」という本に記述されました。
          同著書のプログラムの例は"hello,
          world"(大文字無し、感嘆符(!)無し)を標準出力するものです。
          <br />
          具体的なコードは以下のようになります。
        </p>

        <div className="not-prose my-6">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm text-gray-900 dark:text-gray-100">
              <code>{`main() {
  printf("hello, world\\n");
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
};

export default Programming;
