const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // change this from default, to actually return the correct information

// utilize req.method for a conditional
var result;
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, headers);
    // messages.enqueue(randomDirection());
    res.end(messages.dequeue());
  } else if (req.method === 'GET' && req.url === '/background.jpg') {
    // what does it need to do here
    console.log('received a message at background endpoint');
    fs.readFile(module.exports.backgroundImageFile, (err, data) => {
      if (err) {
        console.log('this is the error: ', err);
        res.writeHead(404, headers);
        res.end();
        next();
      } else {
        res.writeHead(200, headers);
        // console.log(data);
        res.write(data, 'binary');
        res.end();
        next();
      }
    });
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end('AVAILABLE OPTIONS: POST, GET');
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      console.log('chunk received');
      fileData = Buffer.concat([fileData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(fileData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 400 : 201, headers);
        res.end();
        next();
      })
    })
  }

  next(); // invoke next() at the end of a request to help with testing!
};

var randomDirection = function () {
  var directions = ['left', 'up', 'right', 'down'];
  var random = Math.floor(Math.random() * Math.floor(4));
  return directions[random].toString();
}
