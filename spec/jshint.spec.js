var detail = require('./services/color.js');
var jshint = require('jshint');
var fs = require('fs');
var files = require('./linter.json');

detail('js syntax check', 'jshint', __filename, function () {
  for (file in files.files) {
    it(files.files[file], function () {
      var currentFile = fs.readFileSync('./' + files.files[file], 'utf8').split('\n');
      expect(jshint.JSHINT(currentFile)).toBe(true);
    })
  }
})