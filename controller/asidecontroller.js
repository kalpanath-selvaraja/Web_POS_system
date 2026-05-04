import { loadOrderHistory } from "../controller/OrderHistoryController.js";
$(document).ready(function () {

    function showSection(sectionID){
        $('main section').hide();
        $('#'+ sectionID).show();
        $('main').scrollTop(0);
        window.scroll(0,0);
    }


    $('#hamburger_btn').on('click', function () {
            $('#sidebar').toggleClass('hidden');
            $('#navbar').toggleClass('expanded');
            $('.content').toggleClass('expanded');
    });

    $('#sidebar .nav-link').on('click', function () {
        if (window.innerWidth <= 767) {
            $('#sidebar').addClass('hidden');
            $('#navbar').addClass('expanded');
            $('.content').addClass('expanded');
        }
    });


    $("#nav_dashboard").click(function () {showSection("dashboard_section");});
    $("#nav_customers").click(function () {showSection("customers_section");});
    $("#nav_items").click(function () {console.log("clicked");showSection("items_section");});
    $("#nav_place_order").click(function () {console.log("clicked");showSection("placeOrder_section");});
    $("#nav_order_history").click(function () {
        console.log("clicked");
        showSection("order_history_section");
        loadOrderHistory();
    });




})