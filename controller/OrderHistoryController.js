import { getOrderData } from "../model/OrderModel.js";

export const loadOrderHistory = () => {

// empty the table
    $('#order_history_tbody').empty();

    let orders = getOrderData();


    orders.forEach((order) => {

        let itemNames = order.items.map(item => `${item.name} x${item.qty}`).join(', ');
        let row = `
        <tr>
            <td>${order.order_id}</td>
            <td>
                ${order.customer_name}
                <br>
                <small class="text-muted">${itemNames}</small>
            </td>
            <td>${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
        </tr>
        `;
        $('#order_history_tbody').append(row);
    });


    $(document).ready(function() {

        // Item Search
        $('#Order_search').on('keyup', function () {
            let order_search = $(this).val();

            if (order_search === "") {
                loadOrderHistory();
                return;
            }

            let order_db = getOrderData();

            $('#order_history_tbody').empty();

            order_db.forEach((order) => {
                if (order.order_id.includes(order_search)) {

                    let itemNames = order.items.map(item => `${item.name} x${item.qty}`).join(', ');

                    let row = `
                    <tr>
                        <td>${order.order_id}</td>
                        <td>
                            ${order.customer_name}
                            <br>
                            <small class="text-muted">${itemNames}</small>
                        </td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>${order.date}</td>
                    </tr>
                    `;

                    $('#order_history_tbody').append(row);
                }
            })
        })


    });
}