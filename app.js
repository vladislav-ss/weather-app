window.addEventListener('load', ()=> {
    let long;
    let lat;
    const api_key = 'dd5c611fabab8f629f108cbdcb8c9e0a';

    let description = document.querySelector('.description');
    let temperature = document.querySelector('.degrees');
    let location = document.querySelector('.location-timezone');

    let htmlIcon = document.getElementById("icon");
    let icon = document.createElement("img");
    let iconImage;

    let celsiusButton = document.querySelector(".celsius");
    let fahrenheitButton = document.querySelector(".fahr");
    let kelvinButton = document.querySelector(".kelvin");
    let degreetype = document.querySelector(".degreetype");

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
                console.log(data);
                ktemp = data.main.temp;
                temperature.textContent = Math.round(ktemp - 273.15);
                description.textContent = "Currently: " + data.weather[0].description;
                iconImage = data.weather[0].icon;
                location.textContent = data.name + `, ${data.sys.country}`;
                console.log(iconImage);
                icon.src = `http://openweathermap.org/img/wn/${iconImage}@2x.png`;
                htmlIcon.appendChild(icon);
            })
            
        });    
    }else{
        location.textContent = "Allow geolocation in order to use the app";
    }

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
        temperature.textContent = Math.floor(ktemp);
        degreetype.textContent = "K";
    });
});


setTimeout(function(){
    window.location.reload(1);
 }, 600000);
