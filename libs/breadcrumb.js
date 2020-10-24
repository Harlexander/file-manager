const path = require('path');

const breadCrumbInput = (pathname) => {
    const pathElement = pathname.split('/');
    pathElement.shift()
    
    let breadCrumbHtml = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;
    let link = '/'
    pathElement.forEach((element, index) => {
        link = path.join(link, element);
        if(index !== pathElement.length -1){
            breadCrumbHtml += `<li class="breadcrumb-item"><a href="${link}">${element}</a></li>`;
        }else{
            breadCrumbHtml += `<li class="breadcrumb-item active" aria-current = "page">${element}</li>`
        }
    });
    return breadCrumbHtml;
}

module.exports = breadCrumbInput;