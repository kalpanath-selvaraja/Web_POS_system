$(document).ready(function () {


/// the predifined users of the application
    const USERS = {
        Kalpanath: "1234"
    };

// show the login page only
    function showLogin() {
        $('#navbar').hide();
        $('#sidebar').hide();
        $('#dashboard_section').hide();
        $('#login').show();
    }

    // show the App page only hide login
    function showApp() {
        $('#login').hide();
        $('#dashboard_section').show();
        $('#navbar').show();
        $('#sidebar').show();
    }

    // Authentication
    function login() {

        const username = $('#username').val();
        const password = $('#password').val();



        if (USERS[username] && USERS[username] === password) {

            // save session
            sessionStorage.setItem("username", username);
            $('#greetings').text("Welcome Back, " + username);

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

        }else {
            Swal.fire({
                title: "Login Failed!",
                text: "Invalid username or password",
                icon: "error",
            })
        }

    }

    // logout feature
    function logout() {
        sessionStorage.removeItem("username");
        showLogin();

    }

    // check if is a user loaged in
    function isLoggedIn() {
        return sessionStorage.getItem("username") !== null;
    }

    // what to load , login or App
    function initiate(){
        if (isLoggedIn()){
            showApp();
        }else {
            showLogin();
        }

    }

    // btn
    $('#btn_login').on('click', login);
    $('#logout-btn').on('click', logout);

    initiate();
})