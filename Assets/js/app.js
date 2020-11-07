const searchBtn = document.getElementById("citySearchBtn");
const cityInput = document.getElementById("cityInput");



function formSubmitHandler(e) {
    e.preventDefault();
    let city = cityInput.value.trim();
    
    if (city) {
        getCurrentWeather(city);
  
      cityInput.value = '';
    } else {
      
    }
  };

function getCurrentWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b96b52626f78508367acbb00dd591cd2`)
      .then(response => response.json())
         // save city into local storage

        //create html elements with response.data

        // call other functions
        
      .then(data => {

          getForecast(city);
          // console.log(data)
          getUVIndex(data.coord.lat, data.coord.lon)
          
        })
        //console.log("fetching")
}

function getForecast(city){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=b96b52626f78508367acbb00dd591cd2`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }
  
  function getUVIndex(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b96b52626f78508367acbb00dd591cd2`)
    .then(response => response.json())
    .then(data => {
      $("#uvIndex").text(data.value);
      if (data.value <= 2){
        $("#uvIndex").attr("class", "safe");
      } else if (data.value <= 5) {
        $("#uvIndex").attr("class", "moderate");
      } else if (data.value <= 7) {
        $("#uvIndex").attr("class", "high");
      } else if (data.value <= 10) {
        $("#uvIndex").attr("class", "veryHigh");
      } else if (data.value > 10)
      $("#uvIndex").attr("class", "danger");
    })
    $("#card-row").empty();
    for (let i = 0; i < data.list.length; i+= 8){
      cardInformer(data.list[i]);
    }
  }

  let cardInformer = function (data){
    let iconImg = data.weather[0].icon;
    let card = $("<div>");
    let body = $("<div>");
    let head = $("<h4>");
    let icon = $("<img>");
    let temp = $("<p>");
    let humidity = $("<p>");

    card.attr("style", "width: 160px; margin-right 10px")
    icon.attr("src", "https://openweathermap.org/img/w/" + iconcode + ".png")



  }
  
searchBtn.addEventListener("click", formSubmitHandler);

// $("#temp").text(data.list[0].main.temp)