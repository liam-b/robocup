describe('ball chaser behavior', function () {
  var chase = require('../../lib/behavior/chase.js');
  var lastMotorArguments = {};

  function fakeMotorsClass () {
    this.ratio = function (ratio, speed) {
      lastMotorArguments = {'ratio': ratio, 'speed': speed};
    }
  }

  var fakeMotors = new fakeMotorsClass ();

  it('should point towards ball', function () {
    chase(fakeMotors, 5, 1, 100);
    expect(lastMotorArguments).toEqual({'ratio': [1, 1], 'speed': 100});

    chase(fakeMotors, 4, 1, 100);
    expect(lastMotorArguments.ratio[0]).toBeLessThan(1);
    expect(lastMotorArguments.ratio[1]).toBeGreaterThan(1);
  });

  it('should try to find the ball if it losses it', function () {
    for (var i = 0; i < 5; i += 1) {
      chase(fakeMotors, 0, 0, 100);
    }

    expect(lastMotorArguments).toEqual({'ratio': [-1, 1], 'speed': 100});
  });
});