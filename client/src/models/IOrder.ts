import { IProduct } from "./IProduct";

export interface IItem {
    _id ? : string;
    name : string;
    brand : string;
    price : number;
    qty : number;
}

export interface IOrder{
    _id? : string;
    name : string;
    email : string;
    mobile : string;
    tax : number;
    total : number;
    items : IItem[];
    createdAt? : string;
    updatedAt? : string;
}

export interface OrderState {
    loading : boolean;
    cartItems : IProduct[];
    order : IOrder;
    orderList : IOrder[];
    errorMessage : string;
}
