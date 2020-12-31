import { resolve } from "../../../webpack.config";
import { Item } from "../model/item";
import swal from 'sweetalert';
import { Order } from "../model/order";

let item:Array<Item> = [];
let orders:Array<Order> = [];

export function getItemInfo(itemCode:string):Promise<Array<Item>>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method:"GET",
            url: `http://localhost:8080/app/items?id=${itemCode}`
        }).then((data)=>{
            item = data;
            resolve(item);
        }).fail((error:Response)=>{
            if(error.status === 404){
                swal("No Item Matched to the Given Item Code", {
                    icon: "error",
                    buttons: {ok:true},
                    timer: 3000,
                  });
            }
            reject();
        });
    });
}
export function saveOrder(order:Order):Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/app/orders",
            contentType: "application/json",
            data: JSON.stringify(order)
        }).then(()=>{
            orders.push(order);
            resolve();
        }).fail(()=>{
            reject();
        });
    });
}
export function getNewOrderId():Promise<string>{
    return new Promise((resolve,reject)=>{
        let orderId:string = "O000";
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/app/orders"
        }).then((data)=>{
            orders = data;
            let newOrderNumb = <number>+orders[orders.length-1].orderID.substring(1)+1;
            orderId = orderId.substring(0,orderId.length-(newOrderNumb.toString).length)+newOrderNumb;
            resolve(orderId);
        }).fail(()=>{
            reject();
        });
    });
}