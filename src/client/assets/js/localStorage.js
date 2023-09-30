const save_btn = document.getElementById('save_trip');
const remove_btn = document.getElementById('remove_trip');
const ul = document.querySelector('ul');
const input = document.getElementById('city');

const liMaker = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
} 

save_btn.addEventListener('click', function() { 
    liMaker(input.value)
    // input.value = '';
});


