/// @brief テーブルの項目がクリックされたら
///   その項目に合わせてソートする
function sortTable(columnIndex) {
    const table = document.getElementById("cipher-table");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.forEach((row) => {
        row.querySelectorAll("th, td").forEach((cell) => {
            cell.style.fontWeight = "normal";
            cell.style.fontSize = "100%";
        });
    });

    const sortedRows = rows.sort((a, b) => {
        const aText = a.querySelectorAll("th, td")[columnIndex].textContent.trim();
        const bText = b.querySelectorAll("th, td")[columnIndex].textContent.trim();
        return aText.localeCompare(bText, "en");
    });

    sortedRows.forEach((row) => {
        let style = row.querySelectorAll("th, td")[columnIndex].style;
        style.fontWeight = "bold";
        style.fontSize = "110%";
        tbody.appendChild(row);
    });
}

// テーブルの値がクリックされたときフォームに入力
document.querySelector("#cipher-table").addEventListener("click", (event) => {
    const target = event.target;
    if (
        (target.tagName === "TH" || target.tagName === "TD") &&
        target.parentElement.parentElement.tagName === "TBODY"
    ) {
        const row = target.parentElement;
        const cells = row.querySelectorAll("th, td");

        const beforeCipher = cells[0].textContent.trim();
        const afterCipher = cells[1].textContent.trim();
        appendOutput(beforeCipher, afterCipher);
    }
});

document.querySelector("#cipher-del").addEventListener("click", () => {
    deleteOutput();
});

document.querySelector("#cipher-cls").addEventListener("click", () => {
    clsOutput();
});

/// @brief 出力フォームに文字列を追加
function appendOutput(beforeCipherOutputContent, afterCipherOutputContent) {
    let { before, after } = getCipherOutputContent();
    const existingValueBefore = before.value;
    const existingValueAfter = after.value;

    before.textContent = existingValueBefore + beforeCipherOutputContent;
    after.textContent = existingValueAfter + afterCipherOutputContent;

    scrollToRight(before);
    scrollToRight(after);
}

/// @brief 出力フォームから文字列を一つずつ削除
function deleteOutput() {
    let { before, after } = getCipherOutputContent();
    let existingValueBefore = before.value;
    let existingValueAfter = after.value;
    before.textContent = existingValueBefore.slice(0, -1);
    after.textContent = existingValueAfter.slice(0, -1);

    scrollToRight(before);
    scrollToRight(after);
}

/// @brief 出力フォームの文字列を全部削除
function clsOutput() {
    let { before, after } = getCipherOutputContent();

    if (window.confirm("全部削除してよろしいですか?")) {
        before.textContent = "";
        after.textContent = "";
    }
}

/// @brief 暗号出力フォームのgetElementByIdを返す
/// @return { 暗号前, 暗号後 }
function getCipherOutputContent() {
    let before = document.getElementById("cipher-result-before");
    let after = document.getElementById("cipher-result-after");
    return { before, after };
}

/// @brief 出力フォームの一番にスクロールを移動させる
function scrollToRight(element) {
    element.scrollLeft = element.scrollWidth;
}
