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

    get id() {
        return this.#item_id;
    }
    get name() {
        return this.#item_name;
    }
    get price() {
        return this.#item_price;

    }
    get qty() {
        return this.#item_quantity;
    }
    get category() {
        return this.#item_category;
    }

    set Id(id){
        this.#item_id = id;
    }

    set name(name){
        this.#item_name = name;
    }

    set price(price){
        this.#item_price = price;
    }

    set qty(quantity){
        this.#item_quantity = quantity;
    }
    set category(category){
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

const getItemDataById = (id) => {
    return Item_db.find(item =>item.id==id);
}



const updateItem = (id, name, price, qty, category) => {
    let Item = Item_db.find(item => item.id == id);

    if (Item) {
        Item.name = name;
        Item.price = price;
        Item.qty = qty;
        Item.category = category;
    }
}

export {getItemData,deleteItem,getItemDataById,addItem,updateItem};