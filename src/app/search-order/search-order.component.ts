import { getAllOrders } from '../service/place-order.service';
import { loadAllOrders } from '../service/search-order.service';
import html from './search-order.component.html';
import style from './search-order.component.scss';

$("app-search-order").replaceWith('<div id="search-order">'+html+'</div>');
$("#search-order").append('<style>'+style+'</style>');

loadAllOrders();