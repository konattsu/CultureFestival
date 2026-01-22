const n=`# 二倍角の公式の証明・半角の公式の証明

## 二倍角の公式とは……

$$
\\sin 2\\theta = 2 \\sin\\theta \\cos\\theta
$$

$$
\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta
$$

これらは、加法定理を使用して証明することができる。

### 加法定理

$$
\\sin(\\alpha + \\beta) = \\sin\\alpha \\cos\\beta + \\cos\\alpha \\sin\\beta
$$

$$
\\cos(\\alpha + \\beta) = \\cos\\alpha \\cos\\beta - \\sin\\alpha \\sin\\beta
$$

勘のいい人ならわかると思うが、これに $\\beta = \\theta$ を代入すると二倍角の公式が完成するのである。

### cosの二倍角の公式の応用

また、$\\cos^2\\theta + \\sin^2\\theta = 1$ を利用して変形すると

$$
\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta
$$

$$
= (1 - \\sin^2\\theta) - \\sin^2\\theta
= 1 - 2\\sin^2\\theta
$$

または

$$
\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta
= \\cos^2\\theta - (1 - \\cos^2\\theta)
= 2\\cos^2\\theta - 1
$$

よって

$$
\\cos 2\\theta = 1 - 2\\sin^2\\theta
$$

$$
\\cos 2\\theta = 2\\cos^2\\theta - 1
$$

### 半角の公式

これに $\\theta = \\alpha / 2$ を代入すると

$$
\\cos\\alpha = 1 - 2\\sin^2 \\frac{\\alpha}{2}
$$

$$
\\cos\\alpha = 2\\cos^2 \\frac{\\alpha}{2} - 1
$$

よって

$$
\\sin^2 \\frac{\\alpha}{2} = \\frac{1 - \\cos\\alpha}{2}
$$

$$
\\cos^2 \\frac{\\alpha}{2} = \\frac{1 + \\cos\\alpha}{2}
$$

## まとめ

二倍角の公式は加法定理、半角の公式は二倍角の公式と $\\sin^2\\theta + \\cos^2\\theta$ を利用して得られる。
`;export{n as default};
//# sourceMappingURL=9-jWj0d-4q.js.map
