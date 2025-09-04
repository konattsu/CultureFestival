// ページの最上部へ移動する
const upArrow = document.querySelector("#up-arrow");
if (upArrow) {
    upArrow.addEventListener("click", moveTopHandler);
}

function moveTopHandler() {
    window.scroll({ top: 0, behavior: "smooth" });
    console.log("called move_top.js");
}
