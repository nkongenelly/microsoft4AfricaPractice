<head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Hospital Mamnagement</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token()}}">
        <link rel="stylesheet" type="text/css" href="/css/bootstrap/css/bootstrap.min.css" />
        
        
    </head>
    <body onload = "generatePin()">
        <!-- @include('hospital.nav') -->
        <div class = "container">
            <div id = "pinForm">
                <form name ="generatesPin" id = "generatedPin" method='POST'>
                    <label>Enter Pin</label>
                    
                    <input type = "hidden" name ="connectorSecret" id="connectorSecret" value = "{{$conector_secret}}"/>
                    <input type = "hidden" name ="connectorId" id="connectorId" value = "{{$connector_id}}"/>
                    <input type = "hidden" name ="connectorNumber" value = "{{$connector_number}}"/>test_groupId
                    <input type = "hidden" name ="test_groupId" value = "{{$test_groupId}}"/>
                    <input type = "hidden" name ="test_groupId1" value = "{{$test_groupId1}}"/>
                    <input type = "number" name ="enterPin" placeholder = "Enter the 4-digit pin you have received"/><br>
                    <!-- <button type = "button" onclick = "generatePin('{{$connector_number}}','{{$connector_id}}')">Generate Pin</button><br>
                    -->
                    <button class='btn btn-primary' type="button" onclick='generatePin("{{$connector_number}}","{{$connector_id}}")'>Generate Pin</button>
                    <button type = "submit">Submit Pin</button>

                </form>

            
            </div>
            <div id = "createGroup">
                <form id = "formGroup" name = "group">
                    <label>Group name</label>
                    <input type = "text" name = "groupName"/><br>
                    <label>Phone Number 1</label>
                    <input type = "text" name = "phone1"/><br>
                    <label>Phone Number 2</label>
                    <input type = "text" name = "phone2"/><br>
                    <label>Phone Number 3</label>
                    <input type = "text" name = "phone3"/><br>
                    <button type = "submit">CREATE</button>
                </form>
            </div>


            <div id = "showQuery"></div>

            <div id = "somediv"></div>

            <script type = "text/javascript" src = "/js/hotelsBots.js"></script>
        </div>
    </body>
</head>