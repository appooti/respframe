var http = require("http");

// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function (request, response) {

    console.log("Node got request ");

    request.on("end", function () {

        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        // Send data and end response.
        response.end('Hello HTTP!');
    });
// Listen on the 8080 port.
}).listen(8082);

console.log("running ");