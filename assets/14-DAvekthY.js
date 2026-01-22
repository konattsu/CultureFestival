const n=`# n乗して-1になる数

## 導入

ある数$x$を$n$回掛けることを$x$の$n$乗といい、$x^n$で表す。また、2乗して$-1$になる数を$i$とおき、（実数の範囲内で存在しない数であるため）虚数と呼ぶ。
今回は虚数を用いて、$n$乗して$-1$になる数を求める。

## 2. 何の面白みもない計算タイム

### $n=3$ のとき

$x^3 = -1$ より、$x^3 + 1 = 0$
因数分解して、

$$
x^3 + 1 = (x + 1)(x^2 - x + 1) = 0
$$

したがって、

- $x + 1 = 0 \\Rightarrow x = -1$
- $x^2 - x + 1 = 0 \\Rightarrow x = \\frac{1}{2} - \\frac{\\sqrt{3}}{2}i$, $x = \\frac{1}{2} + \\frac{\\sqrt{3}}{2}i$

### $n=4$ のとき

$x^4 = -1$
$x^4 + 1 = 0$

$x^4 + 2x^2 + 1 - 2x^2 = 0$
$(x^2 + 1)^2 - 2x^2 = 0$
$(x^2 + \\sqrt{2}x + 1)(x^2 - \\sqrt{2}x + 1) = 0$

したがって、

$$
x = \\frac{1 \\pm i}{\\sqrt{2}}, \\quad x = \\frac{-1 \\pm i}{\\sqrt{2}}
$$

### $n=5$ のとき

$x^5 = -1$
$x = \\sqrt[5]{-1}$

極形式を用いて、

$$
x = \\sqrt[5]{1} \\left( \\cos\\left(\\frac{\\pi + 2k\\pi}{5}\\right) + i \\sin\\left(\\frac{\\pi + 2k\\pi}{5}\\right) \\right)
$$

$k = 0, 1, 2, 3, 4$ を代入して、

- $x_1 = \\cos\\left(\\frac{\\pi}{5}\\right) + i \\sin\\left(\\frac{\\pi}{5}\\right)$
- $x_2 = \\cos\\left(\\frac{3\\pi}{5}\\right) + i \\sin\\left(\\frac{3\\pi}{5}\\right)$
- $x_3 = \\cos\\left(\\pi\\right) + i \\sin\\left(\\pi\\right)$
- $x_4 = \\cos\\left(\\frac{7\\pi}{5}\\right) + i \\sin\\left(\\frac{7\\pi}{5}\\right)$
- $x_5 = \\cos\\left(\\frac{9\\pi}{5}\\right) + i \\sin\\left(\\frac{9\\pi}{5}\\right)$

## 3. おわりに

数学はむずいです。そして極形式は便利です。こういう変な好奇心が技術の発展につながったりするから数学はおもしろい。テストは欠るけど。

## 4. 引用元サイト

- [Yahoo!知恵袋](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1350688983): <https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1350688983>
- [Mathway](https://www.mathway.com/ja/Algebra): <https://www.mathway.com/ja/Algebra>
`;export{n as default};
//# sourceMappingURL=14-DAvekthY.js.map
