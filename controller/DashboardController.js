import {customer_db} from "../db/database.js";

$(document).ready(function () {

    function updateStats() {
        $("#stat_customers").text(customer_db.length);
        console.log($("#stat_customers").length);
    }

    const loadTable = () => {

        $('#dashboard_table_body').empty();

        customer_db.map((item , index) => {
            let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.phone}</td> <td>${item.email}</td> <td>${item.status}</td> </tr>`;
            $('#customer_table').append(new_row);
        })
    }

    function greetings() {
        $('#greetings').text(sessionStorage.getItem("username"));
    }



    greetings();
    updateStats();
    loadTable();

});