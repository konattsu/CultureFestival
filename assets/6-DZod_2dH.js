const a=`# 加法定理の証明

## 証明

余弦定理より、
$$(\\cos\\alpha-\\cos\\beta)^2+(\\sin\\alpha-\\sin\\beta)^2=2-2\\cos(\\alpha-\\beta)$$

この式を展開すると、

$$
2-2(\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta) = 2-2\\cos(\\alpha-\\beta)
$$

よって、

$$
\\cos(\\alpha-\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta
$$

---

さらに、

$$
\\sin^2(\\alpha-\\beta) = 1 - \\cos^2(\\alpha-\\beta)
$$

また、

$$
1 = (\\sin^2\\alpha + \\cos^2\\alpha)(\\sin^2\\beta + \\cos^2\\beta)
$$

より、

$$
\\sin^2(\\alpha-\\beta) = (\\sin^2\\alpha + \\cos^2\\alpha)(\\sin^2\\beta + \\cos^2\\beta) - (\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta)^2
$$

展開すると、

$$
= \\sin^2\\alpha\\cos^2\\beta + 2\\sin\\alpha\\cos\\beta\\cos\\alpha\\sin\\beta + \\cos^2\\alpha\\sin^2\\beta
$$

$$
= (\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta)^2
$$

したがって、

$$
\\sin(\\alpha-\\beta) = \\pm (\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta)
$$

$\\sin(\\alpha-\\beta) > 0$ より、

$$
\\sin(\\alpha-\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta
$$

---

編集者注: 図は制作の都合上掲載出来ておりません。なお、紙の部誌では掲載されております。
`;export{a as default};
//# sourceMappingURL=6-DZod_2dH.js.map
