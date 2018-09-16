'use strict';

function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status < 400) {
            cb(null, xhr.response);
        } else {
            cb(xhr.statusText);
            console.log(xhr.statusText);
        }
    }
    xhr.onerror = () => {
        cb('Network request failed');
    };
    xhr.send();
}

fetchJSON('https://api.github.com/orgs/HackYourFuture/repos?per_page=100', (error, response) => { 
    if (error !== null) {
        alert('error');
    } else {
        
        const arrayOfObjects = (response);
        const root = document.getElementById('root');
        const header = createAndAppend('div', root);
        header.id = 'subRoot';
        const heading = createAndAppend('h1', header);
        heading.innerHTML = 'HYF Repositories :';
        const select = createAndAppend('select', header);
        select.setAttribute('class', 'select_menu');
        const optionItem = createAndAppend('option', select);
        optionItem.innerText = ' Choose a repository';

        for (const obj of arrayOfObjects) {
            const optionItem = createAndAppend('option', select);
            optionItem.innerText = obj.name;
            optionItem.value = 'https://api.github.com/repos/HackYourFuture/' + obj.name;
        }
        
    }
});



function createAndAppend(name, parent){
    const elem = document.createElement(name);
    parent.appendChild(elem);
    return elem;

}





// fetchJSON('https://api.github.com/orgs/HackYourFuture/repos?per_page=100',(error, data) => {
//     if (error == null) {
//         const repos = response.data;
//         const root = document.getElementById('root');
//         const ul = createAndAppend('ul', root);

//         for (let i = 0; i < data.length; i++){
//             const repo = data(i);
//             const li = createAndAppend('li', ul);
//             li.innerHTML = repo.name + '' + repo.id;
//         }
//     } else {
//         console, log(error);
//     }
// });

