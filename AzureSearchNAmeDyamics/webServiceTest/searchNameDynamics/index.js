/******
 * 
 * 1. Declare & initialize required variables
 * 
 * ***/
let https = require('https');
let crmOrg = 'https://nanyukiappfactory.api.crm4.dynamics.com'; // Organization link
let clientId = '281fb603-6abe-4079-8650-258e34ae1fe1'; // Azure directory application ID
let clientSecret = 'sVDdLx20iW7SI0tIT2n+QVnWkVJ2SPVn/GX3qBSrNhY='; // Azure directory secret
let name; // The value passed to the web service from Kaizala
let phone;
let crmWebApiHost = 'nanyukiappfactory.api.crm4.dynamics.com'; //crm api host

module.exports = function(context, req) {
        /******
         * 
         * 2. Retrieve get variables
         * 
         * ***/
        name = req.query.name;

        /******
         * 
         * 3. Request for authorization token
         * 
         * ***/
        let authHost = 'login.microsoftonline.com'; //authorization endpoint host name
        let authPath = '/afdf297f-b713-45ce-a072-eca2a0ec0533/oauth2/token'; //authorization endpoint path
        let requestString = 'client_id=' + encodeURIComponent(clientId); // Auth request parameters
        requestString += '&resource=' + encodeURIComponent(crmOrg);
        requestString += '&client_secret=' + encodeURIComponent(clientSecret);
        requestString += '&grant_type=client_credentials';
        let tokenRequestParameters = { // Auth request object
            host: authHost,
            path: authPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': requestString.length
            }
        };

        // Definition of the auth request
        let tokenRequest = https.request(tokenRequestParameters, function(response) {
            let responseResult //variable that will hold result

            response.on('data', function(result) {
                responseResult = result; //Successful response set the result to the responseResult var
            });

            response.on('end', function() {
                let tokenResponse = JSON.parse(responseResult); //Convert the response to a json objet
                let token = tokenResponse.access_token; //extract the token from the json object
                getData(context, token); //Call the function that will query dynamics for the customer
            });
        });

        tokenRequest.on('error', function(e) {
            context.res = {
                body: "" //Return empty if error occured
            };
            context.done();
        });

        tokenRequest.write(requestString); //Make the auth token request for POST requests
        tokenRequest.end(); //close the token request
    }
    /******
     * 
     * 4. Search for customer
     * @param token the authorization token
     * 
     * ***/
function getData(context, token) {
    let crmWebApiQueryPath;
    if (name !== undefined && phone !== undefined) {
        crmWebApiQueryPath = "/api/data/v9.0/accounts?$select=name,telephone1&$filter=contains(name,\'" + name + "\')%20and%20contains(telephone1,\'" + phone + "\')";
    }

    if (name !== undefined && phone === undefined) {
        crmWebApiQueryPath = "/api/data/v9.0/accounts?$select=name,telephone1&$filter=contains(name,\'" + name + "\')";
    } //Query where the account name contains the name inputted from Kaizala

    //Set the web api request headers
    let requestHeaders = {
        'Authorization': 'Bearer ' + token,
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Prefer': 'odata.maxpagesize=500',
        'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
    };

    //Set the crm request parameters
    let crmRequestParameters = {
        host: crmWebApiHost,
        path: crmWebApiQueryPath,
        method: 'GET',
        headers: requestHeaders
    };

    //Define & make the search request for GET requests
    let crmRequest = https.request(crmRequestParameters, function(response) {
        let responseData;

        response.on('data', function(result) {
            responseData = result; //On successful request assign the response json string to responseData
        });

        response.on('end', function() {
            //On completion of the request convert the json string to a json object
            let customers = JSON.parse(responseData).value;

            context.res = {
                body: customers
            };
            context.done();
        });
    });

    crmRequest.on('error', function(error) {
        context.res = {
            body: "" //Return empty if error occured
        };
        context.done();
    });

    crmRequest.end(); //Close the search request
}