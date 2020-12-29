import { resolve } from "../../../webpack.config";
import { Item } from "../model/item";
import swal from 'sweetalert';

let item:Array<Item> = [];

export function getItemInfo(itemCode:string):Promise<Array<Item>>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            method:"GET",
            url: `http://localhost:8080/app/items?id=${itemCode}`
        }).then((data)=>{
            item = data;
            resolve(item);
        }).fail((error:Response)=>{
            if(error.status === 404){
                swal("No Item Matched to the Given Item Code", {
                    icon: "error",
                    buttons: {ok:true},
                    timer: 3000,
                  });
            }
            reject();
        });
    });
}