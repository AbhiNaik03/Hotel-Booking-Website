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