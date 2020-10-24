//node mudules
const url = require('url');
const path = require('path');
const fs = require("fs");

//import files
const breadcrumb = require('./breadcrumb.js')
const menuContent = require('./tablecontent');

//get the static folder pathname
const static = path.join(__dirname, "../static");

console.log(static)

//create the the request and response file and export to app.js
const respond = (req, res) => {

    let pathname = url.parse(req.url).pathname;

    if(pathname === '/favicon.ico'){
        return false;
    }
    pathname = decodeURIComponent(pathname);

    const fullStaticPath = path.join(static, pathname);

    //check if fullstaticpath exist
    if(!fs.existsSync(fullStaticPath)){
    res.write(`Error 404!!! File : ${pathname} Does Not Exist`);
    res.end();
    return false
    }

    //get the information of the directory
    let stats;
    try {
        stats = fs.lstatSync(fullStaticPath);
    } catch (error) {
        console.log(`Error ${error}`)
    }
    
    //check if the file is a directory or a file 
    if (stats.isDirectory) {

        //get template from index.html
        let html = path.join(static, "project files/index.html");
        html = fs.readFileSync(html, "utf-8");

        const pathnameElement = pathname.split("/")
        //get the last element of the array method 1
        const folderName =  pathnameElement.pop();

        const breadcrumbelement = breadcrumb(pathname);
        const menuContentElement = menuContent(fullStaticPath, pathname);


        //replace all export files with html template
        html = html.replace('File Explorer', folderName);
        html = html.replace('pathname', breadcrumbelement)
        html = html.replace("Helllo world", menuContentElement)


        res.statusCode = 200
        res.write(`${html}`);
        res.end(); 
    }
}

//export file to app.js
module.exports = respond