var detail = require('../services/color.js');

detail('motor wrapper classes', 'io', __filename, function () {
  var motor = require('../../app/io/motor.js');

  describe('DriveMotors class', function () {
    var motors = new motor.DriveMotors('outA', 'outB');

    it('should be able to control individual motors', function () {
      spyOn(motors.left, 'runForever');
      spyOn(motors.right, 'runForever');

      motors.run(100, 100);
      expect(motors.left.runForever).toHaveBeenCalledWith(100);
      expect(motors.right.runForever).toHaveBeenCalledWith(100);
    })

    it('should be able to run motors with ratio', function () {
      spyOn(motors.left, 'runForever');
      spyOn(motors.right, 'runForever');

      motors.ratio([1, 1], 100);
      expect(motors.left.runForever).toHaveBeenCalledWith(100);
      expect(motors.right.runForever).toHaveBeenCalledWith(100);
    })

    it('should be able to stop both motors', function () {
      spyOn(motors.left, 'runForever');
      spyOn(motors.right, 'runForever');

      spyOn(motors.left, 'stop');
      spyOn(motors.right, 'stop');

      motors.run(100, 100);
      expect(motors.left.runForever).toHaveBeenCalledWith(100);
      expect(motors.right.runForever).toHaveBeenCalledWith(100);
      motors.stop();
      expect(motors.left.stop).toHaveBeenCalled();
      expect(motors.right.stop).toHaveBeenCalled();
    })

    it('should check if motors are connected', function () {
      spyOn(motors.output, 'err');

      motors.left.connected = false;
      motors.right.connected = false;
      motors.check();
      expect(motors.output.error).toHaveBeenCalled();
    })
  })

  describe('Motor class', function () {
    var motors = new motor.Motor('outA');

    it('should be able to control one motor', function () {
      spyOn(motors.motor, 'runForever');

      motors.run(100);
      expect(motors.motor.runForever).toHaveBeenCalledWith(100);
    })

    it('should be able to stop motor', function () {
      spyOn(motors.motor, 'runForever');

      spyOn(motors.motor, 'stop');

      motors.run(100, 100);
      expect(motors.motor.runForever).toHaveBeenCalledWith(100);
      motors.stop();
      expect(motors.motor.stop).toHaveBeenCalled();
    })

    it('should check if motor is connected', function () {
      spyOn(motors.output, 'err');

      motors.motor.connected = false;
      motors.check();
      expect(motors.output.error).toHaveBeenCalled();
    })
  })
})
