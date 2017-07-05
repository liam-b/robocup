var detail = require('../services/color.js');

detail('ball chase', 'behavior', __filename, function () {
  var chase = require('../../app/behaviors/chase.js');
  var motor = require('../../app/io/motor.js');
  var constants = require('../services/constants.mock.js');

  var motors = new motor.DriveMotors()

  it('should point towards ball', function () {
    spyOn(motors, 'ratio');

    // chase(motors, constants, {angle: 5, distance: 20});
    // expect(motors.ratio).toHaveBeenCalledWith([1, 1], constants.CHASE_SPEED);

    var returned;

    var seekerMock1 = {
      value: function () {
        return {angle: 4, distance: 20};
      }
    };

    var seekerMock2 = {
      value: function () {
        return {angle: 4, distance: 20};
      }
    };

    // chase(motors, constants, seekerMock1);
    // returned = motors.ratio.calls.mostRecent().args;
    // expect(returned[0][0]).toBeLessThan(1);
    // expect(returned[0][1]).toBeGreaterThan(1);
    // expect(returned[1]).toBe(constants.CHASE_SPEED);
    //
    // chase(motors, constants, seekerMock2);
    // returned = motors.ratio.calls.mostRecent().args;
    // expect(returned[0][0]).toBeGreaterThan(1);
    // expect(returned[0][1]).toBeLessThan(1);
    // expect(returned[1]).toBe(constants.CHASE_SPEED);

    expect(true).toBe(false);
  });
});
