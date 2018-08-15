// <?php
//      $arr1 = array("NORTH","SOUTH");
//       $arr = str_split($arr);
   function getDirections($arr){
       $arr = array("NORTH","SOUTH");
    //   $arr = str_split($arr1);
    
    // arr = ["NORTH","SOUTH","SOUTH","EAST","WEST","WEST"];
    for($i = 0; $i < count($arr); $i++){
        if(($arr[$i] == "NORTH")and($arr[$i+1]=="SOUTH")){
            $one = array_splice($arr,$i,2);
            // console.log(one);
        }else if(($arr[$i] == "SOUTH")and($arr[$i+1]=="NORTH")){
            //  $index
            $two = array_splice($arr,$i,2);
            // console.log(two);
        }else if(($arr[$i] == "EAST")and($arr[$i+1]=="WEST")){
            $three = array_splice($arr,$i,2);
            // console.log(three);
        }else if(($arr[$i] == "WEST")and($arr[$i+1]=="EAST")){
             $four = array_splice($arr,$i,2);
            // console.log(four);
        }
        // document.getElementById("demo").innerHTML = arr;
        // console.log(arr);
    }
    echo $arr;
    return $arr;
}

getDirections(array("NORTH","SOUTH"));
?>