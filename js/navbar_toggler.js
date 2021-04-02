function toggleNavMenu() {
    let topNavElement = document.getElementById("top-nav");
    if (!topNavElement.classList.contains("responsive")) {
        topNavElement.classList.add("responsive");
    } else {
        topNavElement.classList.remove("responsive");
    }
} 