// Include http module, 
var http = require('http'),
// And mysql module you've just installed. 
    mysql = require("mysql");
    var url = require("url");

// Create the connection. 
// Data is default to new mysql installation and should be changed according to your configuration. 
var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720roe2pj",
    password: "spring2014",
    database: "cs4720roe2pj"
});

http.createServer(function (request, response) {
    
    // Get URL parameter
	var pathname = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    pathname_split = pathname.split("/");

    // get the passed latitude and longitude
    latitude = pathname_split[0];
    longitutde = pathname_split[1];


    console.log(latitude);
    // Query the database. 

        
    connection.query('SELECT * from games;', function (error, rows, fields) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });



        // Send data as JSON string. 
        // Rows variable holds the result of the query. 
        response.write(JSON.stringify(rows));
        response.end();
    });

    
}).listen(process.env.PORT || 8080);