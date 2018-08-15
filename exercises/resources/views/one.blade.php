<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <linl rel="stylesheet" href="css/bootstrap.min.css"/>
    <script src="main.js"></script>
</head>
<body>
<h1 id ="demo">Question 1 </h1>
<p>

Write a function that converts user entered date formatted as M/D/YYYY to a format required by an API (YYYYMMDD). The parameter "userDate" and the return value are strings.

For example, it should convert user entered date "12/31/2014" to "20141231" suitable for the API.
</p>
<p id = "question1"></p>
<button type = "button" onclick ="question1()" class = "btn-btn-primary">Check Answer</button>
<script>
    function question1() {
    function formatDate(userDate) {
    // format from M/D/YYYY to YYYYMMDD
    var userDate;
    if(typeof userDate == "string"){
        var changeDate = userDate.split('/');
        var year = changeDate[2];
        if(changeDate[0].length == 1){
        var month = "0" + changeDate[0];
        }else
        {
            var month = changeDate[0];
        }
        if(changeDate[1].length == 1){
        var day = "0" + changeDate[1];
        }else
        {
            var day = changeDate[1];
        }
        var date = year + month + day;
        var date1 = date.toString("");
        document.getElementById("question1").innerHTML = date1;
        // return date1;
    }
    // return date1;
    }

    console.log(formatDate("12/31/2014"));
    }
</script>

<h1 id ="demo">Question 2 </h1>
<p>

Implement the ensure function so that it throws an error if called without arguments or the argument is undefined. Otherwise it should return the given value.
</p>
<button type = "button" onclick ="question2()" class = "btn-btn-primary">Check Answer</button>
<script>
    function question2() {
    function formatDate(userDate) {
    // format from M/D/YYYY to YYYYMMDD
    var userDate;
    if(typeof userDate == "string"){
        var changeDate = userDate.split('/');
        var year = changeDate[2];
        if(changeDate[0].length == 1){
        var month = "0" + changeDate[0];
        }else
        {
            var month = changeDate[0];
        }
        if(changeDate[1].length == 1){
        var day = "0" + changeDate[1];
        }else
        {
            var day = changeDate[1];
        }
        var date = year + month + day;
        var date1 = date.toString("");
        return date1;
    }
    }

    console.log(formatDate("12/31/2014"));
    }
</script>

<h1 id ="demo">Question 3 </h1>
<p>



Implement the removeProperty function which takes an object and property name, and does the following:

If the object obj has a property prop, the function removes the property from the object and returns true; in all other cases it returns false.

</p>
<button type = "button" onclick ="question3()" class = "btn-btn-primary">Check Answer</button>
<script>
    function question3() {
    function removeProperty(obj, prop) {

        if(obj.hasOwnProperty(prop)){

        delete obj[prop];
        return true;
        }


        return false;
        }
    }
</script>




</body>
</html>