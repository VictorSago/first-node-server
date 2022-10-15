
const http = require('http');
const fs = require('fs');


/* const server = http.createServer((req, res) => {
  //console.log(req);
  console.log("URL: ", req.url);
  console.log("Method: ", req.method);
  console.log("Headers: ", req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>First Node Server Page</title></head>');
  res.write('<body><h1>Node Server Active!</h1></body>')
  res.write('</html>');
  res.end();
}); */

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>First Node Server Page</title></head>');
  res.write('<body><h1>Node Server Active!</h1></body>')
  res.write('</html>');
  res.end();
});

server.listen(3000);
