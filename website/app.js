// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+ 1) + '.'+ d.getDate()+'.'+ d.getFullYear();


const DEFAULT_ZIP = "94040,us";

// Functions and fetchData 
const generate = document.getElementById('generate').addEventListener('click', function(){
    let zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if (!zipCode) {
        zipCode = DEFAULT_ZIP; // Use the default ZIP if the user doesn't provide any input
    }
    endPointData(zipCode, feelings);
})

const endPointData = async (zipCode, feelings) => {
    const res = await fetch(`/fetchWeather/${zipCode}`);
    try {
        const data = await res.json();
        console.log(data);
        const temperature = data.main.temp;
        postData('/weather', { temperature: temperature, date: newDate, feelings: feelings }); // Calling the postData function 
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async (url='', data = {}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        updateUI();
        return newData;
    }catch(error){
        console.log("error",error);
    }
}

// New function to update the UI
const updateUI = async () => {
    const request = await fetch('/weather');
    try {
        const allData = await request.json();
        const latestEntry = allData[allData.length - 1]; // latest entry
        document.getElementById('date').innerHTML = `Date: ${latestEntry.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${latestEntry.temperature}°C`; // temp
        document.getElementById('content').innerHTML = `Feelings: ${latestEntry.feelings}`; // Display feelings of user
    } catch (error) {
        console.log("error", error);
    }
}