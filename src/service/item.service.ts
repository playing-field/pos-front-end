import { Item } from "../model/item";

let items: Array<Item> = [];


/* export function getAllItems():Array<Item>{

    let http = new XMLHttpRequest();

    http.onreadystatechange=function(){
        if(http.readyState==4){
            $(http.responseText).find('tbody tr').each(function(index,element){
               let code = $(element).find('td').first().text();
               let description = $(element).find('td').eq(1).text();
               let unitPrice = $(element).find('td').eq(2).text();
               let qtyOnHand = $(element).find('td').last().text();


               items.push(new Item(code,description,+unitPrice,+qtyOnHand));
                
            })
        }

    }


    http.open('GET','http://localhost:8080/mypos/items',false);


     http.send();

     return items;

} */

let loaded = false;

export function getAllItems(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
        if (!loaded) {
            /* let http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    // $(http.responseXML as any).find('item').each(function (index, element) {
                    //     let code = $(element).find('code').text();
                    //     let description = $(element).find('description').text();
                    //     let unitPrice = $(element).find('unit-price').text();
                    //     let qtyOnHand = $(element).find('qty-on-hand').text();
    
    
                    //     items.push(new Item(code, description, +unitPrice, +qtyOnHand));
    
                    // })


                    items = JSON.parse(http.responseText);
                    loaded=true;
                    resolve(items);
                }



            }



            http.open('GET', 'http://localhost:8080/mypos/items', true);


            http.send(); */


            $.ajax({
                method:"GET",
                url:"http://localhost:8080/mypos/items"

            }).then((data)=>{
                items=data;
                loaded=true;
                resolve(items);
            }).catch(()=>{
                reject();
            })
        }else{
            resolve(items);
        }


    })
}


export function saveItem(item: Item): Promise<void> {
    return new Promise((resolve, reject) => {
        /* let http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if(http.status==201){
                    items.push(item);
                    resolve();
                }else{
                    reject();
                }
                
            }
        }

        http.open('POST', 'http://localhost:8080/mypos/items', true);

        http.setRequestHeader('Content-type', 'application/json')

        http.send(JSON.stringify(item)); */


        $.ajax({
            method:"POST",
            url:"http://localhost:8080/mypos/items",
            contentType:'application/json',
            data:JSON.stringify(item)
        }).then(()=>{
            items.push(item);
            resolve();
        }).catch(()=>{
            reject();
        });


    });
}


export function deleteItem(code:string):Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method:"DELETE",
            url:`http://localhost:8080/mypos/items?code=${code}`,
        }).then(()=>{
            items.splice(items.findIndex((elm)=>elm.code==code),1);
            resolve();
        }).fail(()=>{
            reject();
        })
    })
}

