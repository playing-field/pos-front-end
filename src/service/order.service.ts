import {Order} from "../model/order";
import {OrderInformaion} from "../model/orderInformaion";

export let orders:Order[];

let loaded=false;

export function getAllOrders():Promise<void>{
    return new Promise((resolve,reject)=>{
        if(!loaded){
            $.ajax({
                method:'GET',
                url:'http://localhost:8080/mypos/orders'
            }).then((data)=>{
                orders=data;
                loaded=true;
                resolve();
            }).catch(()=>{
                console.log('podi awullk awa');
            })
        }else{
            resolve();
        }

    });
}


// export function saveOrder(orderInformaion:OrderInformaion):Promise<boolean>{
export function saveOrder(orderInformaion:OrderInformaion):Promise<void>{

    console.log(JSON.stringify(orderInformaion));
    return new Promise((resolve,reject)=>{

        $.ajax({
            method:'POST',
            url:'http://localhost:8080/mypos/orders',
            contentType:'application/json',
            data:JSON.stringify(orderInformaion)
        }).then((data)=>{
            orders.push(new Order(orderInformaion.id,orderInformaion.date,orderInformaion.customerid));
            resolve();
        }).catch(()=>{
            reject();
        })
    });
}