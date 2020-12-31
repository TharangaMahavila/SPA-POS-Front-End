import { resolve } from "../../../webpack.config";
import { Order } from "../model/order";

let orders:Array<Order> = [];
let dataTable:any = null;

export function getAllOrders():Promise<Array<Order>>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method:"GET",
            url: "http://localhost:8080/app/orders"
        }).then((data)=>{
            orders = data;
            resolve(orders);
        }).fail(()=>{
            reject();
        })
    })
};
export async function loadAllOrders() {
    let orders = await getAllOrders();
    if(dataTable){
        ($("#tblOrder") as any).DataTable().destroy();
        $("#tblOrder tbody tr").remove();
    }
    for (const order of orders) {
        $("#tblOrder tbody").append(`
        <tr>
                            <td>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input checkAll">
                                    <label class="form-check-label">${order.orderID}</label>
                                </div>
                            </td>
                            <td>${order.subTotal}</td>
                            <td>${order.discount}</td>
                            <td>${order.netTotal}</td>
                            <td><button class="btn btn-dark"><a class="text-light" href="">View</a></button></td>
                        </tr>
        `);
    }
    dataTable = ($("#tblOrder")as any).DataTable({
        "info": false,
        "seraching": true,
        "lengthChange": false,
        "pageLength": 10,
        "ordering": false 
    })
}