//! href属性としたいことは一緒, ただ元に戻るを使いやすいようにするため

/// move_content

document
    .querySelector("#title-list")
    .addEventListener("click", function (event) {
        // aタグか判定 -> hrefのやつ取得 -> idゲット!
        if (event.target.tagName === "A") {
            event.preventDefault();
            const targetId = event.target.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
