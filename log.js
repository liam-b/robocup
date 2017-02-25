String.prototype.bold = function () {
  return '\x1b[1m' + this + '\x1b[0m';
}

String.prototype.purple = function () {
  return '\x1b[35m' + this + '\x1b[0m';
}

String.prototype.info = function () {
  return '\x1b[34m' + this + '\x1b[0m';
}

String.prototype.green = function () {
  return '\x1b[32m' + this + '\x1b[0m';
}

String.prototype.yellow = function () {
  return '\x1b[33m' + this + '\x1b[0m';
}

String.prototype.red = function () {
  return '\x1b[31m' + this + '\x1b[0m';
}

var startTime = process.hrtime();

module.exports = function () {
  this.info = function (task, text) {
    console.log('info'.blue().bold() + ' ' + process.hrtime(startTime)[0].toString().blue() + ' ' + task.purple() + ' ' + text);
  }

  this.log = function (task, text) {
    console.log('log'.green().bold() + ' ' + process.hrtime(startTime)[0].toString().green() + ' ' + task.purple() + ' ' + text);
  }

  this.warn = function (task, text) {
    console.log('warn'.yellow().bold() + ' ' + process.hrtime(startTime)[0].toString().yellow() + ' ' + task.purple() + ' ' + text);
  }

  this.err = function (task, text) {
    console.log('error'.red().bold() + ' ' + process.hrtime(startTime)[0].toString().red() + ' ' + task.purple() + ' ' + text);
  }
}