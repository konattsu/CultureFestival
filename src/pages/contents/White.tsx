import React, { useState, useEffect, useRef } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

interface HSVColor {
  h: number;
  s: number;
  v: number;
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// White color range definition
const RGB_RANGE = [
  [223, 223, 230],
  [224, 223, 231],
  [225, 223, 232],
  [226, 223, 233],
  [227, 223, 234],
  [228, 223, 235],
  [229, 223, 236],
  [230, 223, 237],
  [231, 224, 238],
  [232, 225, 239],
  [233, 226, 241],
  [234, 227, 242],
  [235, 228, 243],
  [236, 229, 244],
  [237, 230, 245],
  [238, 231, 246],
  [239, 232, 247],
  [240, 233, 248],
  [241, 233, 249],
  [242, 234, 250],
  [243, 235, 251],
  [244, 236, 252],
  [245, 237, 253],
  [246, 238, 254],
  [247, 239, 255],
  [248, 240, 255],
  [249, 241, 255],
  [250, 242, 255],
  [251, 243, 255],
  [252, 244, 255],
  [253, 245, 255],
  [254, 246, 255],
  [255, 247, 255],
];

const White: React.FC = () => {
  // RGB slider state
  const [rgb, setRgb] = useState<RGBColor>({ r: 0, g: 0, b: 0 });

  // HSV slider state
  const [hsv, setHsv] = useState<HSVColor>({ h: 0, s: 1, v: 1 });

  // White canvas state
  const [whiteName, setWhiteName] = useState<string>("");
  const [whiteColor, setWhiteColor] = useState<string>("#ffffff");

  // Gist details state
  const [showGistDetails, setShowGistDetails] = useState<boolean>(false);

  // Canvas references
  const whiteCanvasRef = useRef<HTMLCanvasElement>(null);

  // Convert HSV to RGB
  const HSVtoRGB = (h: number, s: number, v: number): RGBColor => {
    let r = 0,
      g = 0,
      b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        ((r = v), (g = t), (b = p));
        break;
      case 1:
        ((r = q), (g = v), (b = p));
        break;
      case 2:
        ((r = p), (g = v), (b = t));
        break;
      case 3:
        ((r = p), (g = q), (b = v));
        break;
      case 4:
        ((r = t), (g = p), (b = v));
        break;
      case 5:
        ((r = v), (g = p), (b = q));
        break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Generate random int between min and max
  const generateRandom = (min: number, max: number): number => {
    return (Math.round(Math.random() * 10000000) % (max - min)) + min;
  };

  // Generate a random white color
  const generateWhiteColor = (): string => {
    const [base, min, max] = RGB_RANGE[generateRandom(0, RGB_RANGE.length)];
    const a = base;
    const b1 = generateRandom(min, max + 1);
    const c1 = generateRandom(min, max + 1);

    // Randomly arrange RGB values
    const arrangeRGB = (): [number, number, number] => {
      switch (generateRandom(0, 3)) {
        case 0:
          return [a, b1, c1];
        case 1:
          return [b1, a, c1];
        case 2:
          return [b1, c1, a];
        default:
          return [a, b1, c1];
      }
    };

    const [r, g, b] = arrangeRGB();
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  };

  // Draw on the white canvas
  const drawWhiteCanvas = (color: string, name?: string): void => {
    const canvas = whiteCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add color code
    ctx.fillStyle = "#000";
    ctx.font = "90px monospace";
    ctx.fillText(color, 1100, 400);

    // Add name if provided
    if (name && name.trim() !== "") {
      ctx.font = "120px monospace";
      ctx.fillText(name, 100, 280);
    }
  };

  // Get canvas as base64 image
  const getCanvasImage = (): string => {
    const canvas = whiteCanvasRef.current;
    if (!canvas) return "";
    return canvas.toDataURL("image/png");
  };

  // Handle RGB slider changes
  const handleRgbChange = (channel: "r" | "g" | "b", value: number): void => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
  };

  // Handle HSV slider changes
  const handleHsvChange = (channel: "h" | "s" | "v", value: number): void => {
    let newHsv = { ...hsv, [channel]: value };

    // If v is 0, force s to be 0 as well
    if (channel === "v" && value === 0) {
      newHsv.s = 0;
    }

    setHsv(newHsv);
  };

  // Generate new white color
  const handleGenerateWhite = (): void => {
    const newColor = generateWhiteColor();
    setWhiteColor(newColor);
    drawWhiteCanvas(newColor, whiteName);
  };

  // Handle white name change
  const handleWhiteNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newName = e.target.value.slice(0, 10);
    setWhiteName(newName);
    drawWhiteCanvas(whiteColor, newName);
  };

