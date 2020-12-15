import { ajax } from "jquery";
import { resolve } from "../../webpack.config";
import { Customer } from "../model/customer";





/* export function getAllCustomers():Array<Customer>{
    //To do retrieve data from backend and fill the customers array

    // for (let i = 0; i < 50; i++) {
    //     // new Customer('C'+i,'Kasun','Gall e');
    //     customers.push(new Customer(`C${i}`,'Kasun','Gall e')); //ES6 Template String introduce
        
    // } 

    let http = new XMLHttpRequest();

    http.onreadystatechange=function(){
        // console.log(http.readyState);
        // console.log('Hooray data aawa aawa!');
        // console.log(http.responseText);

        if(http.readyState==4){
            console.log('Hooray data aawa aawa ')
          $(http.responseText).find('table tbody tr').each((index,element)=>{
            //   console.log(`ID: ${$(element).find('td').first().text()}`);
            //   console.log(`Name: ${$(element).find('td').eq(1).text()}`);
            //   console.log(`Address:${ $(element).find('td').last().text()}`);

            let id = $(element).find('td').first().text();
            let name= $(element).find('td').eq(1).text();
            let address= $(element).find('td').last().text();

            customers.push(new Customer(id,name,address));
            console.log(id);
            console.log(name);
            console.log(address);
       
          });

            // console.log($(http.responseText).find("table tbody tr").eq(1));

        }

    }
    http.open('GET','http://localhost:8080/mypos/customers',false);
    http.send();
    return customers;
} */


export let customers: Array<Customer> = [];
let loaded = false;
export function getAllCustomers(): Promise<Array<Customer>> {
    return new Promise((resolve, reject) => {
        if (!loaded) {
            /* let http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    // console.log('Hooray data aawa aawa ')
                    // console.log(http.responseText);
                    // console.log(http.responseText);





                    // $(<any>http.responseText).find('customer').each((index, element) => {
                       
                    //     let id = $(element).find('id').text();
                    //     let name = $(element).find('name').text();
                    //     let address = $(element).find('address').text();
    
                    //     customers.push(new Customer(id, name, address));
    
    
                    // });
                    customers = JSON.parse(http.responseText);

                    loaded = true;
                    resolve(customers);


                }
            }
            http.open('GET', 'http://localhost:8080/mypos/customers', true);
            http.send(); */
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/mypos/customers"
            }).then((data) => {
                customers=data;
                loaded = true;
                resolve(customers);
            }).fail(() => {
                reject();
            })



        } else {
            resolve(customers);
        }

            



        });

}


export function saveCustomer(customer: Customer): Promise<void> {

    return new Promise((resolve, reject) => {
        /* let http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 201) {
                    customers.push(customer);
                    resolve();
                } else {
                    reject();
                }


            }
        };



        http.open('POST', 'http://localhost:8080/mypos/customers', true);

        http.setRequestHeader('Content-Type', 'application/json');


        http.send(JSON.stringify(customer)); */




        $.ajax({
            method:'POST',
            url:'http://localhost:8080/mypos/customers',
            // contentType:'application/json',
            // data: JSON.stringify(customer)
            contentType:'application/x-www-form-urlencoded',
            data:$('#frm-customers').serialize()

        }).then(() => {
            customers.push(customer);
            resolve();
        }).catch(() => {
            reject();
        });
    });
}


export function deleteCustomer(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        /* let http=new XMLHttpRequest();

        http.onreadystatechange=()=>{
            if(http.readyState==4){
                if(http.status==204){
                    customers.splice(customers.findIndex((elm)=>elm.id===id),1)
                    resolve();
                }else{
                    reject();
                }
            }
        }

        http.open('DELETE',`http://localhost:8080/mypos/customers?id=${id}`,true);
        http.send(); */


        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/mypos/customers?id=${id}`

        }).then(() => {
            customers.splice(customers.findIndex((elm) => elm.id === id), 1);
            resolve();
        }).catch(() => {
            reject();
        });




    });
}

export function getCustomerById(id:string):Promise<Customer>{
    return new Promise((resolve,reject)=>{

        $.ajax({
            method:'GET',
            url:`http://localhost:8080/mypos/customers?id=${id}`,
        }).then((data)=>{
            resolve(data);
        }).catch(()=>{
            console.log('mkkk hari awualk wela');
            reject();
        });

    });
}