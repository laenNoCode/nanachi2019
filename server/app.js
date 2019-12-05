const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == '/')
        req.url = '/index.html'
  res.statusCode = 200;
  if (!fs.existsSync('../client'+req.url))
  {
      req.url='/404.html'
  }
  fs.readFile('../client'+req.url, (err, data)=>
  {
      if (err){
            console.log(err);
            return;    
    }
      res.write(data)
      res.end();
  })
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});