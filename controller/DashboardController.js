import {customer_db} from "../db/database.js";
import {getOrderData, getRecentOrders, getTotalOrders, getTotalRevenue} from "../model/OrderModel.js";

// update the dashbord details
function updateStats() {
    $("#stat_customers").text(customer_db.length);
    $("#stat_total_orders").text(getTotalOrders());
    $("#stat_revenue").text(getTotalRevenue().toFixed(2));


}

// loard dahbord
const loadTable = () => {
    $('#dashboard_tbody').empty();

    getRecentOrders().forEach((order, index) => {
        let row = `
        <tr data-index="${index}">
            <td>${order.order_id}</td>
            <td>${order.customer_name}</td>
            <td>${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
        </tr>
        `;
        $('#dashboard_tbody').append(row);
    });
}


$(document).ready(function () {

    // greetings
    function greetings() {
        $('#greetings').text("Welcome Back, " + sessionStorage.getItem("username"));
    }


    greetings();
    updateStats();
    loadTable();

});

updateStats();


// load the dashdoard content at start , must be used when login so it must be exported
export const loadDashboard = () => {
    updateStats();
    loadTable();
}