  // Convert RGB to hex string
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Effect for RGB preview
  useEffect(() => {
    // Nothing to do here as we're using controlled components
  }, [rgb]);

  // Effect for HSV preview
  useEffect(() => {
    // We update the preview using inline style with the calculated HSV to RGB values
  }, [hsv]);

  // Initialize white canvas on load
  useEffect(() => {
    handleGenerateWhite();
  }, []);

  // SVG symbols for HSV visualizations
  const svgSymbols = (
    <svg className="hidden">
      {/* HSV lateral section symbol */}
      <symbol id="hsv-ls-svg-src" viewBox="0 0 100 100">
        <rect className="fill-none" x="0" y="0" width="100" height="100" />
        <ellipse
          className="fill-none stroke-current stroke-2"
          cx="50"
          cy="30"
          rx="40"
          ry="10"
        />
        <polyline
          className="stroke-round fill-none stroke-current stroke-2"
          points="10,31 50,90 90,31"
        />
        <line
          className="stroke-round stroke-current"
          x1="50"
          y1="91"
          x2="95"
          y2="91"
        />
        <polygon className="fill-current" points="95,91 93,89, 93,93" />
        <text className="fill-current" x="90" y="87" fontSize="10">
          S
        </text>
        <line
          className="stroke-round stroke-current"
          x1="50"
          y1="91"
          x2="85"
          y2="65"
        />
        <text className="fill-current" x="68" y="88" fontSize="10">
          H
        </text>
        <polygon className="fill-current" points="63,82 61.5,85 65.5,83" />
        <rect className="fill-white" x="63.7" y="88" width="1" height="3" />
        <line
          className="stroke-current"
          x1="63.5"
          y1="84"
          x2="64"
          y2="86.5"
          strokeWidth="1"
        />
        <line
          className="stroke-round stroke-current"
          x1="50"
          y1="91"
          x2="50"
          y2="10"
          strokeWidth="1"
        />
        <polygon className="fill-current" points="50,10 52,12 48,12" />
        <text className="fill-current" x="38" y="15" fontSize="10">
          V
        </text>
      </symbol>

      {/* HSV cross-section symbol */}
      <symbol id="hsv-cs-svg-src" viewBox="0 0 100 100">
        <rect className="fill-none" x="0" y="0" width="100" height="100" />
        <polygon
          points="30,90 30,15 75,15"
          className="fill-black opacity-100"
        />
        <polygon
          points="30,90 30,15 75,15"
          className="fill-gradient-to-br from-red-500 to-transparent"
        />
        <polygon
          points="30,90 30,15 75,15"
          className="fill-gradient-to-t from-black to-transparent"
        />
        <polygon
          points="30,90 30,15 75,15"
          className="fill-none stroke-white/30"
          strokeWidth="0.3"
        />
        <text className="fill-current" x="30" y="13" fontSize="10">
          S
        </text>
        <line
          className="stroke-current"
          x1="40"
          y1="10"
          x2="70"
          y2="10"
          strokeWidth="1"
        />
        <polygon className="fill-current" points="71,10 68,7 68,13" />
        <text className="fill-current" x="20" y="85" fontSize="10">
          V
        </text>
        <line
          className="stroke-current"
          x1="23"
          y1="70"
          x2="23"
          y2="20"
          strokeWidth="1"
        />
        <polygon className="fill-current" points="23,19 20,22 26,22" />
      </symbol>

      {/* HSV top view symbol */}
      <symbol id="hsv-top-svg-src" viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" className="fill-none" />
        <circle cx="50" cy="50" r="50" className="fill-red-500/70" />
        <circle cx="50" cy="50" r="50" className="fill-yellow-500/70" />
        <circle cx="50" cy="50" r="50" className="fill-green-500/70" />
        <circle cx="50" cy="50" r="50" className="fill-cyan-500/70" />
        <circle cx="50" cy="50" r="50" className="fill-blue-500/70" />
        <circle cx="50" cy="50" r="50" className="fill-violet-500/70" />
        <circle cx="50" cy="50" r="50" className="fill-white/50" />
        <circle cx="50" cy="50" r="3" className="fill-black" />
        <line
          x1="50"
          y1="50"
          x2="100"
          y2="50"
          className="stroke-black"
          strokeWidth="1"
        />
        <text x="40" y="60" fontSize="10" className="fill-black">
          V
        </text>
        <line x1="50" y1="50" x2="75.5" y2="7" className="stroke-black" />
        <text x="60" y="45" fontSize="10" className="fill-black">
          H
        </text>
        <line x1="60" y1="50" x2="59" y2="47" className="stroke-black" />
        <line x1="58" y1="45" x2="55" y2="42" className="stroke-black" />
        <text x="60" y="15" fontSize="10" className="fill-black">
          S
        </text>
        <polygon
          points="75.5,7 73.5,7.6 76,9"
          className="fill-black stroke-black"
        />
      </symbol>

      {/* HSV white calculation explanation symbol */}
      <symbol id="hsv-ls-white-svg-src" viewBox="0 0 100 100">
        <rect className="fill-none" x="0" y="0" width="100" height="100" />
        <polyline
          points="30,31 50,60 70,31"
          className="stroke-round fill-red-500 stroke-white stroke-2"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="20"
          ry="5"
          className="fill-red-500 stroke-white stroke-2"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="40"
          ry="10"
          className="fill-none stroke-current"
          strokeWidth="1"
        />
        <polyline
          points="10,31 50,90 90,31"
          className="stroke-round fill-none stroke-current"
          strokeWidth="1"
        />
        <line
          className="stroke-round stroke-current"
          x1="50"
          y1="91"
          x2="95"
          y2="91"
        />
        <polygon className="fill-current" points="95,91 93,89, 93,93" />
        <text className="fill-current" x="90" y="87" fontSize="10">
          S
        </text>
        <line
          className="stroke-round stroke-current"
          x1="50"
          y1="91"
          x2="85"
          y2="65"
        />
        <text className="fill-current" x="68" y="88" fontSize="10">
          H
        </text>
        <polygon className="fill-current" points="63,82 61.5,85 65.5,83" />
        <rect className="fill-white" x="63.7" y="88" width="1" height="3" />
        <line
          className="stroke-current"
          x1="63.5"
          y1="84"
          x2="64"
          y2="86.5"
          strokeWidth="1"
        />
        <line
          className="stroke-round stroke-current"
          x1="50"
          y1="91"
          x2="50"
          y2="10"
          strokeWidth="1"
        />
        <polygon className="fill-current" points="50,10 52,12 48,12" />
        <text className="fill-current" x="38" y="15" fontSize="10">
          V
        </text>
      </symbol>
    </svg>
  );

