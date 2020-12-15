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


function init() {
    loadAllCustomerIds();

    loadAllItemCodes();


    //this is for developing purposes
    function clearAlreadyAddedCartItems() {
        $('#tbl-cart tbody').children().remove();
    }

    clearAlreadyAddedCartItems();
}

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

init();


function clearInvalidClasses() {
    $('#place-order-qty').removeClass('is-invalid');
    $('#place-order-qtyOnHand').removeClass('is-warning');
    $('#place-order-qtyOnHand').removeClass('is-invalid');
}

function validateQty(): boolean {
    if ((parseInt(<string>$('#place-order-qtyOnHand').val())) < parseInt(<string>$('#place-order-qty').val())) {
        $('#place-order-qty').addClass('is-invalid');
        $('#place-order-qtyOnHand').addClass('is-warning');
        return false;

    } else {
        clearInvalidClasses();
        return true;
    }
}


$('#app-component .sidebar ul li a').click(function () {
    loadAllCustomerIds();
    loadAllItemCodes();
});


$('.customers-select').on('change', function () {
    let customer = customers[customers.findIndex((elm) => elm.id === $(this).val())]
    $('#customerName').val(customer.name);
    $('#customerAddress').val(customer.address);
});


let selectedItem: any = null;
$('.items-select').on('change', function () {
    selectedItem = items[items.findIndex((elm) => elm.code === $(this).val())]
    $('#place-order-description').val(selectedItem.description);
    $('#place-order-qtyOnHand').val(selectedItem.qtyOnHand);
    $('#place-order-unitPrice').val(selectedItem.unitPrice);

    validateQty();
});

let cartTotal=0;
$('#btn-add-to-cart').on('click', () => {
    clearInvalidClasses();
    function validateFields() {
        if(($('#place-order-qty').val() as string).trim().length===0){
            $('#place-order-qty').addClass('is-invalid');
            if(($('#place-order-qtyOnHand').val() as string).trim().length===0){
                $('#place-order-qtyOnHand').addClass('is-invalid');
            }
            return false;
        }
        return true

    }

    if(!validateFields()){return;}

    if (validateQty()) {
        let tempQty = <number>$('#place-order-qty').val();
        let tempItemTotal = tempQty * <number>$('#place-order-unitPrice').val();
        $('#tbl-cart tbody').append(`
        <tr>
                                <td>1</td>
                                <td>${selectedItem.code}</td>
                                <td>${selectedItem.description}</td>
                                <td>${selectedItem.qtyOnHand}</td>
                                <td>${selectedItem.unitPrice}</td>
                                <td>${tempQty}</td>
                                <td>${tempItemTotal}</td>
                                <td>
                                    <button type="button" class="btn-xs  btn-danger btn-remove-on-cart">Remove</button>
                                </td>
                            </tr>
        `);
        cartTotal+=tempItemTotal;
        $('#place-order-qty').val("");
        $('#cart-total').text(cartTotal.toFixed(2));

    } else {
        return;
    }
});


$('#tbl-cart tbody').on('click','tr .btn-danger',(event:Event)=>{
    // console.log($(event.target as any).parents('tr').children('td').eq(6).text());

    cartTotal-=parseInt($(event.target as any).parents('tr').children('td').eq(6).text());
    $('#cart-total').text(cartTotal.toFixed(2));
    $(event.target as any).parents('tr').remove();
});





