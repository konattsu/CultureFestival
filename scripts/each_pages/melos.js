const kmHToMelos = 13320;
const step = -4;

document.addEventListener("DOMContentLoaded", () => {
    const kmHInput = document.getElementById("km-h");
    const maxKmHInput = document.getElementById("max-km-h");
    const maxPowKmHInput = document.getElementById("max-pow-km-h");

    const kmHOutput = document.getElementById("km-h-output");
    const mSOutput = document.getElementById("m-s-output");
    const melosOutput = document.getElementById("melos-output");
    const maxKmHOutput = document.getElementById("max-km-h-output");
    const maxPowKmHOutput = document.getElementById("max-pow-km-h-output");

    function convertFromKmH(value) {
        const kmH = parseFloat(value);
        const mS = kmH / 3.6;
        const melos = kmH / kmHToMelos;
        assignmentForOutput(kmH, mS, melos);
    }

    function setMaxByValue(value) {
        const maxKmH = parseFloat(value) ** maxPowKmHInput.value;
        maxKmHOutput.value = value;
        setMax(maxKmH);
    }

    function setMaxByPow(value) {
        const maxKmHPow = parseFloat(value);

        const maxKmH = maxKmHInput.value ** maxKmHPow;
        setMax(maxKmH);
        maxPowKmHOutput.value = maxKmHPow;
    }

    function setMax(maxKmH) {
        kmHInput.max = maxKmH;
    }

    function assignmentForOutput(kmH, mS, melos) {
        kmHOutput.value = Math.round(kmH * 10) / 10;
        mSOutput.value = Math.round(mS * 10) / 10;
        melosOutput.value = Math.round(melos * 10000) / 10000;
    }

    kmHInput.addEventListener("input", (e) => convertFromKmH(e.target.value));
    maxKmHInput.addEventListener("input", (e) => setMaxByValue(e.target.value));
    maxPowKmHInput.addEventListener("input", (e) => setMaxByPow(e.target.value));
});
