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

// add btn click
    $('#item_add_btn').on('click', function () {




         let Item_name =  $('#order_item_search').val();
         $('#order_item_search').val('');

         let code = Item_name.split(" - ");
         let id = code[1];



         if (id === "") {
             alert("Please select an item first");
             return;
         }

         let exits = $(` #Order_tbody tr[data-id="${id}"]`);

         if (exits.length > 0) {
             let qtySpan = exits.find('span');
             let qty = parseInt(qtySpan.text());

             console.log(qty);
             qtySpan.text(qty + 1);
             updateSummaryUI();

             return;
         }



         let item_db = getItemData();



        item_db.forEach((item, index) => {
            if (item.id === id){


                let row = `
                    <tr data-index="${index}" data-id="${item.id}">
                    
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                    
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-outline-secondary btn-minus">-</button>
                                <span class="fw-bold qty">1</span>
                                <button class="btn btn-sm btn-outline-secondary btn-plus">+</button>
                            </div>
                        </td>
                    
                        <td>${item.category}</td>
                    
                        <td class="text-end">
                            <button class="btn btn-sm btn-danger btn-remove">Cancel</button>
                        </td>
                    
                    </tr>
                    `;

                $('#Order_tbody').append(row);

                calculateTotals();

                 updateSummaryUI();

            }
        })

    });


    // add btn in row
    $(document).on('click', '.btn-plus', function () {
        let row = $(this).closest('tr');

        let qtySpan = row.find('.qty');
        let qty = parseInt(qtySpan.text());

        qtySpan.text(qty + 1);
        calculateTotals()
        updateSummaryUI();

    });

    // add minus in row

    $(document).on('click', '.btn-minus', function () {

        let row = $(this).closest('tr');

        let qtySpan = row.find('.qty');
        let qty = parseInt(qtySpan.text());

        if (qty > 1 ){
            qtySpan.text(qty - 1);
            calculateTotals();
            updateSummaryUI();
        }

    });


// claculate Totals
    function calculateTotals() {

        let totalItems = 0;
        let totalPrice = 0;

        $('#Order_tbody tr').each(function () {

            let row = $(this);

            let price = parseFloat(row.find('td:nth-child(3)').text());
            let qty = parseInt(row.find('.qty').text());

            totalItems += qty;
            totalPrice += price * qty;
        });

        $('#total_items').text(totalItems);
        $('#total_price').text(totalPrice.toFixed(2));
    }

    /// clear carts
    $('#clear_cart').on('click', function () {


        $('#order_customer_search').val('');
        $('#order_item_search').val('');
        $('#Order_tbody').empty();
        $('#total_items').text('0');
        $('#total_price').text('0.00');
        $('#items_description').empty();

        selectedCustomer = null;
        updateSummaryUI();

    });

})