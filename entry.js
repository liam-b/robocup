#!/usr/bin/env node

var main = require('./lib/main.js');

var looping = true;

main.start();

function loop () {
  main.loop()
  setTimeout(loop, 100);
}

loop()
