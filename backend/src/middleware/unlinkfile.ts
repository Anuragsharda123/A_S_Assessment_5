import fs from 'fs';

export const unLink = (resume:any, photo:any) => {
    console.log("Unlinking........")    
    fs.unlink(resume, (error)=>{console.log("Error in deleting PDF:::  ", error)});
    fs.unlink(photo, (error)=>{console.log("Error in deleting PDF:::  ", error)});

}