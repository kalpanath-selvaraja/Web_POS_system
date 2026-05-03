
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


    loadItemData();
})