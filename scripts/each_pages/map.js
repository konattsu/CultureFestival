const saveMapButton = document.querySelector("#save-button");
if (saveMapButton) {
    saveMapButton.addEventListener("click", () => {
        const svgElement = document.querySelector("#map-svg-src");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "地図.svg";
        a.click();
        URL.revokeObjectURL(url);
    });
}
