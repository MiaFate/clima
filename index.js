function obtenerPosicion() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function obtenerClima() {
  const position = await obtenerPosicion();
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = `287807033c186226918ef742cec2d9c9`

  const response = await fetch(
    `${url}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=sp`
  );

  const data = await response.json();
  console.log(data);
  return data;
}

try {
    const datosClima= await obtenerClima()
    
    document.getElementById('lugar').textContent = `Ubicacion: ${datosClima.name}, ${datosClima.sys.country}`
    datosClima.weather.forEach(clima => {
      const img = document.createElement("img")
      img.src = `http://openweathermap.org/img/wn/${clima.icon}@2x.png`
      img.alt = `${clima.description} icon`
      document.getElementById('icons').appendChild(img)
      //document.getElementById('icon').setAttribute(`src`,`http://openweathermap.org/img/wn/${clima.icon}@2x.png`)
    });
    
    document.getElementById('temp').textContent = `Temperatura Actual: ${Math.round(datosClima.main.temp * 10) / 10}°C`
    document.getElementById('feels_like').textContent = `Sensacion Termica: ${Math.round(datosClima.main.feels_like * 10) / 10}°C`
    document.getElementById('humidity').textContent= `Humedad: ${datosClima.main.humidity}%`
    document.getElementById('wind').textContent= `Viento: ${Math.round((datosClima.wind.speed * 3.6) * 10) / 10} Km/h`
    //document.getElementById('').textContent =
    //document.getElementById('').textContent =
  //document.getElementById('datos').innerHTML = JSON.stringify(await obtenerClima());

} catch (error) {
  console.log(error.message);
}