module.exports.Base = function (errorHandler) {
  this.__super.call(this, file.port.IN_1, errorHandler);

  this.voltage = function () {
    return this.get('voltage_now');
  };

  this.current = function () {
    return this.get('current_now');
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype.__super = Device;

module.exports.Battery = module.exports.Base;