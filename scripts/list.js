var mainDiv = document.getElementById("main");
var loaderDiv = document.getElementById("loader");
mainDiv.style.display = "none";

// Function for finding city details
function findCity() {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);
            let cityLocationId = responseObj.data.Typeahead_autocomplete.results["0"].detailsV2.locationId;
            sessionStorage.setItem("cityLocationId", cityLocationId);
            getHotels();
        }
    });

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${sessionStorage.getItem("cityName")}&lang=en_US&units=km`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

    xhr.send(data);

}

findCity();

// Function for finding hotels from city
function getHotels() {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);
            let container = document.getElementById("list-view");
            for(let eachObj of responseObj.data) {
                if(eachObj.address!=undefined && eachObj.name!=undefined && eachObj.rating!=undefined) {
                    let newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "hotel-div");
                    let newTemplate = `
                        <a href="detail.html" id=${eachObj.location_id} class="hotel-link">
                            <div class="hotel-info-div">
                                <div class="hotel-img">
                                    <img src=${eachObj.photo.images.large.url} alt=${eachObj.name} class="hotel-images">
                                </div>
                                
                                <div class="hotel-info">
                                    <h3>${eachObj.name}</h3>
                                    <span>${eachObj.rating}</span> <span class="fa fa-star checked"></span>
                                    <p>${eachObj.address}</p>
                                </div>
                            </div>
                        </a>
                    `
                    newDiv.innerHTML = newTemplate;
                    container.appendChild(newDiv);
                }
            }
            mainDiv.style.display = "block";
            loaderDiv.style.display = "none";


            let hotelLinkBtn = document.getElementsByClassName("hotel-link");
            for (let eachBtn of hotelLinkBtn) {
                eachBtn.style.textDecoration = "none";
                eachBtn.style.color = "black";
                eachBtn.addEventListener("click", function() {
                    let hotelLocationId = eachBtn.getAttribute("id");
                    sessionStorage.setItem("hotelLocationId", hotelLocationId);
                    eachBtn.setAttribute("href", `detail.html?id=${hotelLocationId}`);
                })
            }
        }
    };

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${sessionStorage.getItem("cityLocationId")}&lang=en_US&currency=USD`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

    xhr.send(data);
}

// Function for setting map details
function initMap() {
    const myLatLng = JSON.parse(sessionStorage.getItem("geoCode"));
    const markerHotelDetails = JSON.parse(sessionStorage.getItem("hotelDetailsList"));
    const map = new google.maps.Map(document.getElementById("map-view"), {
      zoom: 12,
      center: myLatLng,
    });
  
    const infoWindow = new google.maps.InfoWindow();
  
    markerHotelDetails.forEach(([positionObj, title, locationId]) => {
        const marker = new google.maps.Marker({
            position: positionObj,
            map,
            title: title,
            optimized: false, 
        });
  
        marker.addListener("click", () => {
            sessionStorage.setItem("hotelLocationId", locationId);
            infoWindow.close();
            infoWindow.setContent(`<p><h6>${title}</h6><p>
            <a href="detail.html?id=${locationId}" class="book-now-link">Book Now</a>`);
            infoWindow.open(marker.getMap(), marker);
        });
    })
}