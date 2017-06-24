var detail = require('./services/color.js');
var jshint = require('jshint');
var fs = require('fs');

detail('js syntax check', 'jshint', __filename, function () {
  it('app/main.js', function () {
    syntaxCheck = jshint.JSHINT(fs.readFileSync('./app/main.js', 'utf8').split('\n'));
    expect(syntaxCheck).toBe(true);
  })
})