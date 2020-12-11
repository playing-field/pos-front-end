import $ from 'jquery';
import jQuery from 'jquery';
import html from './app.component.html';
import style from './app.component.scss';


window.$=$;
window.jQuery=jQuery;




$('app-root').replaceWith('<div id="app-component">'+html+'</div>');
$('head').append('<style>'+style+'</style>');



