//weather api
var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var img = document.querySelector('.img');
var sr = document.querySelector('.sunrise');
var ss = document.querySelector('.sunset');

button.addEventListener('click', function(name) {
    if (input.value == '') {
        alert('enter city name');
        return
    }
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + config.APIKEY)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var tempValue = data['main']['temp'];
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];
            img.setAttribute('src', 'http://openweathermap.org/img/wn/' + data['weather'][0]['icon'] + '@2x.png')
            main.innerHTML = nameValue;

            function unixTime(x) {
                var date = new Date(x * 1000);
                var hours = date.getHours();
                var hoursF = date.getHours() % 12;
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                let amPM;
                if (hours < 12) {
                    amPM = "AM";
                } else {
                    amPM = "PM"
                }
                return hoursF + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + " " + amPM;
            }
            sr.innerHTML = "Sunrise - " + unixTime(data['sys']['sunrise']);
            ss.innerHTML = "Sunset - " + unixTime(data['sys']['sunset']);
            desc.innerHTML = "Desc - " + descValue;
            temp.innerHTML = "Temp - " + tempValue;
            input.value = "";

        })

    .catch(err => alert("Wrong city name!"));
})