
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
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
      // To avoid an error either the following three lines must be outside this function
      // or this `req.on(...) must be returned
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    // return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>First Node Server Page</title></head>');
  res.write('<body><h1>Node Server Active!</h1></body>')
  res.write('</html>');
  res.end();
});

server.listen(3000);
