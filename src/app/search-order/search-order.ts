import html from './search-order.html';
import style from './search-order.scss';


$('app-search-orders').replaceWith('<div id="search-orders">'+html+'</div>');
$('head').append('<style>'+style+'</style>')