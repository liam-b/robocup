var detail = require('../services/color.js');

detail('sensor wrapper classes', 'io', __filename, function () {
  var sensor = require('../../lib/io/sensor.js');

  describe('ColorSensor class', function () {
    var colorSensor = new sensor.ColorSensor('in1');

    it('should return correct color value', function () {
      spyOn(colorSensor.sensor, 'getValue');

      colorSensor.value();
      expect(colorSensor.sensor.getValue).toHaveBeenCalledWith(0);
    })

    it('should set sensor mode', function () {
      spyOn(colorSensor.sensor, 'setProperty');

      colorSensor.mode('mock');
      expect(colorSensor.sensor.setProperty).toHaveBeenCalledWith('mode', 'mock');
    })

    it('should check if sensor is connected', function () {
      spyOn(colorSensor.output, 'err');

      colorSensor.sensor.connected = false;
      colorSensor.check();
      expect(colorSensor.output.err).toHaveBeenCalled();
    })

    it('should catch sensor disconnect', function () {
      spyOn(colorSensor.output, 'err');

      colorSensor.sensor.connected = false;
      colorSensor.value();
      colorSensor.mode('mock');
      expect(colorSensor.output.err).toHaveBeenCalled();
    })
  })

  describe('UltrasonicSensor class', function () {
    var ultrasonicSensor = new sensor.UltrasonicSensor('in1');

    it('should return correct distance value', function () {
      spyOn(ultrasonicSensor.sensor, 'getValue');

      ultrasonicSensor.value();
      expect(ultrasonicSensor.sensor.getValue).toHaveBeenCalledWith(0);
    })

    it('should set sensor mode', function () {
      spyOn(ultrasonicSensor.sensor, 'setProperty');

      ultrasonicSensor.mode('mock');
      expect(ultrasonicSensor.sensor.setProperty).toHaveBeenCalledWith('mode', 'mock');
    })

    it('should check if sensor is connected', function () {
      spyOn(ultrasonicSensor.output, 'err');

      ultrasonicSensor.sensor.connected = false;
      ultrasonicSensor.check();
      expect(ultrasonicSensor.output.err).toHaveBeenCalled();
    })

    it('should catch sensor disconnect', function () {
      spyOn(ultrasonicSensor.output, 'err');

      ultrasonicSensor.sensor.connected = false;
      ultrasonicSensor.value();
      ultrasonicSensor.mode('mock');
      expect(ultrasonicSensor.output.err).toHaveBeenCalled();
    })
  })

  describe('CompassSensor class', function () {
    var compassSensor = new sensor.CompassSensor('in1');

    it('should return correct direction', function () {
      spyOn(compassSensor.sensor, 'getValue');

      compassSensor.value();
      expect(compassSensor.sensor.getValue).toHaveBeenCalledWith(0);
    })

    it('should check if sensor is connected', function () {
      spyOn(compassSensor.output, 'err');

      compassSensor.sensor.connected = false;
      compassSensor.check();
      expect(compassSensor.output.err).toHaveBeenCalled();
    })

    it('should catch sensor disconnect', function () {
      spyOn(compassSensor.output, 'warn');

      compassSensor.sensor.connected = false;
      compassSensor.value();
      expect(compassSensor.output.warn).toHaveBeenCalled();
    })
  })

  describe('SeekerSensor class', function () {
    var seekerSensor = new sensor.UltrasonicSensor('in1');

    it('should return correct distance value', function () {
      spyOn(seekerSensor.sensor, 'getValue');

      seekerSensor.value();
      expect(seekerSensor.sensor.getValue).toHaveBeenCalled();
    })

    it('should return correct direction value', function () {
      spyOn(seekerSensor.sensor, 'getValue');

      seekerSensor.value();
      expect(seekerSensor.sensor.getValue).toHaveBeenCalledWith(0);
    })

    it('should set sensor mode', function () {
      spyOn(seekerSensor.sensor, 'setProperty');

      seekerSensor.mode('mock');
      expect(seekerSensor.sensor.setProperty).toHaveBeenCalledWith('mode', 'mock');
    })

    it('should check if sensor is connected', function () {
      spyOn(seekerSensor.output, 'err');

      seekerSensor.sensor.connected = false;
      seekerSensor.check();
      expect(seekerSensor.output.err).toHaveBeenCalled();
    })

    it('should catch sensor disconnect', function () {
      spyOn(seekerSensor.output, 'err');

      seekerSensor.sensor.connected = false;
      seekerSensor.value();
      seekerSensor.mode('mock');
      expect(seekerSensor.output.err).toHaveBeenCalled();
    })
  })
})
