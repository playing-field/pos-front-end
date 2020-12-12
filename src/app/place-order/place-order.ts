import html from './place-order.html';
import style from './place-order.scss';


$('app-place-orders').replaceWith('<div id="place-orders">'+html+'</div>');
$('head').append('<style>'+style+'</style>')