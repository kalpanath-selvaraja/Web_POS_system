$(document).ready(function () {


    const USERS = {
        admin: "1234"
    };


    function showLogin() {
        $('#navbar').hide();
        $('#sidebar').hide();
        $('#dashboard_section').hide();
        $('#login').show();
    }

    function showApp() {
        $('#login').hide();
        $('#dashboard_section').show();
        $('#navbar').show();
        $('#sidebar').show();
    }

    function login() {

        const username = $('#username').val();
        const password = $('#password').val();

        console.log("savdbsfn");

        if (USERS[username] && USERS[username] === password) {

            // save session
            sessionStorage.setItem("username", username);

            // switch UI
            Swal.fire({
                title: "Login Successful!",
                text: "Welcome back " + username,
                icon: "success",
                confirmButtonText: "Continue"
            }).then(() => {


                // redirect or show dashboard
                showApp();
            });


            console.log(USERS[username]);
        }else {
            Swal.fire({
                title: "Login Failed!",
                text: "Invalid username or password",
                icon: "error",
            })
        }

    }

    function logout() {
        sessionStorage.removeItem("username");
        showLogin();

    }

    function isLoggedIn() {
        return sessionStorage.getItem("username") !== null;
    }

    function initiate(){
        if (isLoggedIn()){
            showApp();
        }else {
            showLogin();
        }

    }

    $('#btn_login').on('click', login);
    $('#logout-btn').on('click', logout);

    initiate();
})