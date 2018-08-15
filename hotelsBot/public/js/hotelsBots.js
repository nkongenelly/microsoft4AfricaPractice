var methods = ["GET", "POST"];
contentType = ["Content-type", "application/json"];
var baseUrl = "https://api.kaiza.la";
var baseUrl1 = "http://127.0.0.1:8000/";
//var contentType = ["application/x-www-form-urlencoded", "application/json"];

//CREATE THE FORM 
// Dynamic function for calling webservices
function createObject(readyStateFunction,requestMethod,requestUrl, sendData = null,  contentType = null, refreshToken = null, accessToken = null, applicationId,  vars){
    
    var obj = new XMLHttpRequest;

    obj.onreadystatechange = function(){
        if((this.readyState ==4) && (this.status ==200)){
            readyStateFunction(this.responseText);
        }
        
    };
   
    obj.open(requestMethod, requestUrl, true);
    // if (contentType != 'null'){
    
    // if (connectorId != null){
        
    //     // obj.setRequestHeader("applicationId", connectorId );
    // }
    // if (connectorSecret != null){
        
    //     // obj.setRequestHeader("applicationSecret", connectorSecret );
    // }
    if (refreshToken  != null){
        
        
        obj.setRequestHeader("applicationId", vars[0]);
        obj.setRequestHeader("applicationSecret", vars[1]);
        obj.setRequestHeader("refreshToken", refreshToken);
        

        //obj.setRequestHeader("Content-type", 'application/json' );
        
    }
    if (accessToken  != null){
        
        obj.setRequestHeader("accessToken", accessToken);
        
    }

    if (applicationId  != null){
        
        obj.setRequestHeader("applicationId", vars[0]);
        
    }
    
    if (requestMethod == 'POST'){
        obj.setRequestHeader("Content-type", contentType );
        // obj.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
        obj.send(sendData);
    } else
    {
        obj.send();
    }

}

function generatePin(connectorNumber,connectorId){
    document.getElementById("pinForm").style.display = "block";
    document.getElementById("createGroup").style.display = "none";

    var url = baseUrl + "/v1/generatePin";
    var data = '{"mobileNumber":"'+connectorNumber+'", applicationId:"'+connectorId+'"}';
    console.log(data);

    createObject(showForm, methods[1], url, data, contentType[1]);
}
// function generatePin(connectorId,connectorNumber){
//     var sendData = '{"mobileNumber":"'+connectorNumber+'", applicationId:"'+connectorId+'"}';
//     console.log(sendData);
//     createObject(showForm, method[1], baseUrl + "/v1/generatePin", sendData);
//     }


function showForm(responseText){
    

}
    
function sendPin(e){
    //Get values submitted
    e.preventDefault();
    var applicationId = document.getElementById('connectorId').value;
    var applicationSecret = document.getElementById('connectorSecret').value;
    var connectorNumber = document.forms["generatesPin"]["connectorNumber"].value; 
    
    var enterPin = document.forms["generatesPin"]["enterPin"].value; 

    var url = baseUrl +"/v1/loginWithPinAndApplicationId";
    var data = '{"mobileNumber":"'+connectorNumber+'","applicationId":"'+applicationId+'", "applicationSecret":"'+applicationSecret+'", "pin":"'+enterPin+'"}';
    //var data = "connector_number"+connectorNumber+"&conector_secret"+conector_secret+"&connector_id"+connector_id+"&enterPin"+enterPin;
    console.log(data);
    // var vars = [connector_id, conector_secret, enterPin, connectorNumber];
    createObject(refreshTheToken, methods[1], url, data, contentType[1]);
    
}

function refreshTheToken(jsonResponse){
    var responseObj = JSON.parse(jsonResponse);
    var refreshToken = responseObj.refreshToken;
    var endpointUrl = responseObj.endpointUrl;
    var accessToken = responseObj.accessToken;

    console.log(responseObj);

    var connector_secret = document.forms["generatesPin"]["connectorSecret"].value;
    var connector_id = document.forms["generatesPin"]["connectorId"].value;
   
   var vars = [connector_id, connector_secret];
    var url = endpointUrl + "v1/accessToken";
    console.log(vars);
    console.log(url);
   
    // var vars = [connector_id, conector_secret, enterPin, connector_number, endpointUrl, refreshToken];
   
    // vars[vars.push] = endpointUrl;
    // vars[vars.length] = refreshToken;

    createObject(accessTheToken, methods[0], url, null, null, refreshToken, null, null, vars);

}

