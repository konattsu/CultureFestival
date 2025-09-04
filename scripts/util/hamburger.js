// ハンバーガーメニュー, 開閉
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");
const overlay = document.querySelector("#overlay");
if (burger) {
    burger.addEventListener("click", () => {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-active");
        overlay.classList.toggle("is-active");
        callWhenClosedHamburger();
    });
}
if (overlay) {
    overlay.addEventListener("click", () => {
        burger.classList.remove("is-active");
        menu.classList.remove("is-active");
        overlay.classList.remove("is-active");
        callWhenClosedHamburger();
    });
}

function callWhenClosedHamburger() {
    changeSettings.classList.remove("settings-open");
    settings.classList.remove("settings-open");
}

// 設定切り替えの画面, 開閉
const settings = document.querySelector("#settings-button");
const changeSettings = document.querySelector("#change-settings");
if (settings) {
    settings.addEventListener("click", () => {
        changeSettings.classList.add("settings-open");
        settings.classList.add("settings-open");
    });
}

// 各種設定切り替え
const colorTheme = document.querySelector("#toggle-theme");
const toggleHand = document.querySelector("#toggle-hand");
const toggleUpArrow = document.querySelector("#toggle-up-arrow");
const body = document.querySelector("#body");
if (colorTheme) {
    colorTheme.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        body.classList.toggle("light-theme");
        storeSettings();
    });
}
if (toggleHand) {
    toggleHand.addEventListener("click", () => {
        body.classList.toggle("left");
        storeSettings();
    });
}
if (toggleUpArrow) {
    toggleUpArrow.addEventListener("click", () => {
        body.classList.toggle("non-up-arrow");
        storeSettings();
    });
}

// url取得
const copyCurrentUrl = document.querySelector("#copy-current-url");
if (copyCurrentUrl) {
    copyCurrentUrl.addEventListener("click", () => {
        var gotCurrentUrl = location.href;
        if (!navigator.clipboard) {
            alert("お使いのブラウザはこの機能に対応していません。");
            return;
        }
        navigator.clipboard.writeText(gotCurrentUrl).then(
            () => {
                alert("urlをコピーしました。");
            },
            () => {
                alert("urlのコピーに失敗しました。");
            },
        );
    });
}
