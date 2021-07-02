window.addEventListener('load', ()=> { // makes the script to wait for the page to load
    let long;
    let lat;
    const api_key = 'dd5c611fabab8f629f108cbdcb8c9e0a';

    const description = document.querySelector('.description');
    const temperature = document.querySelector('.degrees');
    const location = document.querySelector('.location-timezone');

    const icon = document.querySelector('.icon');
    const iconplace = document.querySelector('.iconplace');

    const celsiusButton = document.querySelector(".celsius");
    const fahrenheitButton = document.querySelector(".fahr");
    const kelvinButton = document.querySelector(".kelvin");
    const degreetype = document.querySelector(".degreetype");

    // Get geolocation, retrieve data through the API and display it on the app window
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;
            
            fetch(api)
            .then(input => {
                return input.json();
            })
            .then(data => {
                ktemp = data.main.temp;
                temperature.textContent = Math.round(ktemp - 273.15);
                description.textContent = "Currently: " + data.weather[0].description;
                location.textContent = data.name + `, ${data.sys.country}`;
                icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                let newimg = document.createElement("img");
                newimg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                iconplace.appendChild(newimg);
            })
            
        });    
    }else{
        location.textContent = "Allow geolocation in order to use the app";
    }


    // Degree selector buttons
    celsiusButton.addEventListener('click', ()=> {
        celsiusButton.classList.add("selected");
        fahrenheitButton.classList.remove("selected");
        kelvinButton.classList.remove("selected");
        temperature.textContent = Math.round(ktemp - 273.15);
        degreetype.textContent = "°C";
    });

    fahrenheitButton.addEventListener('click', ()=> {
        celsiusButton.classList.remove("selected");
        fahrenheitButton.classList.add("selected");
        kelvinButton.classList.remove("selected");
        temperature.textContent = Math.round(ktemp * 9/5 - 459.67);
        degreetype.textContent = "°F";
    });

    kelvinButton.addEventListener('click', ()=> {
        celsiusButton.classList.remove("selected");
        fahrenheitButton.classList.remove("selected");
        kelvinButton.classList.add("selected");
        temperature.textContent = Math.round(ktemp);
        degreetype.textContent = "K";
    });
});

// Refresh page every 10 mins
setTimeout(function(){
    window.location.reload(1);
 }, 600000);
