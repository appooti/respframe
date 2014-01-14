var http = require("http");
fs = require("fs");
var cheerio = require('cheerio');


http.createServer(function (request , response){


        console.log("got request");
        if(request.url == '/'){

            $ = cheerio.load('<h2 class="title">Hello world</h2>');

            $('h2.title').text('Hello there!');
            $('h2').addClass('welcome');

            $.html();

            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            response.end($.html());
        }

}).listen(8082);

console.log("running");