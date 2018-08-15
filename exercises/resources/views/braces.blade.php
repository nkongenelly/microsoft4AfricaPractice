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
        <button type='button'name='submit' onclick="braces()">click</button>
    </form>
    <script>
        console.log("1");
        function braces(arr1){
            var result;
            var result1;
            var result2;
            var result3;
            arr1 = "{)(}[]";
            var arr = arr1.split("");
            for(i=0;i<arr.length;i++){
                if(arr[i] == "{"){
                    var close1 = arr.indexOf("}");
                    console.log(close1);
                    if(close1 > i){
                        result1 = true;
                        console.log(result1);
                         
                    }else{
                        result1 = false;
                        console.log(result1);
                         
                    }
                   
                }
                if(arr[i] == "("){
                    var close2 = arr.indexOf(")");
                    if(close2 > i){
                        result2 = true;
                        
                    }else{
                        result2 =false;
                        
                    }
                    console.log(result2);
                }
                if(arr[i] == "["){
                    var close3 = arr.indexOf("]");
                    if(close3 > i){
                        result3 = true;
                        
                    }else{
                        result3 = true;
                        
                    }
                    console.log(result3);
                }
            }
            console.log(result1+", "+result2+", "+result3);
                alert("1");
                if((result1 == true)&&(result2 == true)&&(result2 == true)){

                    result = true; console.log(result);
                }else{result = false;
                    console.log(result);
                }
            // }

        }
        // document.getElementById("demoForm").addEventListener("submit", getDirections);
        // getDirections(['NORTH','SOUTH','SOUTH','EAST','WEST','WEST']);
        // document.getElementById("demo").innerHTML = result;
    </script>
</body>
</html>