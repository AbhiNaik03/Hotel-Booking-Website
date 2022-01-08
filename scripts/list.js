function findCity(callback) {
    console.log(sessionStorage.getItem("cityName"));

    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);
            let cityLocationId = responseObj.data.Typeahead_autocomplete.results["0"].detailsV2.locationId;
            sessionStorage.setItem("cityLocationId", cityLocationId);
            // console.log(locationId);
            getHotels();
        }
    });

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${sessionStorage.getItem("cityName")}&lang=en_US&units=km`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "50db210f90mshbb3a5d69dea44f5p1558c7jsndbd8c6033fb4");

    xhr.send(data);

}

findCity();

function getHotels() {
    // console.log(sessionStorage.getItem("locationId"));
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);
            // console.log(responseObj);
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

                    // console.log(eachObj.address);
                    // console.log(eachObj.name);
                    // console.log(eachObj.rating);
                    // console.log(eachObj.photo.images.large.url);
                    // console.log(eachObj.location_id);
                }
            }
            let hotelLinkBtn = document.getElementsByClassName("hotel-link");
            console.log(hotelLinkBtn);
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
    xhr.setRequestHeader("x-rapidapi-key", "50db210f90mshbb3a5d69dea44f5p1558c7jsndbd8c6033fb4");

    xhr.send(data);
}

