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
  res.writeHead(200, headers);
// utilize req.method for a conditional
var result;
  if (req.method === 'GET') {
    messages.enqueue(randomDirection());
    res.end(messages.dequeue());
  }
  if (req.method === 'OPTIONS') {
    messages.enqueue('AVAILABLE OPTIONS: POST, GET');
    res.end(messages.dequeue());
  }

  next(); // invoke next() at the end of a request to help with testing!
};

var randomDirection = function () {
  var directions = ['left', 'up', 'right', 'down'];
  var random = Math.floor(Math.random() * Math.floor(4));
  return directions[random].toString();
}
