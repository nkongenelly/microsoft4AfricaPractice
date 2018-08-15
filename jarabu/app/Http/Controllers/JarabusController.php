<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\TestEmail;

class JarabusController extends Controller
{
    //
    public function welcome(){
        return view('welcome');
    }

    public function sendEmail(Request $request){
        require 'sendgrid-php/vendor/autoload.php'; // If you're using Composer (recommended)
        // Comment out the above line if not using Composer
        //require("./sendgrid-php.php"); 
        // If not using Composer, uncomment the above line
        $apiKey = env('SENDGRID_API_KEY');
        // $authHeaders = [
        //     'Authorization: Bearer ' . $apiKey
        // ];
        // $client = new SendGrid\Client('https://api.sendgrid.com', $authHeaders);
        // $param = 'foo';
        // $response = $client->your()->api()->_($param)->call()->get();
        
        // var_dump(
        //     $response->statusCode(),
        //     $response->headers(),
        //     $response->body()
        // );
        $this->validate($request,[
            'name' => 'required',
            'email' => 'required',
            'subject' => 'required',
            'message' => 'required'
        ]);

        $from1 = $request->email;
        //$to1 = "nkongenelly94@gmail.com";
        $subject1 = $request->subject;
        $body = $request->message;
        // $host = env('MAIL_HOST');
        // $username = env('MAIL_USERNAME');
        // $password = env('MAIL_PASSWORD');

        $email = new \SendGrid\Mail\Mail(); 
        $email->setFrom($from1, "Client");
        $email->setSubject($subject1);
        $email->addTo("nkongenelly94@gmail.com", "Jarabu Tours & Trravel");
        $email->addContent("text/plain", $body);

        
        $sendgrid = new \SendGrid($apiKey);
        $response = $sendgrid->client->mail()->send()->post($sendgrid);
        try {
            $response = $sendgrid->send($email);
            print $response->statusCode() . "\n";
            print_r($response->headers());
            print $response->body() . "\n";
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

       // var_dump($email);
    }
            

            
        
        


    
}
