import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Item } from '../model/item';
import { Order } from '../model/order';
import { OrderItem } from '../model/orderItem';
import { getItemInfo, getNewOrderId, saveOrder } from '../service/place-order.service';
import placeOrder from './place-order.component.html';
import style from './place-order.component.scss';

$("app-place-order").replaceWith('<div id="place-order">' + placeOrder + '</div>');
var html = '<style>' + style + '</style>';
$("#place-order").append(html);

let subTotal:number = 0;
let orderItems:Array<OrderItem> = [];

export async function setOrderId(){
    let newId = await getNewOrderId();
    $("#orderId").text(newId);
    $("#tblCart tbody tr").remove();
    $("#CartSubTotal").val("");
    $("#netTotal").val("");
    $("#itemCode").val("");
    $("#itemCode").focus();
}
setOrderId();
$("#itemCode").on('keyup',async(e)=>{
    if(e.key==='Enter' || e.keyCode === 13){
        if($("#itemCode").val()!==""){
            let itemCode = <string>$("#itemCode").val();
            let item:Array<Item> = await getItemInfo(itemCode);
            if(item.length>0){
                $("#itemName").val(item[0].name);
                $("#rate").val(item[0].price);
                $("#qty").focus();
            }else{
                $("#itemName").val("");
                $("#rate").val("");
                $("#itemCode").focus();
            }
        }
    }
});
$("#qty").on('keyup',(e)=>{
    if(e.key==='Enter' || e.keyCode===13){
        let sum:number = <number>($("#rate").val())*<number>($("#qty").val());
        $("#subTotal").val(sum.toFixed(2));
        $("#btnAddToCart").focus();
    }
});
$("#btnAddToCart").on('click',()=>{
    let itemCode = <string>$("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemRate = <number>$("#rate").val();
    let itemQty = <number>$("#qty").val();
    let itemSubTotal = <number>$("#subTotal").val();
    let orderId:string = <string>$("#orderId").text();
    orderItems.push(new OrderItem(orderId,itemCode,itemRate,itemQty))
    $("#tblCart tbody").append(`
    <tr>
    <td>
        <div class="form-check">
            <input type="checkbox" class="form-check-input">
            <label class="form-check-label">#${itemCode}</label>
        </div>
    </td>
    <td>${itemName}</td>
    <td>Rs.${itemRate}</td>
    <td>${itemQty}</td>
    <td>Rs.${itemSubTotal}</td>
    <td>
        <div class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="flaticon-more-button-of-three-dots"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#"><i class="fas fa-trash text-orange-red"></i>Delete</a>
                <a class="dropdown-item" href="#"><i class="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                <a class="dropdown-item" href="#"><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
            </div>
        </div>
    </td>
</tr>`);
subTotal = +subTotal + +itemSubTotal;
$("#CartSubTotal").val(subTotal.toFixed(2));
let netTotal = +subTotal - +(<number>$("#discount").val());
$("#netTotal").val(netTotal.toFixed(2));
$("#itemCode").val("");
$("#itemName").val("");
$("#rate").val("");
$("#qty").val("");
$("#subTotal").val("");
$("#itemCode").focus();
});
$("#discount").on('input',()=>{
    let netTotal = +subTotal - +(<number>$("#discount").val());
    $("#netTotal").val(netTotal.toFixed(2));
});
$("#btnSaveBill").on('click',async ()=>{
    let orderId:string = <string>$("#orderId").text();
    let subTotal:number = <number>$("#CartSubTotal").val();
    let discount:number = <number>$("#discount").val();
    let netTotal:number = <number>$("#netTotal").val();
    try {
        await saveOrder(new Order(orderId,subTotal,discount,netTotal,orderItems));
        swal({
            title:"Order Saved",
            text: "Successfully Saved the Order",
            icon: "success"
        }).then(()=>{
            orderItems.length = 0;
            setOrderId();
        })
    } catch (error) {
        swal({
            title: "Oops! Something went wrong",
            text: "Failed to save the Order",
            icon: "error",
        })
    }
});
$("#btnClear").on('click',()=>{
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#rate").val("");
    $("#qty").val("");
    $("#subTotal").val("");
    $("#itemCode").focus();
});
$("#btnCancelBill").on('click',()=>{
    $("#tblCart tbody tr").remove();
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#rate").val("");
    $("#qty").val("");
    $("#subTotal").val("");
    $("#CartSubTotal").val("");
    $("#discount").val("");
    $("#netTotal").val("");
    $("#itemCode").focus();
});