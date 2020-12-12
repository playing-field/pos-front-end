import html from './dashboard.html';
import style from './dashboard.scss';

$('app-dashboard').replaceWith('<div id="dashboard">'+html+'</div>');
$('head').append('<style>'+style+'</style>');

$('.cards a').click(function (){
    switch ($(this).find('p').text().trim()){
        case "Customers":$('#dashboard_customers').click();
        break;
        case "Items":$('#dashboard_items').click();
        break;
        case "Orders":$('#dashboard_orders').click();
        break;
    }
});