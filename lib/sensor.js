module.exports.Base = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.mode = 'reset';

  this.value = function (num) {
    return this.get('value' + num);
  };

  this.set = function (mode) {
    if (this.mode != mode) this.set('mode', mode);
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype._super = Device;

module.exports.ColorSensor = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.COL_REFLECT = 'COL-REFLECT';
  this.COL_AMBIENT = 'COL-AMBIENT';
  this.COL_COLOR = 'COL-COLOR';
  this.REF_RAW = 'REF-RAW';
  this.RGB_RAW = 'RGB-RAW';
};

module.exports.ColorSensor.prototype = Object.create(module.exports.Base.prototype);
module.exports.ColorSensor.prototype.constructor = module.exports.ColorSensor;
module.exports.ColorSensor.prototype._super = module.exports.Base;

module.exports.IRSeeker = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.DC = 'DC';
  this.AC = 'AC';
  this.DC_ALL = 'DC-ALL';
  this.AC_ALL = 'AC-ALL';

  this.average = function () {
    return (this.value(1) + this.value(2) + this.value(3) + this.value(4) + this.value(5)) / 5;
  };
};

module.exports.IRSeeker.prototype = Object.create(module.exports.Base.prototype);
module.exports.IRSeeker.prototype.constructor = module.exports.IRSeeker;
module.exports.IRSeeker.prototype._super = module.exports.Base;

module.exports.Compass = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.COMPASS = 'COMPASS';
};

module.exports.Compass.prototype = Object.create(module.exports.Base.prototype);
module.exports.Compass.prototype.constructor = module.exports.Compass;
module.exports.Compass.prototype._super = module.exports.Base;