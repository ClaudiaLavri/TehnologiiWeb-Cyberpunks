// var http = require('http');

// var server = http.createServer(function (req, res) {
//     res.writeHead(200, {
//         "Content-type": "text/plain"
//     });
//     res.end("Hello world \n");
// });

// server.listen(3000, function () {
//     console.log('Server is running at 3000')
// })

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

