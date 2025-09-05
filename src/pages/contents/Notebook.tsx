import React from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Notebook: React.FC = () => {
  return (
    <ContentPageLayout title="書籍">
      <section className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-10 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            部員が読んで特に印象に残った書籍を紹介します。
          </p>
        </header>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-neutral-700 dark:bg-neutral-900">
          <h2 className="mb-4 text-xl font-bold text-blue-700 dark:text-blue-400">
            <span className="mr-2 inline-block h-6 w-2 rounded bg-blue-500 dark:bg-blue-400"></span>
            <span>『苦しんで覚えるC言語』</span>
            <br />
            <span className="mt-1 block text-sm font-normal text-gray-500 dark:text-gray-400">
              MMGames
            </span>
          </h2>
          <div className="space-y-2 pl-5">
            <p>
              C言語の入門書として多くの方が挙げる一冊です。その理由は、ごまかしのない丁寧な解説で読者を置いてけぼりにしない点にあります。初学者向けに「おまじない」として片づけられがちな概念（ヘッダファイルのインクルードやコンパイルの流れなど）についても最初から分かり易く説明されています。
            </p>
            <p>
              また、型, 変数,
              関数など、どのプログラミング言語にも共通する基礎的な概念から丁寧に触れているため、プログラミング未経験の方にも非常におすすめできる一冊です。タイトルどおり「苦しむ」こともあるかもしれませんが、自分で作成したプログラムが思いどおりに動作した時の達成感は格別です。私自身もこの本を読んで以来、プログラミングの世界に入り浸りたっています。
            </p>
            <p>
              近年、C言語を主に使用する機会は減少傾向にあります。確かに、RustやJavaScriptなどといったモダンな言語の使用が推奨される場合も多いです。例えば、JavaScriptでは変数の型を明示せずに済んだり、Rustでは宣言の順序に厳密さが求められなかったりします。しかし、こうした便利な言語も、C言語の基礎を知っているとより理解しやすくなります。
            </p>
            <p>
              情報の授業でC言語を取り扱っている高校生やC言語必修の大学生、またプログラミングに少しでも興味がある方に、是非手に取って欲しい一冊です。
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-neutral-700 dark:bg-neutral-900">
          <h2 className="mb-4 text-xl font-bold text-green-700 dark:text-green-400">
            <span className="mr-2 inline-block h-6 w-2 rounded bg-green-500 dark:bg-green-400"></span>
            <span>『マスタリングTCP/IP 入門編』</span>
            <br />
            <span className="mt-1 block text-sm font-normal text-gray-500 dark:text-gray-400">
              井上直也・村山公保・竹下隆史・荒井透・苅田幸雄
            </span>
          </h2>
          <div className="space-y-2 pl-5">
            <p>
              こちらはネットワークの初学者におすすめしたい一冊です。私たちの生活に欠かせないインターネットですが、その技術的な詳細を意識して利用している方は多く無いと思います。「ブラックボックス」として捉えがちなネットワークの仕組みも、この本を読むことで一変して「ホワイトボックス」へと変形します。世界がより明るく見えますね。
            </p>
            <p>
              この本の特徴は、序章でネットワークの歴史から現代のネットワーク技術までを簡潔に紹介し、ネットワークの全体像を掴めるようにしている点です。その後、各技術の詳細を低レイヤから順に丁寧に解説しています。また、イラストが豊富に使用されているのも魅力の一つです。ただの「電気信号」のやり取りに過ぎないネットワークの処理も、イラストにより直感的に理解しやすくなっています。書籍自体のサイズも大きいため、イラストが多く挿入されていても文章が途切れず、非常に読みやすい一冊です。
            </p>
            <p>
              さらに、注釈が多いのも特徴です。ネットワークでは略語（IP,
              HTTPなど）が多く登場するのですが、それらの正式名称（IP: Internet
              Protocolなど）や用語解説、なぜその動作が必要なのかといった細かな説明も丁寧に行われています。
            </p>
            <p>
              また、「〇〇プロトコル（〇〇に関する取り決め事）」という用語が頻出します。それぞれ個性豊かなものばかりなので、自分が好きなプロトコルを探してみても面白いかもしれません。ちなみに、私は定番ですが、OSPFが好きです。
            </p>
          </div>
        </div>
      </section>
    </ContentPageLayout>
  );
};

export default Notebook;
