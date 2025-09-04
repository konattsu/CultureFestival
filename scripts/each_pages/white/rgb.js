// rgb お試しするやつ
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const redValue = document.getElementById("red-value");
const greenValue = document.getElementById("green-value");
const blueValue = document.getElementById("blue-value");
const rgbColorPreview = document.getElementById("color-preview-rgb");

function updateRbgColor() {
    const red = parseInt(redSlider.value).toString(16).padStart(2, "0");
    const green = parseInt(greenSlider.value).toString(16).padStart(2, "0");
    const blue = parseInt(blueSlider.value).toString(16).padStart(2, "0");
    const backgroundColor = `#${red}${green}${blue}`;
    rgbColorPreview.style.backgroundColor = backgroundColor;
    redValue.textContent = generateString(red);
    greenValue.textContent = generateString(green);
    blueValue.textContent = generateString(blue);
}

function generateString(color) {
    return "0x" + color + " , " + parseInt(color, 16);
}

redSlider.addEventListener("input", updateRbgColor);
greenSlider.addEventListener("input", updateRbgColor);
blueSlider.addEventListener("input", updateRbgColor);

updateRbgColor();
