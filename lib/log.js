String.prototype.bold = function () {
  return '\x1b[1m' + this + '\x1b[0m';
}

String.prototype.purple = function () {
  return '\x1b[35m' + this + '\x1b[0m';
}

String.prototype.blue = function () {
  return '\x1b[36m' + this + '\x1b[0m';
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

function getTime () {
  return Math.floor(process.hrtime(startTime)[0] / 60).toString() + ':' + (process.hrtime(startTime)[0] % 60).toString() + ':' + process.hrtime(startTime)[1].toString().substring(0, 2)
}

module.exports = function (leds) {
  this.leds = leds;

  this.trace = function (task, text) {
    console.log('trace'.bold() + '\x1b[0m ' + getTime() + ' ' + task.purple() + ' ' + text);
  }

  this.info = function (task, text) {
    console.log('info'.blue().bold() + ' ' + getTime().blue() + ' ' + task.purple() + ' ' + text);
    leds.green();
    setTimeout(function () {
      leds.off();
    }, 200);
  }

  this.log = function (task, text) {
    console.log('log'.green().bold() + ' ' + getTime().green() + ' ' + task.purple() + ' ' + text);
  }

  this.warn = function (task, text) {
    console.log('warn'.yellow().bold() + ' ' + getTime().yellow() + ' ' + task.purple() + ' ' + text);
    leds.orange();
    setTimeout(function () {
      leds.off();
    }, 200);
  }

  this.err = function (task, text) {
    console.log('error'.red().bold() + ' ' + getTime().red() + ' ' + task.purple() + ' ' + text);
    leds.red();
    setTimeout(function () {
      leds.off();
    }, 200);
  }
}