//! 一時的に保存されたクラスを#bodyに返す

window.addEventListener("DOMContentLoaded", () => {
    let bodyForSettings = document.querySelector("#body");
    let savedClass = localStorage.getItem("settingsClass");
    if (savedClass) {
        savedClass = verifyConsistency(savedClass);
        bodyForSettings.classList = savedClass;
    }
});
