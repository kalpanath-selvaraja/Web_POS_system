import { getCustomerDataById, addCustomerData,getCustomerData,updateCustomerData,deleteCustomerData} from '../model/CustomerModel.js';
import{check_phone,check_email} from '../utils/regex.js'
import{showAlert} from '../utils/alerts.js'
$(document).ready(function () {

    // to identify the current requirement
    let customerUpdate = false;


    // loadCustomerTable
    const loadCustomerData = () => {
        $('#customer_tbody').empty();

        let customer_db = getCustomerData();
        customer_db.forEach((customer, index) => {
            let new_row =
                `<tr data-index="${index}"> 
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.email}</td>
                    <td>${customer.address}</td>
                    <td class="text-end">
                    <button class="btn btn-outline-primary btn-customer-view">View</button>
                    <button class="btn btn-outline-warning btn-customer-update">Update</button>
                    <button class="btn btn-outline-danger btn-customer-delete">Delete</button>
                    </td>
                </tr>`;

            $('#customer_tbody').append(new_row);

        })
    }

    // reset form
    function resetCustomerForm() {

        $('#customerForm')[0].reset();

        $('#customer_id_input').prop('readonly', false);

        customerUpdate = false;
    }

    // Save and update Customer
    $('#customer_btn_save').on('click', function () {

        $('#customer_id_input').prop('readonly', false);

        let id = $('#customer_id_input').val();
        let name = $('#customer_name_input').val();
        let phone = $('#customer_contact_input').val();
        let mail = $('#customer_mail_input').val();
        let address = $('#customer_address_input').val();

        document.activeElement.blur();

        if (id === "") {
            showAlert("ID is required!", "danger");
            return;
        }

        if (name === "") {
            showAlert("Name is required!", "danger");
            return;
        }

        if (!check_phone(phone)) {
            showAlert("Contact number is invalid!", "danger");
            return;
        }

        if (!check_email(mail)) {
            showAlert("Email is invalid!", "danger");
            console.log(mail)
            return;
        }

        if (address === "") {
            showAlert("Address is required!", "danger");
            return;
        }


        if (!customerUpdate){


            if (getCustomerDataById(id)) {
                showAlert("ID already exists!", "danger");
                return;
            }

            addCustomerData(id, name, phone, mail, address);
            $('#customerForm')[0].reset();
            showAlert("Customer saved successfully!", "success");
        }else{
            updateCustomerData(id, name, phone, mail, address);
            $('#customerForm')[0].reset();
            customerUpdate = false;
            showAlert("Customer updated successfully!", "success");
        }


        loadCustomerData();

        let modalEl = document.getElementById('customer_modal');
        let modal = bootstrap.Modal.getInstance(modalEl);

        if (modal) {
            modal.hide();
        }

    });

    // cancel btn
    $('#customer_btn_cancel').on('click', function () {
        resetCustomerForm();
    })

    // customer view Action button
    $(document).on('click', '.btn-customer-view', function () {
        let index = $(this).closest('tr').data('index');

        let customer_db = getCustomerData();

        let customer = customer_db[index];


        $('#view_id').text(customer.id);
        $('#view_name').text(customer.name);
        $('#view_phone').text(customer.phone);
        $('#view_mail').text(customer.email);
        $('#view_address').text(customer.address);

        let modal = new bootstrap.Modal(document.getElementById('customer_view_modal'));
        modal.show();

    });

    // customer update Action button
    $(document).on('click', '.btn-customer-update', function () {
        let index = $(this).closest('tr').data('index');

        let customer_db = getCustomerData();

        let customer = customer_db[index];

        customerUpdate = true;

        $('#customer_id_input').val(customer.id);
        $('#customer_name_input').val(customer.name);
        $('#customer_contact_input').val(customer.phone);
        $('#customer_mail_input').val(customer.email);
        $('#customer_address_input').val(customer.address);

        $('#customer_id_input').prop('readonly', true);

        let modal = new bootstrap.Modal(document.getElementById('customer_modal'));
        modal.show();

    });

    // delete Customer
    $(document).on('click', '.btn-customer-delete', function () {
        let index = $(this).closest('tr').data('index');
        let customer = getCustomerData()[index];

        if (window.confirm(`Are you sure you want to delete "${customer.name}"?`)) {
            deleteCustomerData(customer.id);
            loadCustomerData();
            showAlert("Customer deleted successfully.", "success");
        }


    });

    // customer Search
    $('#customer_search').on('keyup', function () {
        let phone = $(this).val().toLowerCase();

        if (phone === "") {
            loadCustomerData();
            return;
        }

        let customer_db = getCustomerData();

        $('#customer_tbody').empty();

        customer_db.forEach((customer, index) => {
            if (customer.phone.toLowerCase().includes(phone)) {
                let row =
                    `<tr data-index="${index}"> 
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.email}</td>
                        <td>${customer.address}</td>
                        <td class="text-end">
                        <button class="btn btn-outline-primary btn-customer-view">View</button>
                        <button class="btn btn-outline-warning btn-customer-update">Update</button>
                        <button class="btn btn-outline-danger btn-customer-delete">Delete</button>
                        </td>
                    </tr>`;

                $('#customer_tbody').append(row);
            }
        })
    })

    // when exiting the form without using the cancel btn this will reset the data
    $('#customer_modal').on('hidden.bs.modal', function () {
        resetCustomerForm();
    })

    loadCustomerData();


});