// Create web server
// Create a server that responds to requests with a file containing the text "I got a request"
// When you open a browser and go to http://localhost:3000, you should see "I got a request"

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    console.log(filename);
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
});

// Listen on port 8000, IP defaults to