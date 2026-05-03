import {customer_db} from "../db/database.js";

$(document).ready(function () {

    function updateStats() {
        $("#stat_customers").text(customer_db.length);
        console.log(customer_db.length);
    }

    const loadTable = () => {

        $('#dashboard_table_body').empty();

        customer_db.forEach((item , index) => {
            let new_row =
                `<tr data-index="${index}"> 
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.phone}</td>
                    <td>${item.address}</td>
                    <td class="text-end">
                    <button class="btn btn-outline-primary">Edit</button>
                    <button class="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
                    `;



            $('#dashboard_tbody').append(new_row);
        })
    }

    function greetings() {
        $('#greetings').text(sessionStorage.getItem("username"));
    }



    greetings();
    updateStats();
    loadTable();



});