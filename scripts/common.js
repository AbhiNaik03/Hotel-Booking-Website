let headerTemplate = `
<header>
    <div id="logo-div">
        <a href="index.html" id="logo-img-anchor">
            <img src="assests/images/logo.png" alt="logo" id="logo-img">
        </a>
    </div>
    
    <div id="login-div">
        <button type="button" class="btn btn-light btn-sm" data-toggle="modal" data-target="#loginModal" id="login-button">
            LOGIN
        </button>
    </div>
</header>

<!-- Bootstrap Modal Section for Login -->
<div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Please Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
                <form id="login-form">
                    <div class="form-group row">
                        <div class="col">
                            <label for="loginInputUsername">Username: </label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" id="loginInputEmail" aria-describedby="userHelp" placeholder="Enter Username">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <label for="loginInputPassword">Password</label>
                        </div>
                        <div class="col">
                            <input type="password" class="form-control" id="loginInputPassword" aria-describedby="passwordHelp" placeholder="Password">
                        </div>
                    </div>
                    
                </form>
        </div>
        <div class="modal-footer">
            <div class="row">
                <div class="col text-left">
                    <button type="login" class="btn btn-primary" form="login-form">Login</button>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
`

document.getElementById("header-main").innerHTML = headerTemplate;


let footerTemplate = `
<footer>
        <!-- Contacts Section -->
        <div id="contact-div">
            <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#contactModal" id="contact-button">
                Contact Us
            </button>
        </div>

        <!-- Copyright section -->
        <div id="copyright-div">
            <p id="copyright-para">&#9400; 2021 ROOM SEARCH PVT. LTD.</p>
        </div>

        <!-- Social Medial links Section -->
        <div id="social-div">
            <a href="https://www.facebook.com" target="_blank" class="social-link">
                <img src="assests/images/facebook.png" alt="facebook" class="social-media-image">
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-link">
                <img src="assests/images/instagram.png" alt="instagram" class="social-media-image">
            </a>
            <a href="https://twitter.com" target="_blank" class="social-link">
                <img src="assests/images/twitter.png" alt="twitter" class="social-media-image">
            </a>
        </div>
    </footer>

    <!-- Boostrap Modal for Contact -->
    <div class="modal" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="contactLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="contactModalLabel">Get in touch</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <form>
                        <p>Thank you for reaching out!!!</p>
                        <p>Please enter your email and we will get back to you.</p>
                        <div class="form-group" id="contact-form">
                            <div class="row">
                                <div class="col">
                                    <label for="contactInputEmail">Email: </label>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" id="contactInputEmail" aria-describedby="emailHelp" placeholder="Enter Username" required>
                                </div>
                            </div>
                        </div>
                    </form>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col text-left">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>  

</div>
`

document.getElementById("footer-main").innerHTML = footerTemplate;

// Login and logout logic
const username = document.getElementById("loginInputEmail");
const password = document.getElementById("loginInputPassword");
const form = document.getElementById("login-form");
let formButton = document.getElementById("login-button");

if (sessionStorage.getItem("buttonName") == null) {
    formButton.innerText = "LOGIN";
}
else {
    formButton.innerText = sessionStorage.getItem("buttonName");
}

localStorage.setItem("username", "admin");
localStorage.setItem("password", "admin");

formButton.onclick = function() {
    if (formButton.innerText == "LOGIN") {
        formButton.setAttribute("data-target", "#loginModal")
        form.addEventListener("submit", function() {
            if (username.value == localStorage.getItem("username") && password.value == localStorage.getItem("password")){
                location.reload();
                sessionStorage.setItem("buttonName", "LOGOUT");
                window.alert("Successfully loged in!");
            }
            else {
                window.alert("Login Unsuccessful! Please enter correct credentials");
            }
        })
    }
    else if (formButton.innerText == "LOGOUT") {
        formButton.setAttribute("data-target", "")
        location.reload();
        sessionStorage.setItem("buttonName", "LOGIN");
        window.alert("Logged out");
    }
}