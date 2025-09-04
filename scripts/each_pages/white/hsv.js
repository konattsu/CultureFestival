const hSlider = document.getElementById("h-hsv");
const sSlider = document.getElementById("s-hsv");
const vSlider = document.getElementById("v-hsv");
const hValue = document.getElementById("h-hsv-value");
const sValue = document.getElementById("s-hsv-value");
const vValue = document.getElementById("v-hsv-value");
const hsvColorPreview = document.getElementById("color-preview-hsv");

function updateHsvColor() {
    const h = parseInt(hSlider.value) / 360;
    let s = parseFloat(sSlider.value);
    const v = parseFloat(vSlider.value);

    const { r: tmpR, g: tmpG, b: tmpB } = HSVtoRGB(h, s, v);

    const red = tmpR.toString(16).padStart(2, "0");
    const green = tmpG.toString(16).padStart(2, "0");
    const blue = tmpB.toString(16).padStart(2, "0");
    const rgbColor = `#${red}${green}${blue}`;
    hsvColorPreview.style.backgroundColor = rgbColor;

    if (v === 0) {
        s = 0;
        sSlider.value = 0;
    }

    hValue.textContent = "　" + Math.round(h * 360) + "°";
    sValue.textContent = "　" + Math.round(s * 100) + "%";
    vValue.textContent = "　" + Math.round(v * 100) + "%";
}

function HSVtoRGB(h, s, v) {
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

hSlider.addEventListener("input", updateHsvColor);
sSlider.addEventListener("input", updateHsvColor);
vSlider.addEventListener("input", updateHsvColor);

updateHsvColor();
