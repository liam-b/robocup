#!/usr/bin/env node
var Logger = require('./log.js');
var output = new Logger ();

output.log('hey', 'hai');

setTimeout(function () {
  output.warn('hey', 'hai');
}, 1000);