  return (
    <ContentPageLayout title="白色" svgSymbols={svgSymbols}>
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
        <div className="my-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <div className="mb-4">
            <label
              htmlFor="red"
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>赤</span>
              <span className="font-mono">
                0x{rgb.r.toString(16).padStart(2, "0")} , {rgb.r}
              </span>
            </label>
            <input
              type="range"
              id="red"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-red-300 accent-red-600 dark:bg-red-900"
              min="0"
              max="255"
              value={rgb.r}
              step="1"
              onChange={(e) => handleRgbChange("r", parseInt(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="green"
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>緑</span>
              <span className="font-mono">
                0x{rgb.g.toString(16).padStart(2, "0")} , {rgb.g}
              </span>
            </label>
            <input
              type="range"
              id="green"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-green-300 accent-green-600 dark:bg-green-900"
              min="0"
              max="255"
              value={rgb.g}
              step="1"
              onChange={(e) => handleRgbChange("g", parseInt(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="blue"
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>青</span>
              <span className="font-mono">
                0x{rgb.b.toString(16).padStart(2, "0")} , {rgb.b}
              </span>
            </label>
            <input
              type="range"
              id="blue"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-300 accent-blue-600 dark:bg-blue-900"
              min="0"
              max="255"
              value={rgb.b}
              step="1"
              onChange={(e) => handleRgbChange("b", parseInt(e.target.value))}
            />
          </div>

          <div
            className="mt-4 h-20 w-full rounded border border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: rgbToHex(rgb.r, rgb.g, rgb.b) }}
          ></div>
        </div>

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
          HSV色空間は円錐の形をしています。1枚目が俯瞰図、2枚目はy軸の断面図、3枚目以降は真上から見た図で、徐々に1枚目をスライスしてます。
        </p>

        {/* HSV Visualizations */}
        <div className="my-6 flex flex-wrap justify-center gap-4">
          <svg className="h-32 w-32">
            <use href="#hsv-ls-svg-src"></use>
          </svg>
          <svg className="h-32 w-32">
            <use href="#hsv-cs-svg-src"></use>
          </svg>
          <svg className="h-32 w-32">
            <use href="#hsv-top-svg-src"></use>
          </svg>
        </div>

        <p>
          まず H-色相 S-彩度
          V(B)-明度です。そして、円錐の中に点をとることで色が決まります。
        </p>

        {/* HSV Description */}
        <div className="my-6">
          <div className="flex flex-wrap justify-center gap-4">
            <svg className="h-40 w-40">
              <use href="#hsv-ls-svg-src"></use>
            </svg>
            <svg className="h-40 w-40">
              <use href="#hsv-top-svg-src"></use>
            </svg>
            <svg className="h-40 w-40">
              <use href="#hsv-cs-svg-src"></use>
            </svg>
          </div>

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
        <div className="my-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <div className="mb-4">
            <label
              htmlFor="h-hsv"
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>H</span>
              <span className="font-mono">{Math.round(hsv.h)}°</span>
            </label>
            <input
              type="range"
              id="h-hsv"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500 accent-gray-700 dark:accent-white"
              min="0"
              max="360"
              value={hsv.h}
              step="1"
              onChange={(e) => handleHsvChange("h", parseInt(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="s-hsv"
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>S</span>
              <span className="font-mono">{Math.round(hsv.s * 100)}%</span>
            </label>
            <input
              type="range"
              id="s-hsv"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-gray-300 to-blue-500 accent-gray-700 dark:accent-white"
              min="0"
              max="1"
              value={hsv.s}
              step="0.01"
              onChange={(e) => handleHsvChange("s", parseFloat(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="v-hsv"
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>V</span>
              <span className="font-mono">{Math.round(hsv.v * 100)}%</span>
            </label>
            <input
              type="range"
              id="v-hsv"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-black to-white accent-gray-700 dark:accent-white"
              min="0"
              max="1"
              value={hsv.v}
              step="0.01"
              onChange={(e) => handleHsvChange("v", parseFloat(e.target.value))}
            />
          </div>

          <div
            className="mt-4 h-20 w-full rounded border border-gray-300 dark:border-gray-600"
            style={{
              backgroundColor: rgbToHex(
                HSVtoRGB(hsv.h / 360, hsv.s, hsv.v).r,
                HSVtoRGB(hsv.h / 360, hsv.s, hsv.v).g,
                HSVtoRGB(hsv.h / 360, hsv.s, hsv.v).b,
              ),
            }}
          ></div>
        </div>

        <p>
          前述のとおり、HSVを使用すると直感的に色を指定できます。「白色」の範囲は以下の赤い部分に注目すると良さそうです。
        </p>

        <div className="my-6 flex justify-center">
          <svg className="h-60 w-60 max-w-full">
            <use href="#hsv-ls-white-svg-src"></use>
          </svg>
        </div>

        <p>
          個人差はあると思いますが、Sが3%以下、Vが90%以上のとき、Hの値に関わらず「白色」とみなせそうです。HSVは使いにくいのでRGBに変換し、その総数を調べたところ
          <span className="font-bold">9825個</span> 存在しました。
        </p>

        {/* Gist details */}
        <div className="my-6">
          <div className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <button
              onClick={() => setShowGistDetails(!showGistDetails)}
              className="flex w-full items-center justify-between p-4 text-left font-medium focus:outline-none"
            >
              <span>詳細を{showGistDetails ? "隠す" : "表示"}</span>
              <svg
                className={`h-5 w-5 transform transition-transform ${showGistDetails ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showGistDetails && (
              <div className="border-t border-gray-300 p-4 dark:border-gray-700">
                <p className="mb-4">
                  <strong>HSVをRGBに変換した理由</strong>
                  <br />
                  RGBは色の重複が無いが、HSVは重複がある。例えば、S:0%,
                  V:100%のとき、色はHの値に関わらず#fff(真っ白)となるから。
                </p>

                <p>
                  <strong>9825個の算出方法</strong>
                  <br />
                  HSVをRGBに変換し、Rが255の時のG,
                  Bの範囲、Rが254の...と繰り返していき、G,Bについても同様に求める。その後重複を除き数えた。
                  <br />
                  かなり無理やりですが、ソースは
                  <a
                    className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    href="https://gist.github.com/konattsu/e56eff220bd0a364a0f79ea91b666fc5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ここ
                  </a>
                  。
                </p>
              </div>
            )}
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold">白色生成</h2>
        <p>
          定義した白色の中からランダムで一つ生成します。名前を付けたり、別の白色に変更できたりします。
        </p>

        {/* White color generator */}
        <div className="my-6 space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-grow items-center">
              <label
                htmlFor="input-white-name"
                className="mr-2 font-medium whitespace-nowrap"
              >
                色の名前(1-10字):
              </label>
              <input
                type="text"
                id="input-white-name"
                className="flex-grow rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                value={whiteName}
                onChange={handleWhiteNameChange}
                maxLength={10}
                placeholder="ここに入力"
              />
            </div>

            <button
              onClick={handleGenerateWhite}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              別の白色
            </button>

            <a
              href={getCanvasImage()}
              download="white.png"
              className="rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            >
              画像を保存
            </a>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded border border-gray-300 bg-white dark:border-gray-600">
            <canvas
              ref={whiteCanvasRef}
              width="1500"
              height="500"
              className="h-full w-full object-contain"
            ></canvas>
          </div>
        </div>

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
