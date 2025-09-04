const gistButton = document.querySelector("#gist-button");
const gistWrapper = document.querySelector("#gist-wrapper");
// let loadedGistSrc = false;

if (gistButton && gistWrapper) {
    gistButton.addEventListener("click", () => {
        gistWrapper.classList.toggle("active");
        // 内部で document.write が使われているので,動的読み込み難しそう
        // if (!loadedGistSrc) {
        //     const divForGistSrc = document.querySelector("#gist-src");
        //     const script = document.createElement("script");
        //     script.src =
        //         "https://gist.github.com/konattsu/e56eff220bd0a364a0f79ea91b666fc5.js";
        //     divForGistSrc.appendChild(script);
        //     loadedGistSrc = true;
        // }
    });
}
