import { resolve } from "../../../webpack.config";
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
export function saveItem(item:Item):Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/app/items",
            contentType: "application/json",
            data: JSON.stringify(item)
        }).then(()=>{
            items.push(item);
            resolve();
        }).fail(()=>{
            reject();
        });
    });
}
export function deleteItem(id:string):Promise<void>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/app/items?id=${id}`,
        }).then(()=>{
            items.splice(items.findIndex((elm)=>{elm.id===id}),1);
            resolve();
        }).fail(()=>{
            reject();
        });
    });
}