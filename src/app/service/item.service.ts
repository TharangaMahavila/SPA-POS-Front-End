import { Item } from "../model/item";

let items:Array<Item>=[];

export function getAllItems():Promise<Array<Item>> {
    return new Promise((resolve,reject)=>{

       let http = new XMLHttpRequest();
       http.onreadystatechange=function(){
            if(http.readyState === 4){
               /*  $(http.responseXML as any).find("item").each((index,elm)=>{
                    let id= $(elm).find("id").text();
                    let name =$(elm).find("name").text();
                    let qty = parseFloat($(elm).find("qty").text());
                    let price = parseFloat($(elm).find("price").text());
                    items.push(new Item(id,name,qty,price));
                }); */
                items = JSON.parse(http.responseText);
                resolve(items);
            }
       }
       http.open('GET','http://localhost:8080/app/items',true);
       http.send();

    });
}

/* import { Item } from "../model/item";

let items:Array<Item> =[];

export function getAllItems():Promise<Array<Item>> {
    return new Promise((resolve,reject)=>{

        let http = new XMLHttpRequest();
        http.onreadystatechange=function(){
            if(http.readyState === 4){
                console.log("Items awaaaaa....");
                $(http.responseText).find("table tbody tr").each((index,elm)=>{
                    let id= $(elm).find("td").first().text();
                    let name =$(elm).find("td").eq(1).text();
                    let price = parseFloat($(elm).find("td").last().text());
                    items.push(new Item(id,name,price));
                });
                resolve(items);
            
            }

        }
        http.open('GET', 'http://localhost:8080/app/items',true);
        http.send();
    });
} */