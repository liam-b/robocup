var detail = require('../services/color.js');

detail('ball chase', 'behavior', __filename, function () {
  var chase = require('../../app/behavior/chase.js');
  var motor = require('../../app/io/motor.js')

  var motors = new motor.DriveMotors()

  it('should point towards ball', function () {
    spyOn(motors, 'ratio');

    chase(motors, 5, 1, 100);
    expect(motors.ratio).toHaveBeenCalledWith([1, 1], 100);

    chase(motors, 4, 1, 100);
    expect(motors.ratio).toHaveBeenCalledWith([0.8, 1.2], 100);
  })

  it('should try to find the ball if it loses it', function () {
    spyOn(motors, 'ratio');

    for (var i = 0; i < 5; i += 1) chase(motors, 0, 0, 100);
    expect(motors.ratio).toHaveBeenCalledWith([-1, 1], 100);
  })
})
