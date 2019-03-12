import * as fs from "fs-extra";

const reportFolder ='./report';
export function genReport(baseFolder:string,fileName:string,content:object){
    const folder= `${reportFolder}/${baseFolder}`;
    return fs.ensureDir(`${folder}`).then(()=>{
        return fs.writeJSON(`${folder}/${fileName}.json`,content,{spaces:2});
    })
}