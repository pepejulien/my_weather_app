var api_key = "9bf62d51827dfcd46ed2fac7d8f7562f";
var temp;
var icon;
var loc;
var humidity;
var wind;
var direction;

function updateByZip(zip){
  var url = "http://api.openweathermap.org/data/2.5/weather?"+"zip="+zip+"&APPID="+api_key;

  sendRequest(url);
};

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var data = JSON.parse(xmlhttp.responseText);
      var weather = {};
      weather.icon = data.weather[0].id;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.direction = data.wind.deg;
      weather.loc = data.name;
      weather.temp = KtoF(data.main.temp);
      update(weather);
    };
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

function degreesToDirection(){
  return "N";
};

function KtoC(k){
  return Math.round(k - 273.15);
};

function KtoF(k){
  return Math.round(k*(9/5)-459.67);
};

function update(weather){
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "imgs/codes/" + weather.icon + ".png";
  console.log(icon.src);
};

window.onload = function() {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

  updateByZip(33125);
};

document.querySelector('#btn').addEventListener('click', function(event) {
        updateByZip(document.querySelector('#zip-code').value)
});

document.querySelector('#zip-code').addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {

            updateByZip(event.target.value)
        }
});
