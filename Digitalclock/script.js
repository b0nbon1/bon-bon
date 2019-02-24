function digitalclock() {
    var date = new Date();
    var hours = date.getHours() + '';
    var minutes = date.getMinutes() + '';
    var seconds = date.getSeconds() + '';
    var day = date.getDay() + '';
    // var dates = date.getDate() + '';
    // var month = date.getMonth() + '';
    // var year = date.getFullYear() + '';

    if (hours.length < 2){
        hours = '0' + hours;
    }
    if (minutes.length < 2){
        minutes = '0' + minutes;
    }
    if (seconds.length < 2){
        seconds = '0' + seconds;
    }
    // if (dates.length < 2){
    //     dates = '0' + dates;
    // }
    // if (month.length < 2){
    //     month = '0' + month;
    // }
    
    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var clock = weekDays[day] + ', ' + hours + ':'+ minutes+':'+seconds;
     
    document.getElementById('clock').innerHTML = clock;
}

digitalclock();
setInterval(digitalclock, 1000);
