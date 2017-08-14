module.exports.Base = function (errorHandler) {
  this.__super.call(this, file.port.IN_1, errorHandler, true);

  this.play = function (tone, time, volume) {
    this.set('tone', tone + ' ' + time);
    this.set('volume', volume);
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype.__super = Device;

module.exports.Speaker = module.exports.Base;