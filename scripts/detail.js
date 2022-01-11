var mainDiv = document.getElementById("main");
var loaderDiv = document.getElementById("loader");
mainDiv.style.display = "none";

//Logic for selecting date
const dateOne = document.getElementById("from-date");
const dateTwo = document.getElementById("to-date");
const bokkingName = document.getElementById("book-name");

const date = new Date();
const year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate();

if (month<10) {
    month = "0" + month;
}
if (day<10) {
    day = "0" + day;
}

dateOne.setAttribute("min", year+"-"+month+"-"+day);

dateOne.addEventListener("change", function() {
    dateTwo.value = "";
    dateTwo.setAttribute("min", dateOne.value);
})

const numOfAdult = document.getElementById("number-of-adult");
const totalText = document.getElementById("total-txt");

// Updating Booking Details
dateTwo.addEventListener("change", function(){
    const first = new Date(dateOne.value);
    const second = new Date(dateTwo.value);
    const diffTime = Math.abs(second - first);
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let total = parseInt(numOfAdult.value) * diffDay * 1000;
    totalText.value = "Rs " +total;

    let bokkingInfo = {
        "name": bokkingName.value,
        "adultNum": numOfAdult.value,
        "diffDay": diffDay,
        "total": total,
        "checkIn": dateOne.value,
        "checkOut": dateTwo.value,
    }

    sessionStorage.setItem("bookingInfo", JSON.stringify(bokkingInfo));
})

// Updating Booking Details
numOfAdult.addEventListener("change", function(){
    if (dateTwo.value!="") {
        const first = new Date(dateOne.value);
        const second = new Date(dateTwo.value);
        const diffTime = Math.abs(second - first);
        const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let total = parseInt(numOfAdult.value) * diffDay * 1000;
        totalText.value = "Rs " +total;

        let bokkingInfo = {
            "name": bokkingName.value,
            "adultNum": numOfAdult.value,
            "diffDay": diffDay,
            "total": total,
            "checkIn": dateOne.value,
            "checkOut": dateTwo.value,
        }
    
        sessionStorage.setItem("bookingInfo", JSON.stringify(bokkingInfo));
    }
})

// Updating Booking Details
bokkingName.addEventListener("change", function() {
    if (dateTwo.value!="") {
        const first = new Date(dateOne.value);
        const second = new Date(dateTwo.value);
        const diffTime = Math.abs(second - first);
        const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let total = parseInt(numOfAdult.value) * diffDay * 1000;
        totalText.value = "Rs " +total;

        let bokkingInfo = {
            "name": bokkingName.value,
            "adultNum": numOfAdult.value,
            "diffDay": diffDay,
            "total": total,
            "checkIn": dateOne.value,
            "checkOut": dateTwo.value,
        }
    
        sessionStorage.setItem("bookingInfo", JSON.stringify(bokkingInfo));
    }
})

// Function for Getting Photos for Carousel
function getPhotos() {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        let carouselContainer = document.getElementById("carousel-inner-div");
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);
            let carouselActive = false;
            for (let eachObj of responseObj.data){
                if (carouselActive==false) {
                    let imgUrl = eachObj.images.large.url;
                    let imgName = eachObj.locations["0"].name;
                    let newCarouselDiv = document.createElement("div");
                    newCarouselDiv.setAttribute("class", "carousel-item active");
                    let newTemplate = `
                        <img src=${imgUrl} height="450px" width="600px" alt="hotel-img" class="carousel-img">
                    `
                    newCarouselDiv.innerHTML = newTemplate;
                    carouselContainer.appendChild(newCarouselDiv);
                    carouselActive = true;
                }
                else {
                    let imgUrl = eachObj.images.large.url;
                    let imgName = eachObj.locations["0"].name;
                    let newDev = document.createElement("div");
                    newDev.setAttribute("class", "carousel-item");
                    let newTemplate = `
                        <img src=${imgUrl} height="350px" width="500px" alt="hotel-img" class="carousel-img">
                    `
                    newDev.innerHTML = newTemplate;
                    carouselContainer.appendChild(newDev);
                }
            }
        }
    });

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${sessionStorage.getItem("hotelLocationId")}&currency=USD&limit=50&lang=en_US`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

    xhr.send(data);
}

getPhotos();

// Function for Geting Hotel Details
function getHotelDetails() {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        let descriptionDiv = document.getElementById("hotel-description-div");
        if (this.readyState === this.DONE) {
            let responseObj = JSON.parse(this.responseText);

            let hotelInfo = {
                "name": responseObj.data["0"].name,
                "ranking": responseObj.data["0"].ranking,
                "address": responseObj.data["0"].address,
                "img": responseObj.data["0"].photo.images.large.url
            }

            sessionStorage.setItem("hotelInfo", JSON.stringify(hotelInfo));

            let newTemplate = `
                <div id="hotel-name">
                    <h2>${responseObj.data["0"].name}</h2>
                </div>
                
                <div id="hotel-rating">
                    <h4>RATING</h4>
                    <div id="star-rating"></div>
                </div>
                
                <div id="ammenities-div">
                    <h4>AMENITIES</h4>
                    <ul>
                        <div id="ammenities"></div>
                    </ul>
                </div>

                <div id="hotel-description">
                    <h4>DESCRIPTION</h4>
                    <p>${responseObj.data["0"].description}</p>
                </div>
            `

            descriptionDiv.innerHTML = newTemplate;

            let ammenityDiv = document.getElementById("ammenities");
            let count = 0;
            for (let each of responseObj.data["0"].amenities) {
                if (count<15) {
                    let listItem = document.createElement("li");
                    listItem.innerText = each.name;
                    ammenityDiv.appendChild(listItem);
                    count++;
                }
                else {
                    break;
                }
            }

            let starDiv = document.getElementById("star-rating");
            let rating = parseInt(responseObj.data["0"].rating);
            for(let i=0; i<rating; i++) {
                let spanElement = document.createElement("span");
                spanElement.setAttribute("class", "fa fa-star checked");
                starDiv.appendChild(spanElement);
            }

            let halfRating = parseFloat(responseObj.data["0"].rating) - Math.floor(parseFloat(responseObj.data["0"].rating));
            if(halfRating==0.5) {
                let spanElement = document.createElement("span");
                spanElement.setAttribute("class", "fa fa-star-half-o half-checked");
                starDiv.appendChild(spanElement);
            }

            mainDiv.style.display = "block";
            loaderDiv.style.display = "none";
        }
    });

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${sessionStorage.getItem("hotelLocationId")}&lang=en_US&currency=USD`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "8ca7cfcc67mshcb3511c85796d63p121d36jsne067af62957a");

    xhr.send(data);
}

getHotelDetails();
