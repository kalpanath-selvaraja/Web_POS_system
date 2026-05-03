
import{getItemData,deleteItem,getItemDataById,addItem,updateItem} from '../model/ItemModel.js'
import{check_phone,check_email} from '../utils/regex.js'

$(document).ready(function(){



// loadItemTable
    const loadItemData = () => {
        $('#items_tbody').empty();

        let item_db = getItemData();

        console.log(item_db);

        item_db.forEach((item, index) => {

            console.log(item.id);
            let new_row =
                `<tr data-index="${index}"> 
                    <td>${item.item_id}</td>
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



    loadItemData();
})