function accessTheToken(jsonResponse,){
    var responseObj = JSON.parse(jsonResponse);
    var accessToken = responseObj.accessToken;
    var endpointUrl = responseObj.endpointUrl;
    console.log(responseObj);
    //var accessToken1  = responseObj.accessToken1;
    // var vars = [connector_id, conector_secret, enterPin, connector_number, endpointUrl, refreshToken, accessToken];
    var connector_secret = document.forms["generatesPin"]["connectorSecret"].value;
    var connector_id = document.forms["generatesPin"]["connectorId"].value;
    var connector_number = document.forms["generatesPin"]["connectorNumber"].value;
   
   var vars = [connector_id, connector_secret, connector_number, endpointUrl];
    vars[vars.length] = accessToken;
    connectorNumber = vars[2]
    accessToken1 = accessToken;
    endpointUrl1 = endpointUrl;
    console.log(vars);
    // var url = endpointUrl + "v1/users/me";
    
    var url = endpointUrl + "/v1/groups?fetchAllGroups=true&showDetails=true";

    createObject(showGroups, methods[0], url, null, null, null, accessToken, null, vars);
    }

    function showGroups(jsonResponse){
        var response = JSON.parse(jsonResponse);
        var responseObj = response.groups;
        //var response = JSON.parse(responseObj.members);
        console.log(responseObj);
        var tdata, count = 0, tableData="<button class ='btn btn-primary' type = 'button' onclick = 'viewYourGroup()'>View Your Groups</button><button class ='btn btn-primary' type = 'button' onclick = 'createGroup()'>Create Group</button><button class ='btn btn-primary' type = 'button' onclick = 'getChats()'>Chats</button><table class = 'table table-bordered table-striped table-condensed'><tr><th>#</th><th>Group Name</th class = 'hide'><th>Group Id</th></tr>";
        for (tdata in responseObj)
        {
            count++;
            tableData +="<tr><td>" +count+ "</td>";
            tableData +="<td>" + responseObj[tdata].groupName + "</td>";        
            tableData +="<td class = 'hide'>" + responseObj[tdata].groupId + "</td>";        

            tableData +="<td><a href = '#' class ='btn btn-info bt-sm' onclick = 'showSingleGroup("+responseObj[tdata].groupId+")'>View </a></td>" ;
             }
        tableData +="</table>";
        // document.getElementsByClassName("hide")[0].style.display = "none";
        // document.getElementsByClassName("hide")[1].style.display = "none";
        document.getElementById("showQuery").innerHTML = tableData;
        document.getElementById("pinForm").style.display = "none";
        document.getElementById("createGroup").style.display = "none";
    }


    function viewYourGroup(jsonResponse){
        var test_groupId = document.forms["generatesPin"]["test_groupId1"].value;
        var url = endpointUrl1 +"v1/groups/21f8b0f1-ea3d-4386-8bc7-7052348aeb5b/subGroups";
        createObject(viewMyGroup, methods[0], url, null, null, null, accessToken1);

    } 

        function viewMyGroup(jsonResponse){
        var responseObj = JSON.parse(jsonResponse);
        //var responseObj = response.groups;
        //var response = JSON.parse(responseObj.members);
        console.log(responseObj);
        var tdata, count = 0, tableData="<button class ='btn btn-primary' type = 'button' onclick = 'showGroups()'>Back</button><table class = 'table table-bordered table-striped table-condensed'><tr><th>#</th><th>Group Name</th><th>Role</th><th>No. of Users</th><thclass = 'hide' >Group Id</th></tr>";
     
            count++;
            tableData +="<tr><td>" +count+ "</td>";
            tableData +="<td>" + responseObj.groupName + "</td>";        
            tableData +="<td>" + responseObj.callerRole + "</td>";        
            tableData +="<td>" + responseObj.userCount + "</td>"; 
            tableData +="<td class = 'hide'>" + responseObj.groupId + "</td>";               

            tableData +="<td><a href = '#' class ='btn btn-info bt-sm' onclick = 'showSingleGroup("+responseObj.groupId+")'>View </a></td>" ;
            tableData +="<td><a href = '#' class ='btn btn-success btn-sm' onclick ='sendMessage("+responseObj.patient_id+",\""+responseObj.full_name+"\",\"" +responseObj.national_id+"\",\"" +responseObj.gender+"\",\"" +responseObj.date_of_birth +"\")'>Post A Message </a></td>" ;
            tableData +="<td><a href = '#' class ='btn btn-danger bt-sm' onclick = 'getChats()'>View Chat </a></td>" ;
            tableData +="<td><a href = '#' class ='btn btn-info bt-sm' onclick = 'submitVisitsForm("+responseObj.patient_id+")'>Post A Message</a></td></tr>" ;
       
        
        tableData +="</table>";
        // document.getElementsByClassName("hide")[2].style.display = "none";
        // document.getElementsByClassName("hide")[3].style.display = "none";
        document.getElementById("showQuery").innerHTML = tableData;
        document.getElementById("pinForm").style.display = "none";
    }

    
    function showSingleGroup(){
       // var response = JSON.parse(jsonResponse);
        var test_groupId = document.forms["generatesPin"]["test_groupId"].value;
        var url =  endpointUrl1 + "/v1/groups/" +test_groupId;
        createObject(singleGroup, methods[0], url, null, null, null, accessToken1, applicationId);

    }

    function singleGroup(){
        var responseObj = response.groups;
        //var response = JSON.parse(responseObj.members);
        console.log(responseObj);
        var tdata, count = 0, tableData="<button class ='btn btn-primary' type = 'button' onclick = 'viewYourGroup()'>View Your Groups</button><table class = 'table table-bordered table-striped table-condensed'><tr><th>#</th><th>Group Name</th class = 'hide'><th>Group Id</th></tr>";
        for (tdata in responseObj)
        {
            count++;
            tableData +="<p>" +count+ "</p>";
            tableData +="<h1>" + responseObj[tdata].groupName + "</h1>";        
            tableData +="<h1 class = 'hide'>" + responseObj[tdata].groupId + "</h1>";        

            tableData +="<td><a href = '#' class ='btn btn-info bt-sm' onclick = 'showSingleGroup("+responseObj[tdata].groupId+")'>View </a></td>" ;
             }
        tableData +="</table>";
        // document.getElementsByClassName("hide")[0].style.display = "none";
        // document.getElementsByClassName("hide")[1].style.display = "none";
        document.getElementById("showQuery").innerHTML = tableData;
        document.getElementById("pinForm").style.display = "none";
        document.getElementById("createGroup").style.display = "none";
    }

    function createGroup(){
        document.getElementById("createGroup").style.display = "block"
        document.getElementById("pinForm").style.display = "none"

        var groupName = document.forms["group"]["groupName"].value;
        var phone1 = document.forms["group"]["phone1"].value;
        var phone2 = document.forms["group"]["phone2"].value;
        var phone3 = document.forms["group"]["phone3"].value;
    
        var url = endpointUrl1 + "/v1/groups";
        var data ='{name:"'+groupName+'", welcomeMessage:"Welcome to group created by Nelly", members:["'+phone1+'", "'+phone2+'", "'+phone3+'"]}';
        createObject(confirm, methods[1], url, data, contentType[1], null, accessToken1);
    }

    function confirm(){
        alert("group created succesfully");
    }

    function getChats(){
        //var $responseObj = file_get_contents('https://putsreq.com/QoGj70Ls2QS1rNc295E0/inspect');
        // var fs = require("fs");
        // var responseObj = fs.readFileSync("https://putsreq.com/QoGj70Ls2QS1rNc295E0/inspect").toString('utf-8');
        // var textByLine = responseObj.split("\n")
        // console.log(textByLine);
       //document.write(' <?php $.post("/", { srcToGet: "https://putsreq.com/QoGj70Ls2QS1rNc295E0/inspect"}, function(data){document.getElementById("somediv").innerHTML = data;}); ?> ');
     
       createObject(getWord, methods[0],baseUrl1 + "getChats", null, contentType[0]);
    }

    function getWord(jsonResponse){
        var responseObj = JSON.parse(jsonResponse);
        var text = responseObj.request_body_as_string;
               console.log(text);
        //createObject(sendWarning, methods[0], url, null, null, null, accessToken1);
    }

    function sendWarning(jsonResponse){
        var responseObj = JSON.parse(jsonResponse);
        // var responseObj = response.data;
        console.log(responseObj);
        // var table = "h1" +responseObj.data+"</h1>";
        
        // if(responseObj.data == "/bomb/i"){
        //     var url = endpointUrl1 +"/v1/groups/4dcea6d1-a197-4525-9917-26da622e249e/messages";
        //     var data = 
        //     createObject(showGroups, methods[1], url, data, contentType[1], null, accessToken1);
        //     {message:"Please use kind words!"}
        //}

    }

    

    document.getElementById("generatedPin").addEventListener("submit", sendPin);
    document.getElementById("formGroup").addEventListener("submit", createGroup);
    
