const save_btn = document.getElementById('save_trip');
const remove_btn = document.getElementById('remove_trip');
const ul = document.querySelector('ul');
const input = document.getElementById('save-input');

//LocalStorage

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


const liMaker = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}

save_btn.addEventListener('click', function() { 
    console.log('trip saved!')
    itemsArray.push(input.innerText);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    liMaker(input.innerText);
});

data.forEach((item) => {
    liMaker(item);
});


remove_btn.addEventListener('click', function() {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});
