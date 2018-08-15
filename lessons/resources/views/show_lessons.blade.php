@extends('layouts.master')
@section('content')
        <div id = "inputForm">
            <form class = "form-horizontal" action = "#" method = "POST" id = "saveLesson" name = "lessonsForm" >
                @csrf
                <div class = "inputItems">
                    <label> Lesson Name:</label>
                    <input class = "form-control" type ="text" name = "lessonName"/>
                </div>

                <div class = "inputItems">
                    <label> Lesson Description:</label>
                    <textarea class = "form-control" name = "lessonDescription"></textarea> 
                </div>

                <div class = "inputButton">
                    <button class ="btn btn-primary" type = "submit" id = "saveLessona" >Save Lesson</button>
                    <button class ="btn btn-warning" type="button" onclick="hideInputForm()" >Cancel</button>
                </div>
            </form>
        </div>   
        <div id = "allLessons"></div>
        <div id = "updateForm">
            <form class = "form-horizontal" action = "#" method = "POST" id = "saveLesson1" name = "lessonsForm1">
                    {{csrf_field()}}
                    <div class = "inputItems">
                        <input type ="hidden" name = "lessonId"/>
                        <label> Lesson Name:</label>
                        <input class = "form-control" type ="text" name = "lessonName1"/>
                    </div>

                    <div class = "inputItems">
                        <label> Lesson Description:</label>
                        <textarea class = "form-control" name = "lessonDescription1"></textarea> 
                    </div>

                    <div class = "inputButton">
                        <button class = " btn btn-primary" type = "submit" id = "saveLessona" >Update</button>
                        <button class = " btn btn-warning" type="button" onclick="hideInputForm()" >Cancel</button>
                    </div>
            
            </form>
        </div>
        <div id ="archives"></div>

        
        <script type = "text/javascript">
            var methods = ["GET", "POST"];
            var baseUrl = "http://localhost:8000/";
            
            // Dynamic function for calling webservices
            function createObject(readyStateFunction,requestMethod,requestUrl, sendData = null){
                
                var obj = new XMLHttpRequest;
            
                obj.onreadystatechange = function(){
                    if((this.readyState ==4) && (this.status ==200)){
                        readyStateFunction(this.responseText);
                    }
                    
                };
                obj.open(requestMethod, requestUrl, true);
                if (requestMethod == 'POST'){
                    
                    obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
                    obj.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
                    obj.send(sendData);
                }
                else 
                {
                    obj.send();
                }
            }

            function archives(jsonResponse){

                var responseObj = JSON.parse(jsonResponse);
                var count = 0,tData;
                var tableData = "<table class = 'table table-bordered table-striped table-condensed'><tr><th>#</th><th>Year</th><th>Month Name</th><th> Count</th><th colspan = '2'>Action</tr>";
                
                for (tData in responseObj)
                {
                    count++;
                    tableData +="<tr><td>" + count + "</td>";
                    
                    tableData +="<td>" + responseObj[tData].year + "</td>";
                    tableData +="<td>" + responseObj[tData].month + "</td>";
                    tableData +="<td>" + responseObj[tData].Published + "</td>";
                    tableData +="<td><a href = '#' class ='btn btn-info bt-sm' onclick = 'showLesson("+responseObj[tData]+")'>View </a></td>" ;
                    tableData +="<td><a href = '#' class ='btn btn-danger bt-sm' onclick = 'deleteLesson("+responseObj[tData].id+",\"" +responseObj[tData].name +"\")'>Delete </a></td>" ;

                }
                tableData += "</table>";
                document.getElementById("archives").innerHTML = tableData;
            }

            function dispalLessons(jsonResponse){
                var responseObj = JSON.parse(jsonResponse);
                var count = 0,tData;
                var tableData = "<button class ='btn btn-primary' type = 'button' onclick = 'showInputForm()'>Add Lesson</button><table class = 'table table-bordered table-striped table-condensed'><tr><th>#</th><th>Name</th><th>Description</th><th colspan ='4'> Action</th></tr>";
                
                for (tData in responseObj)
                {
                    count++;
                    tableData +="<tr><td>" + count + "</td>";
                    
                    tableData +="<td>" + responseObj[tData].name + "</td>";
                    tableData +="<td>" + responseObj[tData].description + "</td>";
                    tableData +="<td><a href = '#' class ='btn btn-info bt-sm' onclick = 'showLesson("+responseObj[tData].id+")'>View </a></td>" ;
                    tableData +="<td><a href = '#' class ='btn btn-success btn-sm' onclick ='editLesson("+responseObj[tData].id+",\""+responseObj[tData].name+"\",\"" +responseObj[tData].description +"\")'>Edit </a></td>" ;
                    tableData +="<td><a href = '#' class ='btn btn-danger bt-sm' onclick = 'deleteLesson("+responseObj[tData].id+",\"" +responseObj[tData].name +"\")'>Delete </a></td>" ;
                    tableData +="<td><a href = '#' class ='btn btn-danger bt-sm' onclick = 'viewUnits("+responseObj[tData].id+")'>Units</a></td></tr>" ;
                }
                tableData += "</table>";
                document.getElementById("archives").innerHTML = tableData;
            }

            function displaySingleLesson(responseTxt){
                    var responseObj = JSON.parse(responseTxt);
                    var tableData = "";
                        
                    tableData +="<h1>" + responseObj.name + "</h1>";
                    tableData +="<p>" + responseObj.description + "</p>";
                    tableData +="<button type='button' class= 'btn btn-warning' onclick = 'getLessons()'>Back</button>";
                    
                    document.getElementById("allLessons").innerHTML = tableData;
            }

            function getLessons(){
                //object to get lessons from the DB
                createObject(archives, methods[0],baseUrl + "archives");
                //createObject(displayLessons, methods[0],baseUrl + "getLesson");
                 document.getElementById("inputForm").style.display = "none";
                 document.getElementById("allLessons").style.display = "none";
                 document.getElementById("updateForm").style.display = "none";
                 document.getElementById("archives").style.display = "block";
               
            }

            function viewUnits(lesson_id){
                createObject(viewLessonUnits, methods[0],baseUrl + "getUnits/" +lesson_id);
            }

            
            function viewLessonUnits(responseTxt){
                var tableData = "";
                tableData += "<table class='table table-bordered table-striped table-condensed'><tr><th>Unit name</th><th>Duration</th><th colspan='3'>Actions</th></tr><tbody id='tbody'></tbody>";
                var responseObj = JSON.parse(responseTxt);
                for(var tData in responseObj)
                {
                tableData +="<tr><td>" + responseObj[tData].units_name + "</td>";
                tableData +="<td>" + responseObj[tData].units_hours + "</td>";
                tableData += '<td><a href="#" class="btn btn-sm btn-success" onclick="viewLecturer('+responseObj[tData].units_id+')">Lecturer</a></td>';
                tableData += '<td><a href="#" class="btn btn-sm btn-success" onclick="editUnit('+responseObj[tData].id+',\''+responseObj[tData].name+'\',\''+responseObj[tData].description+'\')">Edit</a></td>';
                tableData += '<td><a href="#" class="btn btn-sm btn-danger" onclick="deleteUnit('+responseObj[tData].id+',\''+responseObj[tData].name+'\')">Delete</a></td></tr>';
                tableData +="<button type='button' class= 'btn btn-warning' onclick = 'getLessons()'>Back</button>";
                }
                tableData += "</table>";
                document.getElementById("allLessons").innerHTML = tableData;
            }

            function viewLecturer(units_id){
                createObject(viewUnitsecturer, methods[0],baseUrl + "getLecturer/" +units_id);
            }

            function viewUnitsecturer(responseTxt){
                var tableData = "";
                tableData += "<table class='table table-bordered table-striped table-condensed'><tr><th>Unit name</th><th>Duration</th><th colspan='3'>Actions</th></tr><tbody id='tbody'></tbody>";
                var responseObj = JSON.parse(responseTxt);
               
                tableData +="<tr><td>" + responseObj.lecturer_name + "</td>";
                tableData +="<td>" + responseObj.telephone + "</td>";
                 tableData +="<button type='button' class= 'btn btn-warning' onclick = 'getLessons()'>Back</button>";
                
                tableData += "</table>";
                document.getElementById("allLessons").innerHTML = tableData;
            }


            // function getLessons(){
            //     //object to get lessons from the DB
            //     createObject(displayLessons, methods[0],baseUrl + "getLesson");
            //      document.getElementById("inputForm").style.display = "none";
            //      document.getElementById("allLessons").style.display = "block";
            //      document.getElementById("updateForm").style.display = "none";
               
            // }

            function submitLesson(e){
                //Get values submitted
                e.preventDefault();
               var lessonName = document.forms["lessonsForm"]["lessonName"].value;
               var lessonDescription = document.forms["lessonsForm"]["lessonDescription"].value;
                //alert(lessonName + lessonDescription);

                //validate
                if ((lessonName != "") && (lessonDescription != ""))
                {
                    //object to save lessons from form to db 
                    var sendData = "name="+lessonName+"&description="+lessonDescription;
                    createObject(getLessons, methods[1], baseUrl + "saveLesson", sendData);
                }
                else
                {
                    alert("you have enteered invalid data");
                }
                //insert or send to server
                //alert("working");
                return false;
            }

            
            function submitUpdate(e){
                //Get values submitted
                e.preventDefault();
                var lessonId = document.forms["lessonsForm1"]["lessonId"].value;
               var lessonName = document.forms["lessonsForm1"]["lessonName1"].value;
               var lessonDescription = document.forms["lessonsForm1"]["lessonDescription1"].value;
                //alert(lessonName + lessonDescription);

                //validate
                if ((lessonName != "") && (lessonDescription != ""))
                {
                    //object to save lessons from form to db 
                    var sendData = "name="+lessonName+"&description="+lessonDescription+"&id="+lessonId;
                    createObject(getLessons, methods[1], baseUrl + "updateLesson", sendData);
                }
                else
                {
                    alert("you have enteered invalid data");
                }
                //insert or send to server
                //alert("working");
                return false;
            }

            function editLesson(id, name, description){
                
                document.getElementById("updateForm").style.display = "block";
                document.getElementById("allLessons").style.display = "none";
            
                document.forms["lessonsForm1"]["lessonId"].value = id;
                document.forms["lessonsForm1"]["lessonName1"].value = name;
                document.forms["lessonsForm1"]["lessonDescription1"].value = description;

               // createObject(updateLesson, methods[0], baseUrl + "getLesson/"+id);
                //id = document.forms["lessonsForm"]["lessonName"].value; 
               // name = document.forms["lessonsForm"]["lessonDescription"].value;
            }



            function deleteLesson(id, name){
                    
                    var r = confirm("Do you want to delete?");
                    if (r == true) {
                        createObject(getLessons, methods[0], baseUrl + "deleteLesson/"+id);
                        alert("You have successfully deleted " + name);
                    } else {
                        
                        getLessons();
                    } 
                
        
            
                    
                    return false;
                }

           /* function refreshLessons (){

            }*/

            function showInputForm(){
                document.getElementById("inputForm").style.display = "block";
                document.getElementById("allLessons").style.display = "none";
               
            }

            document.getElementById("saveLesson").addEventListener("submit", submitLesson);

            function hideInputForm(){
                document.getElementById("inputForm").style.display = "none";
                document.getElementById("updateForm").style.display = "none";
                document.getElementById("allLessons").style.display = "block";
            }

            function showLesson(id){
                 //object to save lessons from form to db
                 createObject(displaySingleLesson, methods[0], baseUrl + "getSingleLesson/"+id);
                 return false;
            }
        document.getElementById("saveLesson").addEventListener("submit", submitLesson);
        document.getElementById("saveLesson1").addEventListener("submit", submitUpdate);

        </script>
@endsection