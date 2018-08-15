function getDirections(arr){
    
    // arr = ["NORTH","SOUTH","SOUTH","EAST","WEST","WEST"];
    for(i=0;i<arr.length;i++){
        if((arr[i] == "NORTH")&&(arr[i+1]=="SOUTH")){
           var one = arr.splice(i,2);
            // console.log(one);
        }else if((arr[i] == "SOUTH")&&(arr[i+1]=="NORTH")){
            // var index
           var two = arr.splice(i,2);
            // console.log(two);
        }else if((arr[i] == "EAST")&&(arr[i+1]=="WEST")){
           var three = arr.splice(i,2);
            // console.log(three);
        }else if((arr[i] == "WEST")&&(arr[i+1]=="EAST")){
            var four = arr.splice(i,2);
            // console.log(four);
        }
        // document.getElementById("demo").innerHTML = arr;
        // console.log(arr);
    }
    return arr;
}

$res = getDirections(["NORTH","SOUTH"]);
console.log($res);