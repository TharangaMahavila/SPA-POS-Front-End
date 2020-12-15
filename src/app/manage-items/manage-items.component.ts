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
import { getAllItems } from '../service/item.service';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

async function loadAllItems():Promise<void> {
    let items = await getAllItems();
    for (const item of items) {
        $("#tbl-items tbody").append(`<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
        <td><i class="fas fa-trash"></i></td>
        </tr>`);
    }
    ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
    });
};
loadAllItems();


