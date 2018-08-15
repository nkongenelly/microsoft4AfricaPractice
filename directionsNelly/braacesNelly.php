<?php
function braces($arr1){
    $result;
    $result1;
    $result2;
    $result3;
    // arr1 = "{)(}[]";
    $arr = str_split($arr1);
    for($i=0;i<count($arr);$i++){
        if($arr[i] == "{"){
            $curly = "}";
            $close1 = strpos($arr,$curly);
            // console.log(close1);
            if($close1 > $i){
                $result1 = true;
                // console.log(result1);
                
                 unset ($arr[$i]);
                 unset ($arr[$close1]);
            }else{
                $result1 = false;
                // console.log(result1);
                 
            }
           
        }
        if($arr[i] == "("){
            $brackets = ")";
            $close2 = strpos($arr,$brackets);
            if($close2 > i){
                $result2 = true;
                unset ($arr[$i]);
                unset ($arr[$close2]);
                
            }else{
                $result2 =false;
                
            }
            // console.log(result2);
        }
        if($arr[i] == "["){
            $square = "]";
            $close3 = strpos($arr,$square);
            if($close3 > $i){
                $result3 = true;
                unset ($arr[$i]);
               unset ($arr[$close3]);
                
            }else{
                $result3 = true;
                
            }
            // console.log(result3);
        }
    }
    // console.log(result1+", "+result2+", "+result3);
        // alert("1");
        if(($result1 == true)&&($result2 == true)&&($result2 == true)){

            $result = true; 
            // console.log($result);
        }else{$result = false;
            // console.log($result);
        }
    // }
    return $result;

}
$res = braces("{(}[)]");
echo $res;
?>