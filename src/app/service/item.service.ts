import { Item } from "../model/item";

let items:Array<Item>=[];
let loaded = false;

export function getAllItems():Promise<Array<Item>> {
    return new Promise((resolve,reject)=>{

       if(!loaded){
        $.ajax({
            method:"GET",
            url: "http://localhost:8080/app/items"
           }).then((data)=>{
            items = data;
            loaded = true;
            resolve(items);
           }).fail(()=>{
            reject();
           });
       }else{
           resolve(items);
       }

    });
}