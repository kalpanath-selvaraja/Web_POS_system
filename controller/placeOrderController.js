import {getCustomerData} from "../model/CustomerModel.js";
import {addItem, getItemData,updateItem} from "../model/ItemModel.js";
import {getOrderData, addOrder}  from "../model/OrderModel.js";
import {customer_db} from "../db/database";

$(document).ready(function () {

    // current customer selected
    let selectedCustomer = null;

    // customer seearch
    $('#order_customer_search').on('keyup', function () {

        let search = $(this).val().toLowerCase();

        $('#customer_results').empty();

        if (search === "") {
            return;
        }

        let customers = getCustomerData();

        customers.forEach((customer, index) => {

            if (customer.phone.toLowerCase().includes(search)) {

                let item = `
                <button 
                      class="list-group-item list-group-item-action customer-select"
                      data-index="${index}">
                      ${customer.name} - ${customer.phone}
                </button>
                `;

                $('#customer_results').append(item);

            }

        });




    })

    // customer select
    $(document).on('click', '.customer-select', function () {



        let index =$(this).data('index');

        let customer = getCustomerData()[index];

        selectedCustomer = customer.name;

        $('#order_customer_search').val(customer.name);

        $('#customer_results').empty();

        updateSummaryUI();
    })

    // item search
    $('#order_item_search').on('keyup', function () {

        let search = $(this).val().toLowerCase();

        $('#item_results').empty();

        if (search === "") {
            return;
        }

        let items = getItemData();

        items.forEach((item, index) => {

            if (item.name.toLowerCase().includes(search)) {

                let row = `
                <button 
                      class="list-group-item list-group-item-action item-select"
                      data-index="${index}">
                      ${item.name} - ${item.id}
                </button>
                `;

                $('#item_results').append(row);
            }

        })


    })

// item select
    $(document).on('click', '.item-select', function () {
        let index = $(this).data('index');

        let item = getItemData()[index];

        $('#order_item_search').val(item.name +" - "+ item.id);

        $('#item_results').empty();
    })



})