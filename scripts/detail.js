const dateOne = document.getElementById("from-date");
const dateTwo = document.getElementById("to-date");

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
const total = document.getElementById("total-txt");

dateTwo.addEventListener("change", function(){
    const first = new Date(dateOne.value);
    const second = new Date(dateTwo.value);
    const diffTime = Math.abs(second - first);
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    total.value = "Rs " +parseInt(numOfAdult.value) * diffDay * 1000;
})

numOfAdult.addEventListener("change", function(){
    if (dateTwo.value!="") {
        const first = new Date(dateOne.value);
        const second = new Date(dateTwo.value);
        const diffTime = Math.abs(second - first);
        const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        total.value = "Rs " + parseInt(numOfAdult.value) * diffDay * 1000;
    }
})