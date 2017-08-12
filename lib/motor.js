module.exports.Base = function (port, errorHandler) {
  this.__super.call(this, port, errorHandler);

  this.command = 'reset';
  this.speed = 0;

  this.run = function (speed) {
    if (speed) {
      speed = this._clampSpeed(speed);
      // if (this.speed != speed) {
      //   this.set('speed_sp', speed);
      //   this.speed = speed;
      //   this.set('command', 'run-forever');
      // }
      this.set('speed_sp', speed);
      this.speed = speed;
      this.set('command', 'run-forever');
    }
    // else if (this.command != 'run-forever') this.set('command', 'run-forever');
  };

  this.runTo = function (position, speed) {
    speed = this._clampSpeed(speed);
    this.set('position_sp', position);
    this.set('speed_sp', speed);
    this.set('command', 'run-to-rel-pos');
  };

  this.stop = function () {
    if (this.command != 'stop') this.set('command', 'stop');
  };

  this.position = function () {
    return parseInt(this.get('position'));
  };

  this.reset = function () {
    this.set('position', 0);
  };

  this.state = function () {
    return this.get('state').split(' ');
  };

  this._clampSpeed = function (speed) {
    if (speed >= 1000) speed = 1000;
    if (speed <= -1000) speed = -1000;
    return speed;
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

  this.ratio = function (ratio, speed) {
    this.left.run(ratio[0] * speed);
    this.right.run(ratio[1] * speed);
  };

  this.ratioTo = function (ratio, speed, position) {
    this.left.runTo(position, ratio[0] * speed);
    this.right.runTo(position, ratio[1] * speed);
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
    return Math.round((this.left.position() + this.right.position()) / 2);
  };

  this.state = function () {
    return this.left.state().concat(this.right.state());
  };

  this.reset = function () {
    this.left.reset();
    this.right.reset();
  };
};