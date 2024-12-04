function loadHTML(containerId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(error));
}

function initializePage() {
    const pageType = document.body.dataset.page;

    if (pageType === "home") {
        createCardList();
    } else if (pageType === "journal") {
        createFavoriteList();
    } else {
        console.error("Unknown page type");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "./src/component/header.html");
    loadHTML("footer", "./src/component/footer.html");
    initializePage();
});

// document.addEventListener("DOMContentLoaded", () => {
//     createCardList();
// });
