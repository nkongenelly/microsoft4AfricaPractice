<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="csrf-token" content="{{ csrf_token()}}">

        <title>Traveller's</title>

        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.css" rel="stylesheet">

        <!-- Add custom CSS here -->
        <link href="css/style.css" rel="stylesheet">
        <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>

    </head>

    <body>

        <!-- Side Menu -->
        <a id="menu-toggle" href="#" class="btn btn-primary btn-lg toggle"><i class="fa fa-bars"></i></a>
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li>
                    <a id="menu-close" href="#" class="btn btn-default btn-lg pull-right toggle">
                        <i class="fa fa-times"></i>
                    </a>
                </li>
                <li class="sidebar-brand">
                    <a href="index.html">Traveller's</a>
                    <hr>
                </li>
                <li>
                    <a href="#top">Home</a>
                </li>
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#services">Services</a>
                </li>
                <li>
                    <a href="#places">Places</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </div>
        <!-- /Side Menu -->

        <!-- Full Page Image Header Area -->
        <div id="top" class="header">
            <div class="vert-text parallax">
            <!-- <div class="container1"> -->
                <!-- <img class = "img1" src = "img/jarabu01.png"/> -->
                <h1 class="header-text">JARABU TOURS & TRAVEL</h1>
                <h3 class="header-text">
                    <em class="header-text">Fly and Dine into tomorrow. Dream Comfort</em>
                </h3><br />
                <a href="#about" class="btn header-btn">Find Out More</a>
                <br/>
                <a href="#about"><img src="img/direction.png" class="space" alt="Direction"></a>
            </div>
            <!-- </div> -->
        </div>
        <!-- /Full Page Image Header Area -->

        <!-- Intro -->
        <!-- <div id="about">
            <div class="light-wrapper">
                <div class="container inner">
                    <div class="row">
                        <div class="text-center">
                            <h2 class="main-title">About our company</h2>
                            <hr>
                        </div>
                        <div class="divide50"></div>
                        <div class="col-sm-4">
                          <figure><img src="img/office.jpg" alt="" style="width: 100%;"></figure>
                        </div>
                        <div class="col-sm-8">
                          <h4>Our Working Place</h4>
                          <p>Vestibulum ligut praesent commodo cursus magna, consectetur et. Cum socis natoque penatibus et magnis dis tellus parturient pharetra montes. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
                        </div>
                      </div>
                      <div class="divide50"></div>
                      <div class="row">
                        <div class="col-sm-4">
                          <h4>Our Journeys</h4><hr>
                          <p>Duis non lectus sit amet est imperdiet cursus elementum vitae eros. Etiam adipiscingmorbi vitae magna tellus.</p>
                          <div class="divide5"></div>
                          <ul class="progress-list">
                            <li>
                              <p>Asia <em>90%</em></p>
                              <div class="progress plain">
                                <div class="bar" style="width: 90%;"></div>
                              </div>
                            </li>
                            <li>
                              <p>Australia <em>80%</em></p>
                              <div class="progress plain">
                                <div class="bar" style="width: 80%;"></div>
                              </div>
                            </li>
                            <li>
                              <p>America <em>85%</em></p>
                              <div class="progress plain">
                                <div class="bar" style="width: 85%;"></div>
                              </div>
                            </li>
                            <li>
                              <p>Europe <em>50%</em></p>
                              <div class="progress plain">
                                <div class="bar" style="width: 50%;"></div>
                              </div>
                            </li>
                          </ul>
                          <!-- /.progress-list --> 
                        </div>
                        <!-- /.col -->
