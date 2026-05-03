import {Item_db} from "../db/database.js";

class Item{

    #item_id;
    #item_name;
    #item_price;
    #item_quantity;
    #item_category;

    constructor(item_id, item_name, item_price, item_quantity, item_category) {

        this.#item_id = item_id;
        this.#item_name = item_name;
        this.#item_price = item_price;
        this.#item_quantity = item_quantity;
        this.#item_category = item_category;
    }

    get item_id() {
        return this.#item_id;
    }
    get item_name() {
        return this.#item_name;
    }
    get item_price() {
        return this.#item_price;

    }
    get item_quantity() {
        return this.#item_quantity;
    }
    get item_category() {
        return this.#item_category;
    }

    set item_Id(id){
        this.#item_id = id;
    }

    set item_name(name){
        this.#item_name = name;
    }

    set item_price(price){
        this.#item_price = price;
    }

    set item_quantity(quantity){
        this.#item_quantity = quantity;
    }
    set item_category(category){
        this.#item_category = category;
    }

}


const getItemData = () => {
    return Item_db;
}
const addItem = (id, name, price, qty, category) => {
    let newItem = new Item(id, name, price, qty, category);

    Item_db.push(newItem);
}
const deleteItem = (id) => {
    let index = Item_db.find(item => item.id == id);

    if (index !== -1) {
        Item_db.splice(index, 1);
    }
}


export {getItemData,deleteItem,addItem};