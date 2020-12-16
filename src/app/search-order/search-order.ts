import html from './search-order.html';
import style from './search-order.scss';
import {getAllOrders, orders} from "../../service/order.service";


$('app-search-orders').replaceWith('<div id="search-orders">'+html+'</div>');
$('head').append('<style>'+style+'</style>')

async function loadAllOrders(){
    try{
        await getAllOrders();
        orders.forEach(order => {
            $('#tbl-orders tbody').append(`
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customerId}</td>
                    <td>${order.date}</td>
                </tr>
            `);
        })

    }catch (error){
        console.error(error);
    }
}


$('#app-component .sidebar ul li a').click(function () {
    $('#tbl-orders tbody').children().remove();
    loadAllOrders();
});
loadAllOrders();
