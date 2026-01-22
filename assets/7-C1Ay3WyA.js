const n=`# 近似

## 導入

教科書的には高校物理では微分積分を使うことは基本的にはない。しかし、公式を導出するうえでは必要不可欠である。
ここで、必ずしも、近似を使うところで微分が使えるとは限らないが、微分して解けるものに近似を持ち出して解かせることもある。
教科書的には近似で解かせたいならそれで解いてあげようということでいくつか物理で使われる近似式を見てみる。

### 一次近似の例

- $(1+x)^a \\approx 1+ax$
- $\\sqrt{1+x} = (1+x)^{1/2} \\approx 1 + \\frac{x}{2}$
- $\\frac{1}{1+x} = (1+x)^{-1} \\approx 1 - x$
- $\\sin\\theta \\approx \\theta \\approx \\tan\\theta$
- $\\cos\\theta \\approx 1$

ただし、$x \\ll 1$, $\\theta \\ll 1$ のとき。これらを一次近似という。

## $\\sin\\theta \\approx \\theta \\approx \\tan\\theta$ のグラフ的考察

$\\sin\\theta \\approx \\theta \\approx \\tan\\theta$ はあとでマクローリン展開を使いたいので、グラフを使って考える。
$\\cos\\theta \\approx 1$ はまあいいかなと思うので割愛。

$y = \\sin\\theta$, $y = \\tan\\theta$, $y = \\theta$ のグラフを考えると、いずれのグラフも原点を通り、
1つ目2つ目の式を微分した式 $y = \\cos\\theta$, $y = \\frac{1}{\\cos^2\\theta}$ において $\\theta \\to 0$ でどちらも $y = 1$ となる。
これらから、$y = \\sin\\theta$, $y = \\tan\\theta$, $y = \\theta$ において $\\theta=0$付近ではグラフが重なっていることがわかる。
![sinθ, tanθ, θ のグラフ](magazine/7-1.webp)

## $(1+x)^a \\approx 1+ax$ のマクローリン展開

$(1+x)^a$ が無限回微分可能な関数であるなら、
マクローリン展開

$$
f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\cdots + \\frac{f^{(n)}(0)}{n!}x^n + \\cdots \\\\
= \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n
$$

より、

$$
(1+x)^a = 1 + ax + a(a-1) \\frac{x^2}{2!} + a(a-1)(a-2) \\frac{x^3}{3!} + \\cdots
$$

これを一次近似で利用するのであれば

$$
(1+x)^a \\approx 1 + ax
$$

## 感想

マクローリン定理の証明になってくると難しいが、
うまく切り抜いて使えば自己満足程度には理解することができて面白かった。証明も挑戦してみたい。
`;export{n as default};
//# sourceMappingURL=7-C1Ay3WyA.js.map
