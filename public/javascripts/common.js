$(function() {
    $('#postDate').html('Posted on ' + getCurrentDate());
});

function getCurrentDate() {
     var date = new Date();
     var monthArray=new Array
     ("January","February","March","April","May","June","July","August",
     "September","October","November","December");
     var weekArray = new Array("Sunday","Monday","Tuesday",
          "Wednesday","Thursday","Friday","Saturday");
     month=date.getMonth();
     day=date.getDate();
     if(day.toString().length == 1){
         day="0"+day.toString();
     }
     return(monthArray[month]+" "+day+", "+
         date.getFullYear() + " at " + 
         checkTime(date.getHours()) + ":" + 
         checkTime(date.getMinutes()) + "  " + 
         weekArray[date.getDay()]);
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}