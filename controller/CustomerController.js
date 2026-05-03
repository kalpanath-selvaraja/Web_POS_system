import { getCustomerDataById, addCustomerData,getCustomerData,updateCustomerData,deleteCustomerData} from '../model/CustomerModel.js';

$(document).ready(function () {

    // to identify the current requirement
    let customerUpdate = false;

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
            Swal.fire({ icon: "error", title: "Invalid ID!" });
            return;
        }

        if (name === "") {
            Swal.fire({ icon: "error", title: "Name is required!" });
            return;
        }

        if (phone === "") {
            Swal.fire({ icon: "error", title: "Phone is required!" });
            return;
        }

        if (mail === "") {
            Swal.fire({ icon: "error", title: "Email is required!" });
            return;
        }

        if (address === "") {
            Swal.fire({ icon: "error", title: "Address is required!" });
            return;
        }


        if (!customerUpdate){


            if (getCustomerDataById(id)) {
                Swal.fire({ icon: "error", title: "ID already exists!" });
                return;
            }

            addCustomerData(id, name, phone, mail, address);

            Swal.fire({
                icon: "success",
                title: "Customer Saved Successfully!"
            });
        }else{
            updateCustomerData(id, name, phone, mail, address);

            Swal.fire({ icon: "success", title: "Customer Updated Successfully!" });

            customerUpdate = false;
        }


        loadCustomerData();

        let modalEl = document.getElementById('customer_modal');
        let modal = bootstrap.Modal.getInstance(modalEl);

        if (modal) {
            modal.hide();
        }

    });

    // loadCustomerTable
    const loadCustomerData = () => {
        $('#customer_tbody').empty();

        let customer_db = getCustomerData();
        customer_db.forEach((customer, index) => {
            let new_row =
                `<tr data-index="${index}"> 
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
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

    // customer view Action button
    $(document).on('click', '.btn-customer-view', function () {
        let index = $(this).closest('tr').data('index');

        let customer_db = getCustomerData();

        let customer = customer_db[index];


        $('#view_id').text(customer.id);
        $('#view_name').text(customer.name);
        $('#view_phone').text(customer.phone);
        $('#view_mail').text(customer.mail);
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
        $('#customer_mail_input').val(customer.mail);
        $('#customer_address_input').val(customer.address);

        $('#customer_id_input').prop('readonly', true);

        let modal = new bootstrap.Modal(document.getElementById('customer_modal'));
        modal.show();

    });

    $(document).on('click', '.btn-customer-delete', function () {
        let index = $(this).closest('tr').data('index');
        let customer = getCustomerData()[index];

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

                deleteCustomerData(customer.id);
                loadCustomerData();

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });


    })

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
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
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



    loadCustomerData();


});