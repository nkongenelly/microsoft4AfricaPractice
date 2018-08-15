function braces(arr1){
    var result;
    var result1;
    var result2;
    var result3;
    // arr1 = "{)(}[]";
    var arr = arr1.split("");
    for(i=0;i<arr.length;i++){
        if(arr[i] == "{"){
            var close1 = arr.indexOf("}");
            // console.log(close1);
            if(close1 > i){
                result1 = true;
                // console.log(result1);
                 delete arr[i];
                 delete arr[close1];
            }else{
                result1 = false;
                // console.log(result1);
                 
            }
           
        }
        if(arr[i] == "("){
            var close2 = arr.indexOf(")");
            if(close2 > i){
                result2 = true;
                delete arr[i];
                delete arr[close2];
                
            }else{
                result2 =false;
                
            }
            // console.log(result2);
        }
        if(arr[i] == "["){
            var close3 = arr.indexOf("]");
            if(close3 > i){
                result3 = true;
                delete arr[i];
               delete arr[close3];
                
            }else{
                result3 = true;
                
            }
            // console.log(result3);
        }
    }
    // console.log(result1+", "+result2+", "+result3);
        // alert("1");
        if((result1 == true)&&(result2 == true)&&(result3 == true)){

            result = true; 
            // console.log(result);
        }else{result = false;
            // console.log(result);
        }
    // }
    return result;

}
$res = braces("{(}[)]");
console.log($res);  