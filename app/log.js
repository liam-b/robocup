String.prototype.bold = function () {
  return '\x1b[1m' + this + '\x1b[0m';
}

String.prototype.purple = function () {
  return '\x1b[35m' + this + '\x1b[0m';
}

String.prototype.blue = function () {
  return '\x1b[34m' + this + '\x1b[0m';
}

String.prototype.cyan = function () {
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

String.prototype.black = function () {
  return '\x1b[30m' + this + '\x1b[0m';
}

var startTime = process.hrtime();

function getTime () {
  return Math.floor(process.hrtime(startTime)[0] / 60).toString() + ':' + (process.hrtime(startTime)[0] % 60).toString() + ':' + process.hrtime(startTime)[1].toString().substring(0, 2)
}

module.exports = function (leds, quiet) {
  this.leds = leds;
  this.cyan = function (text) {
    return '\x1b[36m' + text + '\x1b[0m';
  }
  this.quiet = quiet;

  console.log('[trace]'.bold() + ' [info]'.blue().bold() + ' [log]'.green().bold() + ' [warn]'.yellow().bold() + ' [error]'.red().bold() + ' function'.purple() + ' value'.cyan() + ' timestamp'.black().bold());

  this.trace = function (task, text) {
    if (!this.quiet) console.log('[trace]'.bold() + '\x1b[0m ' + getTime().black().bold() + ' ' + task.purple() + ' ' + text);
  }

  this.info = function (task, text) {
    console.log('[info]'.blue().bold() + ' ' + getTime().black().bold() + ' ' + task.purple() + ' ' + text);
    leds.color(leds.GREEN);
    setTimeout(function () {
      leds.color(leds.BLACK);
    }, 200);
  }

  this.log = function (task, text) {
    console.log('[log]'.green().bold() + ' ' + getTime().black().bold() + ' ' + task.purple() + ' ' + text);
  }

  this.warn = function (task, text) {
    console.log('[warn]'.yellow().bold() + ' ' + getTime().black().bold() + ' ' + task.purple() + ' ' + text);
    leds.color(leds.ORANGE);
    setTimeout(function () {
      leds.color(leds.BLACK);
    }, 200);
  }

  this.err = function (task, text) {
    console.log('[error]'.red().bold() + ' ' + getTime().black().bold() + ' ' + task.purple() + ' ' + text);
    leds.color(leds.RED);
    setTimeout(function () {
      leds.color(leds.BLACK);
    }, 200);
  }
}