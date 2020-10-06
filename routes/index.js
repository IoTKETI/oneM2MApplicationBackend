var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

let server = require('http');
let svr, port = 12345;

var response;

svr = server.createServer((req, res) => {
  let str = '';
  res.writeHead(200, { 'X-M2M-RSC': 2000 });

  req.on('data', (chunk) => {
    str = chunk.toString();
    response = str;
    console.log(response);
  }).on('end', () => {
    res.end(
      hello(JSON.parse(str))
    )
  });
});

svr.listen(port, 'localhost');
svr.close();

router.get('/notification', (req, res) => {
	return res.json(response);
})

function hello(obj) {
  console.log(obj);
  return JSON.stringify(obj);
}

module.exports = router;
