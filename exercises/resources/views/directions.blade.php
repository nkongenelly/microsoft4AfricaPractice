<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
   
</head>
<body>
    <form id="demoForm">
        <p id = "demo"></p>
        <button type='button'name='submit' onclick="getDirections()">click</button>
    </form>
    <script>
        console.log("1");
        function getDirections(arr){
    arr = ["SOUTH","NORTH","NORTH","NORTH","EAST","NORTH","WEST","SOUTH"];
    // arr = ["NORTH","SOUTH","SOUTH","EAST","WEST","WEST"];
    for(i=0;i<arr.length;i++){
        if((arr[i] == "NORTH")&&(arr[i+1]=="SOUTH")){
           var one = arr.splice(i,2);
            console.log(one);
        }else if((arr[i] == "SOUTH")&&(arr[i+1]=="NORTH")){
            // var index
           var two = arr.splice(i,2);
            console.log(two);
        }else if((arr[i] == "EAST")&&(arr[i+1]=="WEST")){
           var three = arr.splice(i,2);
            console.log(three);
        }else if((arr[i] == "WEST")&&(arr[i+1]=="EAST")){
            var four = arr.splice(i,2);
            console.log(four);
        }
        document.getElementById("demo").innerHTML = arr;
        console.log(arr);
    }
    return arr;
}
        // document.getElementById("demoForm").addEventListener("submit", getDirections);
        // getDirections(['NORTH','SOUTH','SOUTH','EAST','WEST','WEST']);
        // document.getElementById("demo").innerHTML = result;
    </script>
</body>
</html>