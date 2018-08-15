<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="form.css">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
     
    </head>
    <body>
    @include ("/mailer.php")
        <!-- BEGINNING OF CONTACT FORM -->
        <div class="section-page-landing" id="contact">
                    <div class="inner-section">
                        <div class="contain">
                            <center><h2>Contact Me</h2>
        <form class="contact" action="mailer.php" method="post" id ="contact" name = "contactUs">
        <p>Name:</p> <!-- Can choose to customize form.html inputs starting here as needed, but be sure to reference any changes in mailer.php post fields-->
        <input type="text" name="name" />
        <p>E-mail:</p>
        <input type="text" name="email" />
        <p>Subject:</p>
        <input type="text" name="subject" />
        <p>Message:</p>
        <textarea name="message" syle="width: 45%; text-align: center;">Please leave a short message here</textarea></p>
        <button class="send" type="submit" value="Send"> </button><!-- Send button-->
        </form></center>
                        </div>
                    </div>
                </div>
        <!--end contact form-->
    </body>

    <script>
  var methods = ["GET", "POST"];
                var baseUrl = "http://127.0.0.1:8000/";

                //CREATE THE FORM 
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

                    function contactUs(e)
                    {
                        e.preventDefault();
                        var name =document.forms["contactUs"]["name"].value;
                        var email =document.forms["contactUs"]["email"].value;
                        var subject =document.forms["contactUs"]["subject"].value;
                        var message =document.forms["contactUs"]["message"].value;

                        var sendData = "name="+name+"&email="+email+"&subject="+subject+"&message="+message;
                        createObject(getEmail, methods[1], baseUrl + "contactUs", sendData);
                    }



                    document.getElementById("contact").addEventListener("submit", contactUs);
    </script>
</html>
