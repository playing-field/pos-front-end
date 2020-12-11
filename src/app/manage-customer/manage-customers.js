import html from './manage-customers.html';
import style from './manage-customers.scss';


$('manage-customer').replaceWith('<div id="manage-customer">'+html+'</div>');
$('head').append('<style>'+style+'</style>');



