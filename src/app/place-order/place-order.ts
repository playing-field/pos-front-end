import html from './place-order.html';
import style from './place-order.scss';
import {getAllCustomers, getCustomerById} from "../../service/customer.service";
import {Customer} from "../../model/customer";
import {Item} from "../../model/item";
import {getAllItems} from "../../service/item.service";
import {customers} from "../../service/customer.service";
import {items} from "../../service/item.service";


$('app-place-orders').replaceWith('<div id="place-orders">' + html + '</div>');
$('head').append('<style>' + style + '</style>');


async function loadAllCustomerIds() {
    if (customers.length === 0) {
        await getAllCustomers();
    }
    $('.customers-select').children().remove();
    customers.forEach(customer => {
        $('.customers-select').append(`<option>${customer.id}</option>`);
    })
}


async function loadAllItemCodes() {

    if (items.length === 0) {
        await getAllItems();
    }
    $('.items-select').children().remove();
    items.forEach(item => {
        $('.items-select').append(`<option>${item.code}</option>`);
    })


}


function init() {
    loadAllCustomerIds();

    loadAllItemCodes();
}

init();


$('#app-component .sidebar ul li a').click(function (){
    loadAllCustomerIds();
    loadAllItemCodes();
});



$('.customers-select').on('change', function () {
    let customer = customers[customers.findIndex((elm) => elm.id === $(this).val())]
    $('#customerName').val(customer.name);
    $('#customerAddress').val(customer.address);
});



