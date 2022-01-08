function showHotelInfo() {
    let hotelDiv = document.getElementById("hotel-info");
    let hotelInfoObj = JSON.parse(sessionStorage.getItem("hotelInfo"));
    console.log(hotelInfoObj);

    let newTemplate = `
        <div id="img-div">
            <img src=${hotelInfoObj.img} alt="hotel-img" id="hotel-img">
        </div>

        <div id="info-div">
            <h2>${hotelInfoObj.name}</h2>

            <p>${hotelInfoObj.ranking}</p>
            <p>${hotelInfoObj.address}</p>
        </div>
    `
    hotelDiv.innerHTML = newTemplate;
}

showHotelInfo();

function showBookingInfo() {
    let customerDiv = document.getElementById("customer-div");
    let bookingInfoObj = JSON.parse(sessionStorage.getItem("bookingInfo"));
    console.log(bookingInfoObj);

    let newTemplate = `
        <div id="customer-info">
            <b>Name:</b> ${bookingInfoObj.name} <br><br>
            <b>Number of Adults:</b> ${bookingInfoObj.adultNum}<br> <br>

            <b>Check in Date:</b> ${bookingInfoObj.checkIn}<br> <br>
            <b>Check out Date:</b> ${bookingInfoObj.checkOut}<br> <br>
        </div>


        <div id="tariff">
            <b>Tariff Breakdown:</b> Rs 1000 X ${bookingInfoObj.adultNum} Adults X ${bookingInfoObj.diffDay} Nights<br> <br>
            <b>Total Amount:</b> Rs ${bookingInfoObj.total}<br>
        </div>

        <div id="payment-link-div">
            <button type="button" class="btn btn-outline-success" id="pay-button">Pay Now</button>
        </div>
    `

    customerDiv.innerHTML = newTemplate;
}
showBookingInfo();

const payButton = document.getElementById("pay-button");

function check() {
    if(sessionStorage.getItem("buttonName")=="LOGOUT"){
        payButton.disabled = false;
    }
    else {
        payButton.disabled = true;
    }
};
check();

payButton.onclick = function(){
    window.alert("Hi your booking is successful");
}