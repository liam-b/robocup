module.exports.Base = function (port, errorHandler) {
  this.__super.call(this, port, errorHandler);

  this.mode = 'reset';

  this.value = function (num) {
    return parseInt(this.get('value' + num.toString()));
  };

  this.mode = function (newMode) {
    if (this.mode != newMode) this.set('mode', newMode);
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype.__super = Device;

module.exports.Color = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.REFLECTIVE = 'COL-REFLECT';
  this.AMBIENT = 'COL-AMBIENT';
  this.COLOR = 'COL-COLOR';
  this.REF = 'REF-RAW';
  this.RAW = 'RGB-RAW';

  this.color = function () {
    return this.value(0);
  };
};

module.exports.Color.prototype = Object.create(module.exports.Base.prototype);
module.exports.Color.prototype.constructor = module.exports.Color;
module.exports.Color.prototype._super = module.exports.Base;

module.exports.IRSeeker = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.UNMODULATED = 'DC-ALL';
  this.MODULATED = 'AC-ALL';

  this.distance = function () {
    // return this.value(1) + this.value(2) + this.value(3) + this.value(4) + this.value(5);
    return (this.value(1) + this.value(2) + this.value(3) + this.value(4) + this.value(5)) / 5;
    // return this.value(5);
  };

  this.angle = function () {
    return this.value(0);
  };
};

module.exports.IRSeeker.prototype = Object.create(module.exports.Base.prototype);
module.exports.IRSeeker.prototype.constructor = module.exports.IRSeeker;
module.exports.IRSeeker.prototype._super = module.exports.Base;

module.exports.Compass = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.COMPASS = 'COMPASS';

  this.rotation = function () {
    return this.value(0);
  };
};

module.exports.Compass.prototype = Object.create(module.exports.Base.prototype);
module.exports.Compass.prototype.constructor = module.exports.Compass;
module.exports.Compass.prototype._super = module.exports.Base;
