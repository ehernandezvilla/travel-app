document.getElementById('city-btn').addEventListener('click', handleButtonClick);

function handleButtonClick() {
    let destination = document.querySelector('#city').value;
    

    if (!destination.trim()) {
        alert('Please enter a valid destination');
        return;
    }

    console.log('Button clicked');

    const apiEndpoint = 'http://localhost:8080/getGeonames';

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({destination: destination}) // Añadido el cuerpo de la solicitud
    })
    .then(res => res.json())
    .then(data => {
        if (data.error){
            throw new Error(data.error);
        }
        console.log(data);
        const imageUrl = data.imageURL;
        const imageElement = document.getElementById('img').querySelector('img');
        imageElement.src = imageUrl;
    })
    .catch(error => console.error('There was a problem with the fetch operation', error));
}


// export { handleButtonClick}



// function handleSubmit(e) {
//     e.preventDefault();

//     let destination = document.querySelector('#city').value;

//     if (!destination.trim()) {
//         alert('Please enter a valid destination');
//         return;
//     }

//     console.log('Form submitted')

//     const apiEndpoint = 'http://localhost:8080/test';

//     fetch(apiEndpoint, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({destination: destination})
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }

// export { handleSubmit}