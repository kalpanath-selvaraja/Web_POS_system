$(document).ready(function () {

    function showSection(sectionID){
        $('main section').hide();
        $('#'+ sectionID).show();
    }

    $("#nav_dashboard").click(function () {showSection("dashboard_section");});
    $("#nav_customers").click(function () {showSection("customers_section");});
    $("#nav_items").click(function () {console.log("clicked");showSection("items_section");});




})