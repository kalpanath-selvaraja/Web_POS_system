import { loadOrderHistory } from "../controller/OrderHistoryController.js";
import {loadItemData} from "../controller/itemsController.js";

import { loadDashboard } from "../controller/DashboardController.js";


$(document).ready(function () {



    if (window.innerWidth <= 767) {
        $('#sidebar').addClass('hidden');
        $('#navbar').addClass('expanded');
        $('.content').addClass('expanded');
    }

    //  which sectionn to show when clicked on
    function showSection(sectionID){
        $('main section').hide();
        $('#'+ sectionID).show();

    }


    // hamburger btn
    $('#hamburger_btn').on('click', function () {
            $('#sidebar').toggleClass('hidden');
            $('#navbar').toggleClass('expanded');
            $('.content').toggleClass('expanded');
    });

    // hid the nav bar on mobile
    $('#sidebar .nav-link').on('click', function () {
        if (window.innerWidth <= 767) {
            $('#sidebar').addClass('hidden');
            $('#navbar').addClass('expanded');
            $('.content').addClass('expanded');
        }
    });

// navigation fuction
    $("#nav_dashboard").click(function () {
        showSection("dashboard_section");
        loadDashboard();
    });


    $("#nav_customers").click(function () {showSection("customers_section");});
    $("#nav_items").click(function () {
        showSection("items_section");
        loadItemData();
    });

    $("#nav_place_order").click(function () {
        showSection("placeOrder_section");
    });

    $("#nav_order_history").click(function () {
        ;
        showSection("order_history_section");
        loadOrderHistory();
    });




})