/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageCustomers from './manage-customers.component.html';
import style from './manage-customers.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import swal from 'sweetalert';
import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from '../service/customer.service';
import { Customer } from '../model/customer';



$("app-manage-customers").replaceWith('<div id="manage-customers">' + manageCustomers + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

let dataTable:any=null;
let editCustomer:boolean = false;

async function loadAllCustomers():Promise<void>{
    let customers = await getAllCustomers();

    if (dataTable){
        ($("#tbl-customers") as any).DataTable().destroy();
        $("#tbl-customers tbody tr").remove();
   }

        for (const customer of customers) {
            $("#tbl-customers tbody").append(`
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
            `);
        }
        dataTable = ($("#tbl-customers") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
            "ordering": false
        });
        dataTable.page(Math.ceil(customers.length / 5)-1).draw(false);
};
loadAllCustomers();

$("#tbl-customers tbody").on('click','tr i',(e)=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Customer!",
        icon: "warning",
        buttons: {cancel:true, confirm:true},
        closeOnClickOutside: false,
        dangerMode: true,
      })
      .then( async(willDelete) => {
        if (willDelete) {
        let id = $(e.target).closest("tr").find("td").first().html();

        try{
            await deleteCustomer(id);
            swal({
                title: "Customer Deleted!",
                text: "Successfully Deleted the Customer",
                icon: "success",
            });
            loadAllCustomers();
        }catch{
            swal({
                title: "Oops! Something went wrong",
                text: "Failed to delete the customer",
                icon: "error",
            });
        }
        clearTextFields();
        } else {
            clearTextFields();
        }
      });
});

$("#btnSave").on('click',async()=>{
    let id= <string>$("#txt-id").val();
    let name= <string>$("#txt-name").val();
    let address= <string>$("#txt-address").val();

    if(!editCustomer){
        try{
            await saveCustomer(new Customer(id,name,address));
            swal({
                title: "Customer Saved!",
                text: "Successfully Saved the Customer",
                icon: "success",
            });
            loadAllCustomers();
            clearTextFields();
        }catch{
            swal({
                title: "Oops! Something went wrong",
                text: "Failed to save the customer",
                icon: "error",
            });
        }
    }else{
        try{
            await updateCustomer(new Customer(id,name,address));
            swal({
                title: "Customer Updated!",
                text: "Successfully Updated the customer",
                icon: "success",
            });
            loadAllCustomers();
            clearTextFields();
        }catch{
            swal({
                title: "Oops! Something went wrong",
                text: "Failed to Update the Customer",
                icon: "error",
            });
        }
    }
});
function clearTextFields(){
    $("#txt-id").val("");
    $("#txt-name").val("");
    $("#txt-address").val("");
    $("#txt-id").prop('disabled', false);
    $("#txt-id").focus();
    editCustomer=false;
};

$("#tbl-customers tbody").on('click','tr',(e)=>{
    $("#txt-id").val($(e.target).closest("tr").find("td").first().html());
    $("#txt-name").val($(e.target).closest("tr").find("td").eq(1).html());
    $("#txt-address").val($(e.target).closest("tr").find("td").eq(2).html());
    $("#txt-id").prop('disabled', true);
    editCustomer=true;
});

$("#btnReset").on('click',()=>{
   clearTextFields();
}); 


