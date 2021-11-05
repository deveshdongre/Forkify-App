import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

export const getJSON = async function(url){
    try{
        // console.log('helper.js - before fetch');    
        const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC) ]);
        // console.log('helper.js - before fetch');
        const data = await res.json();


    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
    } catch(err){
        console.log('error from Helper.js');
        throw err; //this will tirgger the error of the calling fun

    }
};