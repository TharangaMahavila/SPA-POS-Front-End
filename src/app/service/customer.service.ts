import { data } from "jquery";
import { Customer } from "../model/customer";

let customers:Array<Customer> =[];
let loaded = false;

export function getAllCustomers():Promise<Array<Customer>> {
    return new Promise((resolve,reject)=>{

        if(!loaded){
            $.ajax({
                method: "GET",
                url:"http://localhost:8080/app/customers"
            }).then((data)=>{
                customers=data;
                loaded=true;
                resolve(customers);
            }).fail(()=>{
                reject();
            })
        }else{
            resolve(customers);
        }
    });
}
export function saveCustomer(customer:Customer):Promise<void>{
        return new Promise((resolve,reject)=>{
/*             let http=new XMLHttpRequest();
            http.onreadystatechange=()=>{
               if(http.readyState===4){
                   if(http.status == 201){
                    customers.push(customer);
                    resolve();
                   }else{
                    reject("Something Went Wrong!");
                   }
            };
        }
            http.open('POST','http://localhost:8080/app/customers',true);
            http.setRequestHeader('Content-Type','application/json');
            http.send(JSON.stringify(customer)); */

            $.ajax({
                method: "POST",
                url: "http://localhost:8080/app/customers",
                contentType: "application/json",
                data: JSON.stringify(customer)
            }).then(()=>{
                customers.push(customer);
                resolve();
            }).fail(()=>{
                reject();
            })
        });
}
export function updateCustomer(customer:Customer):Promise<void>{
    return new Promise((resolve,reject)=>{
/*         let http = new XMLHttpRequest();
        http.onreadystatechange=()=>{
            if(http.readyState===4){
                let success = JSON.parse(http.responseText);
                if(success){
                    for (const cus of customers) {
                        if(cus.id===customer.id){
                            customers.splice(customers.indexOf(cus),1,customer);
                            break;
                        }
                    }
                }
                resolve(success);
            }
        };
        http.open('PUT','http://localhost:8080/app/customers',true);
        http.setRequestHeader('Content-Type','application/json');
        http.send(JSON.stringify(customer)); */

        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/app/customers?id=${customer.id}`,
            contentType: "application/json",
            data: JSON.stringify(customer)
        }).then(()=>{
            customers.splice(customers.findIndex((elm)=>elm.id===customer.id),1,customer);
            resolve();
        }).fail(()=>{
            reject();
        });
    });
}
export function deleteCustomer(id:string):Promise<void> {
    return new Promise((resolve,reject)=>{
       /*  let http = new XMLHttpRequest();
        http.onreadystatechange=()=>{
            if(http.readyState===4){
                let success = JSON.parse(http.responseText);
                if(success){
                    for (const cus of customers) {
                        if(cus.id===customer.id){
                            customers.splice(customers.indexOf(cus),1);
                            break;
                        }
                    }
                }
                resolve(success);
            }
        };
        http.open('DELETE','http://localhost:8080/app/customers',true);
        http.setRequestHeader('Content-Type','application/json');
        http.send(JSON.stringify(customer)); */

        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/app/customers?id=${id}`
        }).then(()=>{
            customers.splice(customers.findIndex((elm)=>elm.id===id),1);
            resolve();
        }).fail(()=>{
            reject();
        });
    });
}