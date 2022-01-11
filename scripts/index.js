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

//Function for getting city details after clicking city icnons
let cityLinkBtn = document.getElementsByClassName("city-link");
for(let eachBtn of cityLinkBtn) {
    eachBtn.addEventListener("click", function() {
        let cityName = eachBtn.getAttribute("id");
        sessionStorage.setItem("cityName", cityName);

        const data = null;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let responseObj = (JSON.parse(this.responseText).data.Typeahead_autocomplete.results);
                let cityLocationId = responseObj["0"].detailsV2.locationId;
                sessionStorage.setItem("cityLocationId", cityLocationId);

                let geoCode = {
                    lat: responseObj["0"].detailsV2.geocode.latitude,
                    lng: responseObj["0"].detailsV2.geocode.longitude,
                };
                sessionStorage.setItem("geoCode", JSON.stringify(geoCode));

                mainDiv.style.display = "none";
                loaderDiv.style.display = "block";
                getHotels();
                }
        });

        xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${sessionStorage.getItem("cityName")}&lang=en_US&units=km`);
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

        xhr.send(data);
    })
}

var mainDiv = document.getElementById("main");
var loaderDiv = document.getElementById("loader");
mainDiv.style.display = "none";

window.addEventListener("load", function() {
    mainDiv.style.display = "block";
    loaderDiv.style.display = "none";
})

//Function for getting autocomplete cities suggestions
let searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", function(){
    let suggestionDiv = document.getElementById("suggestion-div");
    
    if (searchBar.value.length >= 3) {
        let searchValue = searchBar.value;
        const data = null;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                suggestionDiv.innerHTML = "";
                let responseObj = (JSON.parse(this.responseText).data.Typeahead_autocomplete.results);
                let count = 0;
                for (let eachObj of responseObj) {
                    if (count < 2) {
                        let cityName = eachObj.detailsV2.names.name;
                        sessionStorage.setItem("cityName", cityName);
                        count++;

                        let newInputTag = document.createElement("input");
                        newInputTag.setAttribute("type", "text");
                        newInputTag.setAttribute("placeholder", `${cityName}`);
                        newInputTag.setAttribute("size", "40");
                        newInputTag.setAttribute("class", "clickable-text");
                        newInputTag.readOnly = true;

                        suggestionDiv.appendChild(newInputTag);

                        let geoCode = {
                            lat: eachObj.detailsV2.geocode.latitude,
                            lng: eachObj.detailsV2.geocode.longitude,
                        };
                        let cityLocationId = eachObj.detailsV2.locationId;

                        newInputTag.addEventListener("click", function() {
                            mainDiv.style.display = "none";
                            loaderDiv.style.display = "block";
                            sessionStorage.setItem("cityName", cityName);
                            sessionStorage.setItem("geoCode", JSON.stringify(geoCode));
                            
                            sessionStorage.setItem("cityLocationId", cityLocationId);

                            mainDiv.style.display = "none";
                            loaderDiv.style.display = "block";
                            getHotels();
                        })
                    }
                    else {
                        break;
                    }
                }
            }
        });

        xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${searchValue}&lang=en_US&units=km`);
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

        xhr.send(data);
    }
});

//function for getting hotel details after selecting cities
function getHotels() {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);
            let hotelDetailsList = [];
            for(let eachObj of responseObj.data) {
                if(eachObj.address!=undefined && eachObj.name!=undefined && eachObj.rating!=undefined) {
                    let newList = [{lat: parseFloat(eachObj.latitude), lng: parseFloat(eachObj.longitude)}, eachObj.name, eachObj.location_id];
                    hotelDetailsList.push(newList);
                }
            }
            sessionStorage.setItem("hotelDetailsList", JSON.stringify(hotelDetailsList));

            window.location.href = `list.html?city=${sessionStorage.getItem("cityName")}`;
            
        }
    };

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${sessionStorage.getItem("cityLocationId")}&lang=en_US&currency=USD`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

    xhr.send(data);
}