<!--                         
                        <div class="col-sm-4">
                          <h4>Why Choose Us?</h4><hr>
                          <p>Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. </p>
                          <div class="divide10"></div>
                          <ol class="color">
                            <li>Donec ullamcorper nulla non metus auctor.</li>
                            <li>Cras justo odio, dapibus ac facilisis in egestas.</li>
                            <li>Praesent commodo cursus magna.</li>
                            <li>Curabitur blandit tempus porttitor.</li>
                            <li>Sed posuere consectetur est at lobortis.</li>
                            <li>Aenean lacinia bibendum nulla sed consectetur.</li>
                          </ol>
                        </div>
                        <!-- /.col -->
                        
                        <!-- <div class="col-sm-4">
                          <h4>Our Transports</h4><hr>
                          <div class="divide10"></div>
                          <div class="services-2">
                            <div class="icon"> <img src="img/icon-web.png" data-src="style/images/icons/icon-web.png" data-ret="style/images/icons/icon-web@2x.png" class="retina" alt="" /> </div>
                            <!-- /.icon -->
                            <!-- <div class="text">
                              <h5>Responsive Layout</h5>
                              <p>Etiam porta malesuada magna.</p>
                            </div> --> 
                            <!-- /.text -->
                            <!-- <div class="divide20"></div>
                            <div class="icon"> <img src="img/icon-heart.png" data-src="style/images/icons/icon-heart.png" data-ret="style/images/icons/icon-heart@2x.png" class="retina" alt="" /> </div> -->
                            <!-- /.icon -->
                            <!-- <div class="text">
                              <h5>Flat & Clean design</h5>
                              <p>Etiam porta malesuada.</p>
                            </div> -->
                            <!-- /.text -->
                            <!-- <div class="divide20"></div>
                            <div class="icon"> <img src="img/icon-print.png" data-src="style/images/icons/icon-print.png" data-ret="style/images/icons/icon-print@2x.png" class="retina" alt="" /> </div> -->
                            <!-- /.icon -->
                            <!-- <div class="text">
                              <h5>Print Design</h5>
                              <p>Etiam porta malesuada magna.</p>
                            </div> -->
                            <!-- /.text --> 
                            
                          <!-- </div> -->
                          <!-- /.services-2 --> 
                          
                        <!-- </div> -->
                        <!-- /.col --> 
                        
                      <!-- </div> -->
                      <!-- /.row --> 
                      
                    <!-- </div> -->
                    <!-- /.container --> 
                  <!-- </div> -->
                  <!-- /.light-wrapper -->
                <!-- </div> -->
        <!-- /Intro   -->

        <!-- Services -->
        <div id="services" class="services">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-md-offset-4 text-center">
                        <h2 class="main-title">Our Services</h2>
                        <hr>
                    </div>
                </div>
                <div class="divide50"></div>
                <div class="row">
                    <div class="col-md-3 text-center">
                        <div class="service-item">
                            <i class="service-icon fa fa-plane"></i>
                            <h4 class="service-title">LOCAL/ INTERNATIONAL FLIGHTS</h4>
                            <p class="service-desc">Fast Affordable & Flexible Flight Ticket Rates. Best rates across East Africa.Travel in Style.
