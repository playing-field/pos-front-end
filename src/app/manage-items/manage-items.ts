/**
 * @author : Visura Prabod <visuraprabod@gmail.com>
 * @since : 11/26/20
 **/

import manageItems from './manage-items.html';
import style from './manage-items.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteItem, getAllItems, saveItem } from '../../service/item.service';
import {Item} from '../../model/item';
import { saveCustomer } from '../../service/customer.service';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);



/* function loadAllCustomers(){
    let items=getAllItems();

    for(const item of items){
        console.log(item);
        $('#tbl-items tbody').append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.unitPrice}</td>
                <td><i class="fa fa-trash"></i></td>
            </tr>
        `)
    }
}

loadAllCustomers();



($("#tbl-items") as any).DataTable({
    "info": false,
    "searching": false,
    "lengthChange": false,
    "pageLength": 5,
}); */
$('#tbl-items tbody').on('click', 'tr .fas', async (event: Event) => {
    let id = ($(event.target as any).parents('tr').find('td:first-child').text());
    try {
        await deleteItem(id);
        loadAllItems();
        alert('delete Succeful');
    } catch (error) {
        alert('Failed to delete customer')
    }

});



let datatable: any = null;
async function loadAllItems(){
    let items = await getAllItems();

    if(datatable){
        ($("#tbl-items") as any).DataTable().destroy();
    }

    $('#tbl-items tbody tr').remove();

    for(const item of items){

        $('#tbl-items tbody').append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `)
    }




    datatable=($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
    });
    datatable.page(Math.ceil(items.length / 5) - 1).draw(false);


}

loadAllItems();

$('#btn-item').click(async()=>{

    let code=<string> $('#txt-code').val();
    let description=<string>$('#txt-description').val();
    let unitPrice=<number>$('#txt-qty').val();
    let qtyOnHand=<number>$('#txt-unitprice').val();

    let item=new Item(code,description,+unitPrice,+qtyOnHand);

    try{
        await saveItem(item);
        alert('save una');
        loadAllItems();
    }catch(error){
        alert('Podi awaulk giya');
    }

});








