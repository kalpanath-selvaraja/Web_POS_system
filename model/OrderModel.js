import {Item_db, order_db} from "../db/database.js";
class Order {

    #order_id;
    #customer_name;
    #items;
    #total;
    #date;

    constructor(order_id, customer_name, items, total, date) {
        this.#order_id = order_id;
        this.#customer_name = customer_name;
        this.#items = items;
        this.#total = total;
        this.#date = date;

    }

    get order_id() {
        return this.#order_id;
    }


    get customer_name() {
        return this.#customer_name;
    }

    get items() {
        return this.#items;
    }
    get total() {
        return this.#total;
    }
    get date() {
        return this.#date;
    }

    set date(date) {
        this.#date = date;
    }

    set order_id(order_id) {
        this.#order_id = order_id;
    }

    set total(total) {
        this.#total = total;
    }


    set customer_name(customer_name) {
        this.#customer_name = customer_name;
    }

    set items(items) {
        this.#items = items;
    }



}

// get Orders
const getOrderData = () => {
    return order_db;
}

// add orders
const addOrder = (order_id , customer_name, items, total, date) => {
    let newOrder = new Order(order_id , customer_name, items, total, date);

    order_db.push(newOrder);
}

// recent orders
const getRecentOrders = () => {
    return order_db.slice(-5);
}
// Total orders
const getTotalOrders = () => {
    return order_db.length;
}

// revenue
const getTotalRevenue = () => {
    return order_db.reduce((sum, order) => sum + order.total, 0);
}

export {getOrderData,addOrder,getRecentOrders,getTotalOrders, getTotalRevenue}