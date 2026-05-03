import {customer_db} from '../db/database.js';

class Customer{
    #customer_id;
    #customer_name;
    #customer_phone;
    #customer_email;
    #customer_address;

    constructor(id, name,phone, email, address) {
        this.#customer_id = id;
        this.#customer_name = name;
        this.#customer_phone = phone;
        this.#customer_email = email;
        this.#customer_address = address;
    }

    get id() {
        return this.#customer_id;
    }
    get name() {
        return this.#customer_name;
    }
    get phone() {
        return this.#customer_phone;
    }
    get email() {
        return this.#customer_email;
    }
    get address() {
        return this.#customer_address;
    }

    set id(id) {
        this.#customer_id = id;
    }
    set name(name) {
        this.#customer_name = name;
    }
    set phone(phone) {

        this.#customer_phone = phone;
    }
    set email(email) {
        this.#customer_email = email;
    }
    set address(address) {
        this.#customer_address = address;
    }


}

const getCustomerDataById = (id) => {
    return customer_db.find(item => item.id==id);
}

const addCustomerData = (id, name, phone, mail, address) => {
    let new_Customer = new Customer(id, name, phone, mail, address);
    customer_db.push(new_Customer);
}

const updateCustomerData = (id, name, phone, mail, address) => {
    let obj = customer_db.find(item => item.id==id);

    if (obj) {
        obj.name = name;
        obj.phone = phone;
        obj.mail = mail;
        obj.address = address;
    }

}

const getCustomerData = () => {
    return customer_db;
}

const deleteCustomerData = (id) => {
    let index = customer_db.findIndex(item => item.id==id);

    if (index !== -1) {
        customer_db.splice(index, 1);
    }
}

export {getCustomerDataById, addCustomerData , getCustomerData,updateCustomerData , deleteCustomerData};