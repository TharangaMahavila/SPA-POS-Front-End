/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageItems from './manage-items.component.html';
import style from './manage-items.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { getAllItems, saveItem } from '../service/item.service';
import { Item } from '../model/item';
import swal from 'sweetalert';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

let dataTable:any =null;
let editItem = false;

async function loadAllItems():Promise<void> {
    let items = await getAllItems();

    if(dataTable){
        ($("#tbl-items")as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
    }
    for (const item of items) {
        $("#tbl-items tbody").append(`<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
        <td><i class="fas fa-trash"></i></td>
        </tr>`);
    }
    dataTable = ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false
    });
    dataTable.page(Math.ceil(items.length / 5)-1).draw(false);
};
loadAllItems();

$("#btnItemSave").on('click',async()=>{
    let id = <string>$("#txtItemId").val();
    let name = <string>$("#txtItemName").val();
    let qty = <number>$("#txtItemQty").val();
    let price = <number>$("#txtItemPrice").val();

    if(!editItem){
        try{
            await saveItem(new Item(id,name,qty,price));
            swal({
                title:"Item Saved!",
                text: "Successfully Saved the Item",
                icon: "success",
            });
            loadAllItems();
            clearTextFields();
        }catch{
            swal({
                title: "Oops! Something went wrong",
                text: "Failed to save the Item",
                icon: "error",
            });
        }
    }else{

    }
});
export function clearTextFields(){
    $("#txtItemId").val("");
    $("#txtItemName").val("");
    $("#txtItemQty").val("");
    $("#txtItemPrice").val("");
    $("#txtItemId").prop('disabled',false);
    $("#txtItemId").focus();
    editItem = false;
}
$("#btnItemClear").on('click',function(){
    clearTextFields();
});
$("tbl-items tbody").on('click','tr i', (e)=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Item!",
        icon: "warning",
        buttons: {cancel:true, confirm:true},
        closeOnClickOutside: false,
        dangerMode: true,
    }).then(async(willDelete)=>{
        if(willDelete){
            let id=$(e.target).closest("tr").find("td").first().html();
            try{
                
            }
        }
    });

});


