import React, { useState } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

import GistDetails from "./White/GistDetails";
import HSVControls from "./White/HSVControls";
import RGBControls from "./White/RGBControls";
import WhiteGenerator from "./White/WhiteGenerator";
import HSVCrossSectionSVG from "./White/svg/HSVCrossSectionSVG";
import HSVLateralSVG from "./White/svg/HSVLateralSVG";
import HSVTopViewSVG from "./White/svg/HSVTopViewSVG";
import HSVWhiteAreaSVG from "./White/svg/HSVWhiteAreaSVG";
import { useColorControls } from "./White/useColorControls";
import { useWhiteGenerator } from "./White/useWhiteGenerator";
import { rgbToHex } from "./White/utils";

const White: React.FC = () => {
  // Color controls (RGB and HSV sliders)
  const { rgb, hsv, handleRgbChange, handleHsvChange } = useColorControls();

  // White color generator
  const { whiteName, whiteColor, handleWhiteNameChange, handleGenerateWhite } =
    useWhiteGenerator();

  // Gist details state
  const [showGistDetails, setShowGistDetails] = useState<boolean>(false);

  return (
    <ContentPageLayout title="白色">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="mt-8 text-2xl font-bold">白色</h2>
        <p>
          「白色」と聞いて一般的に思い浮かべるのは何でしょうか？「雲の色」、「消しゴムの色」など人により様々な意見が挙がると思います。
          <br />
          しかし、同じ単語の「白色」でも微妙に色合いが異なるはずです。タレントの某ミカさんの発言「白って200色あんねん」にあるように、「白色」の中でも更に色を分割できます。この状況に対し、人類は危機を感じるべきです。
        </p>
        <p>
          皆さんは周りにいる友人や家族に話しかける際「ねぇ、人間」と話しかけますか?
          もちろん答えはNo。顔が似ていたとて、相手の名前を呼ぶでしょう。こんなこと許されるはずがありません。「多様性」の時代、平等に扱うのが正しい対応ではないでしょうか?
        </p>
        <p>
          そこで「白色」に見える色の範囲を決め、ランダムに選ばれた1色に名前を付けて頂きます。
        </p>

        <h2 className="mt-8 text-2xl font-bold">RGB</h2>
        <p>
          色の表し方にはいくつか種類があります。まずは、「RGB」についてです。
        </p>
        <p>
          RGB(RGBカラーモデル)とは赤-Red、緑-Green、青-Blueの3色をそれぞれ 0
          から 255 の組み合わせて表現します。例えば[255, 255,
          0]の組み合わせだと黄色です。16進数を用いて#ffff00と表現したりもします。
        </p>
        <p>
          以下のツールで確認できます。自由に操作してみてください。0xという接頭語は16進数であることを明示しています。
        </p>

        {/* RGB Controls */}
        <RGBControls
          rgb={rgb}
          onRgbChange={handleRgbChange}
          rgbToHex={rgbToHex}
        />

        <p>
          光の足し算なので、全て 0 → 黒色 , 全て255 → 白色
          です。(厳密には違うかもしれませんがイメージはこれです。)
        </p>
        <p>
          全ての値を220にすると白色に見えますが、どれか一つの値を255にすると白とは言い難い色になります。これでは定義が難しいのでより直感的に定義できる別の方法を試します。
        </p>

        <h2 className="mt-8 text-2xl font-bold">HSV</h2>
        <p>
          次はHSV(HSB)色空間についてです。3次元を基にして人間が色を知覚する方法に類似するように作成された考え方です。
        </p>
        <p>
          HSV色空間は円錐の形をしています。1枚目が俯瞰図(モノクロ化)、2枚目はy軸の断面図、3枚目は真上から見た図です。
        </p>

        {/* HSV Visualizations */}
        <div className="my-6 flex flex-wrap justify-center gap-4">
          <div className="h-32 w-32">
            <HSVLateralSVG />
          </div>
          <div className="h-32 w-32">
            <HSVCrossSectionSVG />
          </div>
          <div className="h-32 w-32">
            <HSVTopViewSVG />
          </div>
        </div>

        <p>
          まず H-色相 S-彩度
          V(B)-明度です。そして、円錐の中に点をとることで色が決まります。
        </p>

        {/* HSV Description */}
        <div className="my-6">
          <h3 className="mt-6 text-xl font-bold">
            H:色相 <i>Hue</i>
          </h3>
          <p>
            0-360°を取り、色の種類を表します。Hは角度で, 0°赤, 120°緑,
            240°青です。例えばHが0°(赤)のとき、S,Vの値が何に変化しても青や緑など別の色に変わることはありません。但し、白,黒にはなる可能性があります。
          </p>

          <h3 className="mt-4 text-xl font-bold">
            S:彩度 <i>saturation</i>
          </h3>
          <p>
            0-1[0-100%]を取り、色の鮮やかさを表します。この値が大きくなると色が鮮やかになります。高さ(V)の値が小さくなるほど同じSの値でも中心(V軸)からの距離が短くなります。また、Sが0(点がV軸上)のとき、グレースケール、モノクロと呼ばれたりします。
          </p>

          <h3 className="mt-4 text-xl font-bold">
            V(B):光度 <i>value(brightness)</i>
          </h3>
          <p>
            0-1[0-100%]を取り、色の明るさを表します。頂点は真っ黒、底面の中心は真っ白になります。また、Vが0のとき、Sは必ず0で、Hは0-360の値を取れますが、必ず真っ黒になります。
          </p>
        </div>

        <p>RGB同様、以下のツールで確認できます。自由に操作してみてください。</p>

        {/* HSV Controls */}
        <HSVControls hsv={hsv} onHsvChange={handleHsvChange} />

        <p>
          前述のとおり、HSVを使用すると直感的に色を指定できます。「白色」の範囲は以下の赤い部分に注目すると良さそうです。
        </p>

        <div className="my-6 flex justify-center">
          <div className="h-60 w-60 max-w-full">
            <HSVWhiteAreaSVG />
          </div>
        </div>

        <p>
          個人差はあると思いますが、Sが3%以下、Vが90%以上のとき、Hの値に関わらず「白色」とみなせそうです。HSVは使いにくいのでRGBに変換し、その総数を調べたところ
          <span className="font-bold">9825個</span> 存在しました。
        </p>

        {/* Gist details */}
        <GistDetails
          showGistDetails={showGistDetails}
          setShowGistDetails={setShowGistDetails}
        />

        <h2 className="mt-8 text-2xl font-bold">白色生成</h2>
        <p>
          定義した白色の中からランダムで一つ生成します。名前を付けたり、別の白色に変更できたりします。
        </p>

        {/* White color generator */}
        <WhiteGenerator
          whiteName={whiteName}
          whiteColor={whiteColor}
          onWhiteNameChange={handleWhiteNameChange}
          onGenerateWhite={handleGenerateWhite}
        />

        <p className="mt-8">
          <span className="border-b-2 border-gray-500">最後に</span>
          <br />
          HSVにも弱点が存在します。HSV色空間の中で、同じ光度(V)であっても他の色に比べて青色が暗く見えます。人は色相(H)によって明度(V)の感じ方が変わるからです。これを考慮したOKLCH色空間と呼ばれるものが存在します。最大の特徴は
          H(色相) ごとに L(明度), C(彩度)
          の最大値が異なることです。図を描くのは非常に難しいので、
          <a
            href="https://oklch.com"
            className="mx-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            target="_blank"
            rel="noreferrer"
          >
            OKLCH Color Picker & Converter
          </a>
          という外部サイトを参照してみてください。
        </p>
      </div>
    </ContentPageLayout>
  );
};

export default White;
