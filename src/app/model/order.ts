import { OrderItem } from "./orderItem";

export class Order{
    constructor(public orderID:string,public subTotal:number,public discount:number,public netTotal:number,public orderItem:Array<OrderItem>){

    }
}