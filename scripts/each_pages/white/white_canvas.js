const whiteChangeButton = document.querySelector("#generate-white");
if (whiteChangeButton) {
    whiteChangeButton.addEventListener("click", () => {
        applyColor("#" + decisionWhiteRGB());
    });
}

const whiteEnterButton = document.querySelector("#input-white-name");
if (whiteEnterButton) {
    whiteEnterButton.addEventListener("input", (e) => {
        if (e.target.value.length <= 10) {
            nameColor(e.target.value);
        }
    });
}

const whiteSaveATag = document.querySelector("#save-white-img");
if (whiteSaveATag) {
    whiteSaveATag.addEventListener("click", () => {
        const base64 = getImageBase64();
        whiteSaveATag.href = base64;
    });
}

/// @return (min..max) int型
function generateRandom(min, max) {
    return (Math.round(Math.random() * 10000000) % (max - min)) + min;
}

/// @return `#` 無し
function decisionWhiteRGB() {
    const [base, min, max] = RGB_RANGE[generateRandom(0, RGB_RANGE.length)];
    const a = base;
    const b = generateRandom(min, max + 1);
    const c = generateRandom(min, max + 1);
    const generateRGBInt = (a, b, c) => {
        switch (generateRandom(0, 3)) {
            // b, cはどっちともランダム生成なので区別しなくてよい
            case 0:
                return [a, b, c];
            case 1:
                return [b, a, c];
            case 2:
                return [b, c, a];
        }
    };
    let rgb = "";
    for (const intBase10 of generateRGBInt(a, b, c)) {
        rgb += intBase10.toString(16);
    }
    return rgb;
}

// [0] 一つの値, [1]-[2], その他2つの値の範囲
const RGB_RANGE = new Array(
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
);

document.addEventListener("DOMContentLoaded", () => {
    applyColor("#ffffff");
});

function applyColor(rgbWithHashTag) {
    canvasBackgroundColorLatest = rgbWithHashTag;
    ctx.fillStyle = rgbWithHashTag;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.font = "90px monospace";
    ctx.fillStyle = ctx.fillText(rgbWithHashTag, 1100, 400);
}

function nameColor(name) {
    applyColor(canvasBackgroundColorLatest);

    ctx.fillStyle = "#000";
    ctx.font = "120px monospace";
    ctx.fillStyle = ctx.fillText(name, 100, 280);
}

function getImageBase64() {
    return canvas.toDataURL("image/png");
}

const canvas = document.getElementById("white-canvas");
const ctx = canvas.getContext("2d");
let canvasBackgroundColorLatest = "";
