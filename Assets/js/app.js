const searchBtn = document.getElementById("citySearchBtn")
const cityInput = document.getElementById("cityInput")
$("form").on("submit", function(e){
    e.preventDefault()
    // create a list item
    let input = $("#cityInput").val()
    getCurrentWeather(input)
})

function getCurrentWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71c4b05ab2d24a5c3b0e79e073c862da")
        .then(response => response.JSON)

        .then(data => {
            getForecast(city)
            console.log(data);
            getUVIndex(data.coord.lat, data.coord.lon)
        })

function getForecast(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=71c4b05ab2d24a5c3b0e79e073c862da")
        .then(response => response.JSON)

        .then(data => {
            console.log(data);
            $("#temp").text(data.value)
        })

function getUVIndex(city) {
    fetch("http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=71c4b05ab2d24a5c3b0e79e073c862da")
    .then(response => response.JSON)

    .then(data => {
        $("#uvIndex").text(data.value)
        $("#uvIndex").attr("class", "safe")
    })

}