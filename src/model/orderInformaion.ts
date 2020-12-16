import {OrderItem} from "./orderItem";


export class OrderInformaion{
    constructor(public id:string,public date:string,public customerid:string,public orderItems:Array<OrderItem>) {
    }
}