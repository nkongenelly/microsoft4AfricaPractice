var xhttp = require("https"); 
//to send a http request with nodejs using xhttp object
//it will export this azure functions to azure portal and the function will be called with the parameter object context
module.exports = function(context, req){
    var patientId = req.query.patId;
    //1st parameter is url then 2nd is callback function
    xhttp.get("https://nanyukiaf-hospital-nelly.azurewebsites.net/getSinglePatient/"+patientId, callBack);
    //https://nanyukiaf-hospital-nelly.azurewebsites.net/getAllPatients?patId=1
    var data = "";
    function callBack(resp){
        //.on means if it has captured data, then call another fumction i.e arrow function (response)
        resp.on("data", (response) => {
            //.res is defined in the function.json as outgoing data
        //context.log(data);
        data +=response;
        });
        //context has properties like .res keyword 'start' and 'end'
        resp.on("end", () =>{
            context.log(data);
            context.res ={
                 //whatever is in the body part will be displayed to the user
            body: data
            }
            context.done();
        });

    }
   
};

