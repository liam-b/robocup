module.exports.Base = function (port, errorHandler) {
  this.__super.call(this, port, errorHandler);

  this.command = 'reset';
  this.speed = 0;

  this.run = function (speed) {
    if (speed) {
      if (this.speed != speed) {
        this.set('speed_sp', speed);
        this.speed = speed;
        this.set('command', 'run-forever');
      }
    }
    else if (this.command != 'run-forever') this.set('command', 'run-forever');
  };

  this.runTo = function (position, speed) {
    this.set('position_sp', position);
    this.set('speed_sp', speed);
    this.set('command', 'run-to-rel-pos');
  };

  this.stop = function () {
    if (this.command != 'stop') this.set('command', 'stop');
  };

  this.position = function () {
    return this.get('position');
  };

  this.reset = function () {
    this.set('position', 0);
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype.__super = Device;

module.exports.Motor = module.exports.Base;

module.exports.Drive = function (leftPort, rightPort, errorHandler) {
  this.leftPort = leftPort;
  this.rightPort = rightPort;

  this.left = new module.exports.Motor(leftPort, errorHandler);
  this.right = new module.exports.Motor(rightPort, errorHandler);

  this.run = function (speed) {
    this.left.run(speed);
    this.right.run(speed);
  };

  this.runTo = function (position, speed) {
    this.left.runTo(position, speed);
    this.right.runTo(position, speed);
  };

  this.stop = function () {
    this.left.stop();
    this.right.stop();
  };

  this.position = function () {
    return (this.left.position() + this.right.position()) / 2;
  };

  this.reset = function () {
    this.left.reset();
    this.right.reset();
  };
};