import html from './place-order.html';
import style from './place-order.scss';
import {getAllCustomers, getCustomerById} from "../../service/customer.service";
import {Customer} from "../../model/customer";
import {Item} from "../../model/item";
import {getAllItems} from "../../service/item.service";
import {customers} from "../../service/customer.service";
import {items} from "../../service/item.service";
import {orders, saveOrder} from "../../service/order.service";
import {OrderItem} from "../../model/orderItem";
import {OrderInformaion} from "../../model/orderInformaion";


$('app-place-orders').replaceWith('<div id="place-orders">' + html + '</div>');
$('head').append('<style>' + style + '</style>');


function init() {
    loadAllCustomerIds();

    loadAllItemCodes();

    setTodayDate();


    //this is for developing purposes
    function clearAlreadyAddedCartItems() {
        $('#tbl-cart tbody').children().remove();
    }

    clearAlreadyAddedCartItems();
}


function setTodayDate() {
    let tdate = new Date();
    let currentDate= tdate.getFullYear() + "-" +( tdate.getMonth()+1) + "-" + tdate.getDate();
    $('#place-order-date').val(currentDate);
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


function clearAllFields(){
    $('#cart-total').text("0.00");
    $('#tbl-cart tbody tr').remove();
    $('#place-order-qtyOnHand').val("");
    $('#place-order-qty').val("");
    $('#place-order-unitPrice').val("");
    $('#place-order-description').val("");
    $('#customerAddress').val("");
    $('#customerName').val("");

}


$('#app-component .sidebar ul li a').click(function () {
    loadAllCustomerIds();
    loadAllItemCodes();
    clearAllFields();
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


$('#btn-place-order-submit').click(function (){
    function validateFieldstoPerformPaymont(){
        if($('#tbl-cart tbody').children().length==0){
            alert('Add items to cart');
            return false
        }

        if(($('#customerName').val()as string).trim()==""){
            alert('select a customer');
            return false;
        }
        return  true;
    }
    if(!validateFieldstoPerformPaymont()){
        return;
    }

    submitOrder();

});


async function submitOrder(){
    let ordernumber=parseInt(orders[orders.length-1]['id'].slice(1,4))+1
    let orderId='D'+('00' + ordernumber).slice(-3);

    let customerId=<string>$('.customers-select').val();
    let orderDate=<string>$('#place-order-date').val();
    let orderItems:Array<OrderItem>=[];


    $('#tbl-cart tbody').children().each((index, element) => {
        let itemCode=$(element).children('td').eq(1).text();
        let qty=+$(element).children('td').eq(5).text();
        let unitPrice=+$(element).children('td').eq(4).text();

        console.log(itemCode,qty,unitPrice);
        orderItems.push(new OrderItem(orderId,itemCode,qty,unitPrice));
    });

    try {
        await saveOrder(new OrderInformaion(orderId, orderDate, customerId, orderItems));
        alert('Order successfully added');
        clearAllFields();
    }catch (e) {
        alert('Something went wrong try again');
    }
}





