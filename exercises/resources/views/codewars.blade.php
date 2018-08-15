<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<script>
 alert("hello");
    function alphabetPosition(text) {
        let individual;
        let alphabet;
        alert("hello 1");
        if(typeof text == "string"){
            alert("hello");
            var individualss = text.toLowerCase().split("");
            individual = individualss.toString();
            alphabet = {"a" :1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9,"j":10,"k":11,"l":12,"m":13,"n":14,"o":15,"p":16,"q":17,"r":18,"s":19,"t":20,"u":21,"v":22,"w":23,"x":24,"y":25,"z":26};
        //      alphabet = alphabetss.toString();
        //     var assign = {};
        //     var count = 0;
        //     alphabetss.forEach(function(i){
        //     for(i in individual){
            for(var i=0; i<individual.length; i++){
                for(var j=0; j<26; j++){
                    if(individual[i] ==alphabet[j]){
                    
                        var replaced = individual.replace(individual[i],alphabet.alphabet[j]);
            //           var joined = replaced.join();
                    }
                }
            }
        }
        return replaced;
    }
</script> 
</body>
</html>