//! ガチャ

const GACHA_RESULT = ["pu", "rare", "lose"];

/// [0] PU, [1] 最高レア(すり抜け)
const PROBABILITY_DEF = new Map([
    ["genshin", [0.003, 0.003]],
    ["proseka", [0.004, 0.026]],
    ["bluaka", [0.007, 0.023]],
    ["monsuto", [0.035, 0.12]],
    ["nikke", [0.02, 0.02]],
]);

const gachaSelectElement = document.getElementById("gacha-select");
const gachaResultParent = document.getElementById("gacha-results");
const resultTotal = document.getElementById("total");
const resultPu = document.getElementById("pu");
const resultRare = document.getElementById("rare");
const resultLose = document.getElementById("lose");

document.getElementById("single-roll").addEventListener("click", () => {
    roll(1);
});

document.getElementById("multi-10-roll").addEventListener("click", () => {
    roll(10);
});

document.getElementById("multi-100-roll").addEventListener("click", () => {
    roll(100);
});

document.getElementById("multi-1000-roll").addEventListener("click", () => {
    roll(1000);
});

function roll(times) {
    const gachaType = getCurrentGachaType();
    if (gachaType) {
        const result = rollGacha(PROBABILITY_DEF.get(gachaType), times);
        resetGachaResult();
        appendGachaResult(result);
        countUpGachaResult(times);
    }
}

function countUpGachaResult(times) {
    resultTotal.value = times;
    resultPu.value = document.querySelectorAll("#gacha-results .pu").length;
    resultRare.value = document.querySelectorAll("#gacha-results .rare").length;
    resultLose.value = document.querySelectorAll("#gacha-results .lose").length;
}

function getCurrentGachaType() {
    return gachaSelectElement.value;
}

function resetGachaResult() {
    gachaResultParent.innerHTML = "";
}

/**
 * ガチャを回す
 * @param {number[]} probability - 確率
 * @param {number} times - 回数
 * @return {string[]} - 結果
 */
function rollGacha(probability, times) {
    let res = [];
    for (let i = 0; i < times; i++) {
        const x = Math.random();
        if (probability[0] > x) {
            res.push(GACHA_RESULT[0]);
        } else if (probability[0] + probability[1] > x) {
            res.push(GACHA_RESULT[1]);
        } else {
            res.push(GACHA_RESULT[2]);
        }
    }
    return res;
}

/**
 * 結果をdivにして追加
 * @param {string[]} results - ガチャ結果
 */
function appendGachaResult(results) {
    const giveClass = (result) => {
        switch (result) {
            case GACHA_RESULT[0]:
                return "pu";
            case GACHA_RESULT[1]:
                return "rare";
            case GACHA_RESULT[2]:
                return "lose";
            default:
                console.log("NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.NO.");
                return "unknown";
        }
    };

    for (let result of results) {
        const newElement = document.createElement("div");
        newElement.classList.add("gacha-result");
        const className = giveClass(result);
        newElement.classList.add(className);
        gachaResultParent.appendChild(newElement);
    }
}
