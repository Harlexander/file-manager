const fs = require("fs");
const path = require('path');


//import files 
const calcDirSize = require('./calcDirSize.js');
const calcFileSize = require('./calcFileSize.js');


const menuContent = (fullstaticpath, pathname) => {
    let tableContent = '';

    
    //get the following information of the files
    //name
    //size
    //icon
    //directory path
    //last modified

    try {
       const pathElements =  fs.readdirSync(fullstaticpath);
       pathElements.forEach(file => {
           const fileLink = path.join(pathname, file)
           
           const fileDetails = {};
           [fileDetails.dirSize, fileDetails.dirBits] = calcDirSize(fullstaticpath);

           try {
            fileDetails.staticfolder = path.join(fullstaticpath, file);
            fileDetails.stats = fs.statSync(fileDetails.staticfolder);
           
           } catch (error) {
               console.log(`Error : ${error}`);
               tableContent = `<div class = "alert alert-danger">Internal Server Error</div>`;
               return false
           }
           if(fileDetails.stats.isDirectory()){
               tableContent += `
               <tr>
                    <th scope="row"><a href="${fileLink}"><i class="fa fa-folder text-dark"></i> ${file}</a> </th>
                    <td>${fileDetails.dirSize}</td>
                    <td>20/10/2020,  3:30 PM</td>
               </tr>`
            
           }else{
            tableContent += `
                <tr>
                    <th scope="row"><a href="${fileLink}"><i class="fa fa-file text-dark"></i> ${file}</a> </th>
                    <td>${fileDetails.fileSize}</td>
                    <td>20/10/2020,  3:30 PM</td>
                </tr>`

        //  [fileDetails.fileSize, fileDetails.fileSize] = calcDirSize(fullstaticpath);

        }
           
       });
    } catch (error) {
        console.log(`Error : ${error}`);
        return `<div class= "alert alert-danger">Server Failure</div>`
    }
    return tableContent;
}

module.exports = menuContent