Book your Fist Class, Business Class & Economy Class at your Own Convenience....</p>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="service-item">
                            <i class="service-icon fa fa-usd"></i>
                            <h4 class="service-title">MEDICAL TOURISM</h4>
                            <p class="service-desc">#Medical_Tourism your health is our concern.</p>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="service-item">
                            <i class="service-icon fa fa-cutlery"></i>
                            <h4 class="service-title">HONEYMOON/ HOLIDAY PACKAGES</h4>
                            <p class="service-desc">The World is a Book and those who do not Travel read only one Page.</p>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="service-item">
                            <i class="service-icon fa fa-camera"></i>
                            <h4 class="service-title">VISA PROCESSING</h4>
                            <p class="service-desc"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Services -->

        <!-- Callout -->
        <div class="callout">
            <div class="vert-text">
                <h1 class="main-title parallax2">Your Travellers Guide</h1>
            </div>
        </div>
        <!-- /Callout -->

        <!-- Portfolio -->
        <div id="places" class="places">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-md-offset-4 text-center">
                        <h2 class="main-title">Our visited place</h2>
                        <hr>
                    </div>
                </div>
            </div>  
            <div class="divide50"></div>  
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="grid center-block">
                            <figure class="effect-zoe">
                                <img src="img/paris.jpg" alt="paris" class="img-responsive center-block">
                                <figcaption>
                                    <h2>Paris</h2>
                                    <p class="icon-links">
                                        <a href="#"><i class="fa fa-heart-o"></i></a>
                                        <a href="#"><i class="fa fa-eye"></i></a>
                                        <a href="#"><i class="fa fa-bookmark-o"></i></a>
                                    </p>
                                    <p class="description">
                                    Paris, the City of Light is the world's most visited capital.
                                    </p>
                                </figcaption>           
                            </figure>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="grid center-block">
                            <figure class="effect-zoe">
                                <img src="img/sydney.jpg" alt="sydney" class="img-responsive center-block">
                                <figcaption>
                                    <h2>Sydney</h2>
                                    <p class="icon-links">
                                        <a href="#"><i class="fa fa-heart-o"></i></a>
                                        <a href="#"><i class="fa fa-eye"></i></a>
                                        <a href="#"><i class="fa fa-bookmark-o"></i></a>
                                    </p>
                                    <p class="description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien.
                                    </p>
                                </figcaption>           
                            </figure>
                        </div>
                    </div>
                </div>
                <div class= "row">
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="grid center-block">
                            <figure class="effect-zoe">
                                <img src="img/washington.jpg" alt="washington" class="img-responsive center-block">
                                <figcaption>
                                    <h2>Washington</h2>
                                    <p class="icon-links">
                                        <a href="#"><i class="fa fa-heart-o"></i></a>
                                        <a href="#"><i class="fa fa-eye"></i></a>
                                        <a href="#"><i class="fa fa-bookmark-o"></i></a>
                                    </p>
                                    <p class="description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien.
                                    </p>
                                </figcaption>           
                            </figure>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="grid center-block">
                            <figure class="effect-zoe">
                                <img src="img/london.jpg" alt="london" class="img-responsive center-block">
                                <figcaption>
                                    <h2>London</h2>
                                    <p class="icon-links">
                                        <a href="#"><i class="fa fa-heart-o"></i></a>
                                        <a href="#"><i class="fa fa-eye"></i></a>
                                        <a href="#"><i class="fa fa-bookmark-o"></i></a>
                                    </p>
                                    <p class="description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien.
                                    </p>
                                </figcaption>           
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="grid center-block">
                            <figure class="effect-zoe">
                                <img src="img/statue_of_liberty.jpg" alt="statue_of_liberty" class="img-responsive center-block">
                                <figcaption>
                                    <h2>U.S.A</h2>
                                    <p class="icon-links">
                                        <a href="#"><i class="fa fa-heart-o"></i></a>
                                        <a href="#"><i class="fa fa-eye"></i></a>
                                        <a href="#"><i class="fa fa-bookmark-o"></i></a>
                                    </p>
                                    <p class="description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien.
                                    </p>
                                </figcaption>           
                            </figure>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="grid center-block">
                            <figure class="effect-zoe">
                                <img src="img/pizza_tower.jpg" alt="pizza_tower" class="img-responsive center-block">
                                <figcaption>
                                    <h2>Pizza Tower</h2>
                                    <p class="icon-links">
                                        <a href="#"><i class="fa fa-heart-o"></i></a>
                                        <a href="#"><i class="fa fa-eye"></i></a>
                                        <a href="#"><i class="fa fa-bookmark-o"></i></a>
                                    </p>
                                    <p class="description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien.
                                    </p>
                                </figcaption>           
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- /Portfolio -->

        <!-- Call to Action -->
        <div class="call-to-action">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3 text-center">
                        <h3>We provide online booking</h3>
                        <a href="#" class="btn booking-btn text-center" data-toggle="modal" data-target="#booking">Click for Booking !</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Call to Action -->

        <!-- Contact Section -->
        <div id="contact" class="container parallax">
            <div class="col-md-4 col-md-offset-4 text-center">
                <h2 class="main-title">Contact us</h2>
                <hr>
                <div class="divide50"></div>
            </div>
            <!-- Contact Inner -->
            <div class="inner contact">
                <!-- Form Area -->
                <div class="contact-form">
                <script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-43981329-1']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script>
                
                    <!-- Form -->
                    <form id="contact-us" name = "sendMails">
                        {{csrf_field()}}
                        <!-- Left Inputs -->
                        <div class="col-xs-6 col-xs-12 animated" data-animation="fadeInLeft" data-animation-delay="300">
                            <!-- Name -->
                            <input type="text" name="name" id="name" required="required" class="form" placeholder="Name" />
                            <!-- Email -->
                            <input type="email" name="email" id="email" required="required" class="form" placeholder="Email" />
                            <!-- <input type="email" name="toid" id="toid" required="required" class="form" placeholder="Receiver email" /> -->
                            <!-- Subject -->
                            <input type="text" name="subject" id="subject" required="required" class="form" placeholder="Subject" />
                        </div><!-- End Left Inputs -->
                        <!-- Right Inputs -->
                        <div class="col-xs-6 col-xs-12 animated" data-animation="fadeInRight" data-animation-delay="400">
                            <!-- Message -->
                            <textarea name="message" id="message" class="form textarea"  placeholder="Message"></textarea>
                        </div><!-- End Right Inputs -->
                        <!-- Bottom Submit -->
                        <div class="relative fullwidth col-xs-12">
                            <!-- Send Button -->
                            <button type="submit" id="submit" name="submit" class="form-btn semibold">Send Message</button> 
                        </div><!-- End Bottom Submit -->
                        <!-- Clear -->
                        <div class="clear"></div>
                    </form>
                <?php
                    // use PHPMailer\PHPMailer;
                    // use PHPMailer\Exception;
                    
                    // require 'PHPMailer/src/Exception.php';
                    // require 'PHPMailer/src/PHPMailer.php';
                    // require 'PHPMailer/src/SMTP.php';

                    // if(isset($_POST['submit']))
                    // {
                    // // Fetching data that is entered by the user
                    // $name = $_POST['name'];
                    // $email = $_POST['email'];
                    // $to_id = $_POST['toid'];
                    // $subject = $_POST['subject'];
                    // $message = $_POST['message'];
                    
                    
                    // Configuring SMTP server settings
                    // $mail = new PHPMailer;
                    // $mail->isSMTP();
                    // $mail->Host = 'smtp.gmail.com';
                    // $mail->Port = 587;
                    // $mail->SMTPSecure = 'tls';
                    // $mail->SMTPAuth = true;
                    // $mail->Username = $email;
                    // //$mail->Password = $password;
                    
                    // Email Sending Details
                    // $mail->addAddress($to_id);
                    // $mail->Subject = $subject;
                    // $mail->msgHTML($message);
                    
                    // Success or Failure
                    // if (!$mail->send()) {
                    // $error = "Mailer Error: " . $mail->ErrorInfo;
                    // echo '<p id="para">'.$error.'</p>';
                    // }
                    // else {
                    // echo '<p id="para">Message sent!</p>';
                    // }
                    // }
                    // else{
                    // echo '<p id="para">Please enter valid data</p>';
                    // }
                ?> 

                    <!-- Your Mail Message -->
                    <div class="mail-message-area">
                        <!-- Message -->
                        <div class="alert gray-bg mail-message not-visible-message">
                            <strong>Thank You !</strong> Your email has been delivered.
                        </div>
                    </div>

                </div><!-- End Contact Form Area -->
            </div><!-- End Inner -->
        </div><!-- End Contact Section -->
        
        <div class="map">
            <iframe width="100%" height="400px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3618.727010735933!2d91.837871!3d24.907291700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1404919738144"></iframe>
        </div>
        <!-- /Map -->

        <!-- Footer -->
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3 text-center">
                        <ul class="list-inline">
                            <li>
                                <i class="fa fa-facebook"></i>
                            </li>
                            <li>
                                <i class="fa fa-twitter"></i>
                            </li>
                            <li>
                                <i class="fa fa-dribbble"></i>
                            </li>
                            <li>
                                <i class="fa fa-pinterest"></i>
                            </li>
                        </ul>
                        <hr>
                        <p>Copyright &copy; <a href="https://themewagon.com/">Themewagon</a>  2014</p>
                        <div class="top-scroll">
                            <a href="#top"><i class="fa fa-arrow-circle-up scroll"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- /Footer -->

        <!-- begin:booking -->
        <div class="modal fade" id="booking" tabindex="-1" role="dialog" aria-labelledby="booking" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Online Booking Form</h4>
                    </div>
                    <div class="modal-body">
                        <form role="form">
                            <div class="form-group">
                                <label for="emailAddress">Email address</label>
                                <input id="emailAddress" type="email" class="form-control input-lg" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input id="password" type="password" class="form-control input-lg" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <label for="country">Which country do you want to travel?</label>
                                <select class="form-control" id="country">
                                    <option>Australia</option>
                                    <option>Bangladesh</option>
                                    <option>England</option>
                                    <option>France</option>
                                    <option>U.S.A</option>
                                </select>
                            </div>
                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <input type="submit" class="btn confirm-btn" value="Confirm">
                    </div>
                </div>
            </div>
        </div>
        <!-- end:booking -->

        <!-- JavaScript -->
        <script src="js/jquery-1.10.2.js"></script>
        <script src="js/bootstrap.js"></script>
        <script type="text/javascript" src="js/jquery.parallax-1.1.3.js"></script>

        <!-- Custom JavaScript for the Side Menu and Smooth Scrolling -->
        <script>
        $("#menu-close").click(function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });
        </script>
        <script>
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });
        </script>
        <script>
        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });
        </script>

        <!-- modal -->

        <script>

            $('.modal').on('shown.bs.modal', function () {
                var curModal = this;
                $('.modal').each(function(){
                    if(this != curModal){
                        $(this).modal('hide');
                    }
                });
            });
            </script>
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
        

    function sendMail(e){
        e.preventDefault();
        var name = document.forms["sendMails"]["name"].value;
        var subject = document.forms["sendMails"]["subject"].value;
        var email = document.forms["sendMails"]["email"].value;
        var message = document.forms["sendMails"]["message"].value;

        var sendData ="name" +name+ "&subject"+subject+"&email"+email+"&message"+message;
        console.log(sendData);
        //var url = "https://api.sendgrid.com/api/sendEmail.post.json";
        createObject(messageSent, methods[1], baseUrl +"sendEmail", sendData);

    }

    function messageSent(){
        
    }

    document.getElementById("contact-us").addEventListener('submit', sendMail);

        </script>

    </body>
</html>