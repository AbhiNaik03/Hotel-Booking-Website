// View More and View Less logic
const viewButton = document.getElementById("view-button");
const hiddenCard = document.getElementById("hidden-city-card");

hiddenCard.style.display = "none";

viewButton.onclick = function() {
    if (viewButton.innerText == "View More") {
        hiddenCard.style.display = "flex";
        viewButton.innerText = "View Less";
    }
    else if (viewButton.innerText == "View Less") {
        hiddenCard.style.display = "none";
        viewButton.innerText = "View More"
    }
}

let cityLinkBtn = document.getElementsByClassName("city-link");
for(let eachBtn of cityLinkBtn) {
    eachBtn.addEventListener("click", function() {
        let cityName = eachBtn.getAttribute("id");
        sessionStorage.setItem("cityName", cityName);
        eachBtn.setAttribute("href", `list.html?city=${cityName}`)
    })
}