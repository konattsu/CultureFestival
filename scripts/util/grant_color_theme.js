function isDarkMode() {
    return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
}

const bodyForGrant = document.querySelector("#body");

if (!bodyForGrant.classList.contains("dark-theme" || "light-theme")) {
    if (isDarkMode()) {
        bodyForGrant.classList.add("dark-theme");
    } else {
        bodyForGrant.classList.add("light-theme");
    }
}

/// @brief: ダークモードとライトモードが二つ存在しないか確認
///   二つ存在するときはデバイスのカラーテーマが余分に付与されているので消す
/// @param: String, querySelectorで取ってきたもの
/// @return: String, paramの整合性を合わせたもの
function verifyConsistency(savedClass) {
    if (
        savedClass.includes("dark-theme") &&
        savedClass.includes("light-theme")
    ) {
        if (isDarkMode()) {
            savedClass = savedClass.replace("dark-theme", "").trim();
        } else {
            savedClass = savedClass.replace("light-theme", "").trim();
        }
    }
    return savedClass;
}
