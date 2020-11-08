const searchBtn = document.getElementById("cityBtn");
const cityInput = document.getElementById("cityInput");

$("form").on("submit", function(e){
  e.preventDefault()
    //Created an item for my list
    let input= $("#cityInput").val();
    let item = $("<li>")
    item.text(input)
    $("#citySearchHistory").prepend(item)

    getCurrentWeather(input);
    
})
// function to obtain the current weather data 
function getCurrentWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=71c4b05ab2d24a5c3b0e79e073c862da`)
      .then(response => response.json())
      .then(data => {
        //Filling up card with response.data
        let weatherImg = data.weather[0].icon;
        let currentDay = moment(data.dt_txt).format("L");
          $("#info").text(data.name + " " + currentDay)
          $("#pic1").attr("src", "https://openweathermap.org/img/w/" + weatherImg + ".png")
          $("#temp").text("Temp: " +data.main.temp + "°F")
          $("#feelsLike").text("Feels Like: " + data.main.feels_like + "°F")
          $("#humidity").text("Humidity: " + data.main.humidity + "%")
          $("#windSpeed").text("Wind Speed: " + data.wind.speed + "Mph")
          // Call the functions
        getForecast(city);
        getUVIndex(data.coord.lat, data.coord.lon)
        })
        
}
// function that retrieves the forecast from the api and a for loop to loop through the data
function getForecast(city){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=71c4b05ab2d24a5c3b0e79e073c862da`)
    .then(response => response.json())
    .then(data => {
      $("#dataRow").empty();
      for (let i = 0; i < data.list.length; i+= 8){
        dataCard(data.list[i]);
      }
    })
  }
  //a function for gaining info from api for UV exposure
  function getUVIndex(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=71c4b05ab2d24a5c3b0e79e073c862da`)
    .then(response => response.json())
    .then(data => {
      $("#uvIndex").text(data.value);
      if (data.value <= 2){
        $("#uvIndex").attr("style", "border-radius: 20px; background-color: Green; color: Black; width: 35px;");
      } else if (data.value <= 5) {
        $("#uvIndex").attr("style", "border-radius: 20px; background-color: Yellow; color: Black; width: 35px;");
      } else if (data.value <= 7) {
        $("#uvIndex").attr("style", "border-radius: 20px; background-color: Orange; color: Black; width: 35px;");
      } else if (data.value <= 10) {
        $("#uvIndex").attr("style", "border-radius: 20px; background-color: Red; color: White; width: 35px;");
      } else if (data.value > 10)
      $("#uvIndex").attr("style", "border-radius: 20px; background-color: Purple; color: White; width: 35px;");
    })
  }

  let dataCard = function (data){
    //created info tags for the cards
    let weatherImg = data.weather[0].icon;
    let card = $("<div>");
    let head = $("<h4>");
    let body = $("<div>");
    let icon = $("<img>");
    let temp = $("<p>");
    let humidity = $("<p>");

    // added classes and quality of life aesthetic updates
    card.attr("style", "border-radius: 25px; box-shadow: 3px 2px 5px rgb(20, 0, 0); width: 160px; margin-right 10px; padding: 10px; justify-content: center; background-color:indigo; color: white;")
    icon.attr("src", "https://openweathermap.org/img/w/" + weatherImg + ".png")
    body.addClass("daily-forcast");
    head.addClass("days");

    // Text added
    head.text(moment(data.dt_txt).format("L"));
    temp.text("Temp: " + data.main.temp + " °F");
    humidity.text("Humidity: " + data.main.humidity + "%");

    // card builder
  body.append(head);
  body.append(icon);
  body.append(temp);
  body.append(humidity);
  card.append(body);
  $("#dataRow").append(card);
}