var detail = require('../services/color.js');

detail('extra classes', 'io', __filename, function () {
  var extra = require('../../app/io/extra.js');

  describe('Leds class', function () {
    var leds = new extra.Leds();

    it('should make pretty colors', function () {
      spyOn(leds.group, 'setColor');

      leds.color([1, 0, 1, 0]);
      expect(leds.group.setColor).toHaveBeenCalled();
    })
  })

  describe('PowerSupply class', function () {
    var powerSupply = new extra.PowerSupply();

    it('should return current voltage', function () {
      expect(powerSupply.charge()).toEqual(8);
    })

    it('should return percentage', function () {
      expect(powerSupply.percentage()).toEqual(100);
    })

    it('should check if percentage is ok', function () {
      spyOn(powerSupply, 'percentage');
      spyOn(powerSupply.output, 'warn');

      powerSupply.battery.measuredVoltage = 6;
      powerSupply.check()
      expect(powerSupply.output.warn).toHaveBeenCalled();
      expect(powerSupply.percentage).toHaveBeenCalled();
    })
  })
})
