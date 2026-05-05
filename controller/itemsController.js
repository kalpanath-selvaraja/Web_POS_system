
import{getItemData,deleteItem,getItemDataById,addItem,updateItem} from '../model/ItemModel.js'
import{showAlert} from '../utils/alerts.js';
// loadItemTable
export const loadItemData = () => {
    $('#items_tbody').empty();


    let item_db = getItemData();



    item_db.forEach((item, index) => {


        let new_row =
            `<tr data-index="${index}"> 
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.qty}</td>
                    <td>${item.category}</td>
                    <td class="text-end">
                    <button class="btn btn-outline-primary btn-item-view">View</button>
                    <button class="btn btn-outline-warning btn-item-update">Update</button>
                    <button class="btn btn-outline-danger btn-item-delete">Delete</button>
                    </td>
                </tr>`;

        $('#items_tbody').append(new_row);

    })
}

$(document).ready(function(){

    // to identify the current requirement
    let itemUpdate = false;



    // reset form
    function resetCustomerForm() {

        $('#itemsForm')[0].reset();

        $('#item_id_input').prop('readonly', false);

        itemUpdate = false;
    }

    // view btn
    $(document).on('click', '.btn-item-view', function () {
        let index = $(this).closest('tr').data('index');

        let item = getItemData()[index];


        $('#items_view_id').text(item.id);
        $('#items_view_name').text(item.name);
        $('#items_view_price').text(item.price);
        $('#items_view_qty').text(item.qty);
        $('#items_view_category').text(item.category);

        let modal = new bootstrap.Modal(document.getElementById('items_view_modal'));
        modal.show();

    });

    // customer Item Action button
    $(document).on('click', '.btn-item-update', function () {
        let index = $(this).closest('tr').data('index');

        let item = getItemData()[index];

        itemUpdate = true;

        $('#item_id_input').val(item.id);
        $('#item_name_input').val(item.name);
        $('#item_price_input').val(item.price);
        $('#item_QTY_input').val(item.qty);
        $('#item_categories_input').val(item.category);

        $('#item_id_input').prop('readonly', true);

        let modal = new bootstrap.Modal(document.getElementById('items_modal'));
        modal.show();

    });

    // delete Item
    $(document).on('click', '.btn-item-delete', function () {
        let index = $(this).closest('tr').data('index');
        let item = getItemData()[index];

        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
            deleteItem(item.id);
            loadItemData();
            showAlert("Item deleted successfully.", "success");
        }


    });


    // Save and update Item
    $('#items_btn_save').on('click', function () {



        $('#item_id_input').prop('readonly', false);

        let id = $('#item_id_input').val();
        let name = $('#item_name_input').val();
        let price = $('#item_price_input').val();
        let qty = $('#item_QTY_input').val();
        let category = $('#item_categories_input').val();

        document.activeElement.blur();

        if (id === "") {
            showAlert("ID is required!", "danger");
            return;
        }

        if (name === "") {
            showAlert("Name is required!", "danger");;
            return;
        }

        if (price === "") {
            showAlert("price is required!", "danger");
            return;
        }

        if (qty === "") {
            showAlert("quantity is required!", "danger");
            return;
        }

        if (category === "") {
            showAlert("Category is required!", "danger");
            return;
        }


        if (!itemUpdate){


            if (getItemDataById(id)) {
                showAlert("ID already exists!", "danger");
                return;
            }

            addItem(id, name, price, qty, category);
            showAlert("Item saved successfully!", "success");
            $('#customerForm')[0].reset();


        }else{
            updateItem(id, name, price, qty, category);

            showAlert("Item updated successfully!", "success");
            $('#itemsForm')[0].reset();
            itemUpdate = false;
        }


        loadItemData();

        let modalEl = document.getElementById('items_modal');
        let modal = bootstrap.Modal.getInstance(modalEl);

        if (modal) {
            modal.hide();
        }

    });

    // Item Search
    $('#items_search').on('keyup', function () {
        let name = $(this).val().toLowerCase();

        if (name === "") {
            loadItemData();
            return;
        }

        let item_db = getItemData();

        $('#items_tbody').empty();

        item_db.forEach((item, index) => {
            if (item.name.toLowerCase().includes(name)) {
                let row =
                    `<tr data-index="${index}"> 
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.qty}</td>
                        <td>${item.category}</td>
                        <td class="text-end">
                        <button class="btn btn-outline-primary btn-item-view">View</button>
                        <button class="btn btn-outline-warning btn-item-update">Update</button>
                        <button class="btn btn-outline-danger btn-item-delete">Delete</button>
                        </td>
                    </tr>`;

                $('#items_tbody').append(row);
            }
        })
    })

    // when exiting the form without using the cancel btn this will reset the data
    $('#items_modal').on('hidden.bs.modal', function () {
        resetCustomerForm();
    })

    loadItemData();
});