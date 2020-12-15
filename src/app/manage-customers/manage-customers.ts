import manageCustomers from './manage-customers.html';
import style from './manage-customers.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteCustomer, getAllCustomers, saveCustomer } from '../../service/customer.service';
import { Customer } from '../../model/customer';
import { data } from 'jquery';

$("app-manage-customers").replaceWith('<div id="manage-customers">' + manageCustomers + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);


/* function loadAllCustomers():void{
    let customers=getAllCustomers()
    for(const customer of customers){
        $('#tbl-customers').append(
            `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td><i class="fas fa-trash"></i></td>
            </tr>`
        )

    }
} */


/* function old_loadAllCustomers():void{
    getAllCustomers().then(function(customers:Array<Customer>){
        for(const customer of customers){
            $('#tbl-customers').append(
                `<tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td><i class="fas fa-trash"></i></td>
                </tr>`
            )

        }
        ($("#tbl-customers") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
        });

    }).catch(function(error){
        console.log(error);
    });
} */


let datatable: any = null;

async function loadAllCustomers() {

    let customers = await getAllCustomers();

    if (datatable) {
        ($('#tbl-customers') as any).DataTable().destroy();
    }

    $('#tbl-customers tbody tr').remove();




    for (const customer of customers) {
        $('#tbl-customers').append(
            `<tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td><i class="fas fa-trash"></i></td>
                </tr>`
        )

    }




    datatable = ($("#tbl-customers") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false
    });

    datatable.page(Math.ceil(customers.length / 5) - 1).draw(false);



}



loadAllCustomers();


$('#btn-save').click(async () => {
    let id = <string>$('#txt-id').val();
    let name = <string>$('#txt-name').val();
    let address = <string>$('#txt-address').val();

    if (!id.match(/^C\d{3}$/) || name.trim().length === 0 || address.trim().length === 0) {
        alert('Invalid Customer Information');
        return;
    }

    try {
        await saveCustomer(new Customer(id, name, address));
        loadAllCustomers();
    } catch (error) {
        alert('Failed to save the customer')

    }


});


$('#tbl-customers tbody').on('click', 'tr .fas', async (event: Event) => {
    let id = ($(event.target as any).parents('tr').find('td:first-child').text());
    try {
        await deleteCustomer(id);
        loadAllCustomers();
        alert('delete Succeful');
    } catch (error) {
        alert('Failed to delete customer')
    }

});








