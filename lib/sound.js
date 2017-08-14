module.exports.Base = function (errorHandler) {
  this.__super.call(this, 'speaker', errorHandler, '/sys/devices/platform/snd-legoev3/');

  this.play = function (tone, time, volume) {
    if (volume) this.set('volume', volume);
    this.set('tone', tone + ' ' + time);
  };

  this.volume = function (volume) {
    if (volume) this.set('volume', volume);
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype.__super = Device;

module.exports.Speaker = module.exports.Base;