
import{getItemData,deleteItem,getItemDataById,addItem,updateItem} from '../model/ItemModel.js'


$(document).ready(function(){

    // to identify the current requirement
    let itemUpdate = false;

// loadItemTable
    const loadItemData = () => {
        $('#items_tbody').empty();

        console.log("Items loaded");

        let item_db = getItemData();

        console.log(item_db);

        item_db.forEach((item, index) => {

            console.log(item.id);
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

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteItem(item.id);
                loadItemData();

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });


    });


    // Save and update Item
    $('#items_btn_save').on('click', function () {

        console.log("save");

        $('#item_id_input').prop('readonly', false);

        let id = $('#item_id_input').val();
        let name = $('#item_name_input').val();
        let price = $('#item_price_input').val();
        let qty = $('#item_QTY_input').val();
        let category = $('#item_categories_input').val();

        document.activeElement.blur();

        if (id === "") {
            Swal.fire({ icon: "error", title: "Invalid ID!" });
            return;
        }

        if (name === "") {
            Swal.fire({ icon: "error", title: "Name is required!" });
            return;
        }

        if (price === "") {
            Swal.fire({ icon: "error", title: "Price is Invalid!" });
            return;
        }

        if (qty === "") {
            Swal.fire({ icon: "error", title: "Quantity is Invalid!" });
            return;
        }

        if (category === "") {
            Swal.fire({ icon: "error", title: "Category is required!" });
            return;
        }


        if (!itemUpdate){


            if (getItemDataById(id)) {
                Swal.fire({ icon: "error", title: "ID already exists!" });
                return;
            }

            console.log(id, name, price, qty, category);
            addItem(id, name, price, qty, category);
            $('#customerForm')[0].reset();
            Swal.fire({
                icon: "success",
                title: "Customer Saved Successfully!"
            });

        }else{
            updateItem(id, name, price, qty, category);

            Swal.fire({ icon: "success", title: "Customer Updated Successfully!" });
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
})