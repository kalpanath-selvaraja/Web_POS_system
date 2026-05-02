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
            showApp();

            console.log(USERS[username]);
        }else {
            alert("Invalid username or password");
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