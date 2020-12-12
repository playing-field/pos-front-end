
import app_component from './app.component.html';
import app_component_scss from './app.component.scss';

$('app-root').replaceWith('<div id="app-component">'+app_component+'</div>');
$('head').append('<style>'+app_component_scss+'</style>');






$(document).ready(()=>{
    $('#outlet>div').hide();
    $('#dashboard').show();
})


$('#app-component .sidebar ul li a').click(function (){
    $('#outlet>div').hide();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    switch ($(this).find('p').text().trim()){
        case "Dashboard":
            $('#dashboard').show();
            break;
        case "Manage Customers":
            $('#manage-customers').show();
            break;
        case "Manage Items":
            $('#manage-items').show();
            break;
        case "Place Orders":
            $('#place-orders').show();
            break;
        case "Search Orders":
            $('#search-orders').show();
            break;
    }
});



