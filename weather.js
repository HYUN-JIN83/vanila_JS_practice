const COORDS = 'coords'
const API_KEY = '128a1e9b309330dfdcf99e2f047220cc'
const weather = document.querySelector('.js-weather')

// 데이터 가져오기
function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response){ // then() 데이터가 넘어왔을 때 호출함
        return response.json()
    }) 
    .then(function(json){
        const temperature = json.main.temp
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log('Can not access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCodrds = localStorage.getItem(COORDS)
    if(loadedCodrds === null){
        askForCoords()
    }else{
        const parsedCoords = JSON.parse(loadedCodrds)
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init(){
    loadCoords()
}

init()