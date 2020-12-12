import html from './manage-customers.html';
import style from './manage-customers.scss';


$('app-manage-customers').replaceWith('<div id="manage-customers">'+html+'</div>');
$('head').append('<style>'+style+'</style>');



