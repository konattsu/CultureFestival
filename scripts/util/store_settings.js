//! #bodyにあるクラスを一時的に保存

function storeSettings() {
    const body = document.querySelector("#body");
    const classNames = body.className;
    localStorage.setItem("settingsClass", classNames);
}
