var _timeSinceLostBall = 0;

module.exports = function (motors, constants, seeker, output) {
  output.info('chase', 'hopefully chasing')
  var values = seeker.value();
  // if (values.distance >= 26 && values.distance <= 30 && values.angle == 7) {
  //   motors.ratio([1, 1], constants.CHASE_SPEED);
  // }
  else {
    switch (values.angle) {
      case 9:
        motors.ratio([0.5, -0.5], constants.CHASE_SPEED);
        break;
      case 8:
        motors.ratio([1.7, 0], constants.CHASE_SPEED);
        break;
      case 7:
        motors.ratio([1.5, 0.5], constants.CHASE_SPEED);
        break;
      case 6:
        motors.ratio([1.3, 0.7], constants.CHASE_SPEED);
        break;
      case 5:
        motors.ratio([1, 1], constants.CHASE_SPEED);
        break;
      case 4:
        motors.ratio([0.7, 1.3], constants.CHASE_SPEED);
        break;
      case 3:
        motors.ratio([0.5, 1.5], constants.CHASE_SPEED);
        break;
      case 2:
        motors.ratio([0, 1.7], constants.CHASE_SPEED);
        break;
      case 1:
        motors.ratio([-0.5, 0.5], constants.CHASE_SPEED);
        break;
      case 0:
        motors.ratio([0.5, 1.5], constants.CHASE_SPEED);
        break;
      case undefined:
        motors.ratio([-1, 1], constants.CHASE_SPEED);
        break;
    }
  }

  // if (values.distance > 60 && (values.angle == 4 || values.angle == 5 || values.angle == 6)) motors.ratio([1, 1], constants.CHASE_SPEED);
  //
  // if (values.angle != 0) _timeSinceLostBall = 0;
  // else _timeSinceLostBall += 1;
  //
  // if (_timeSinceLostBall >= 15) {
  //   motors.stop();
  //   process.exit();
  // }
  //
  // if (_timeSinceLostBall >= 5) motors.ratio([-1, 1], constants.CHASE_SPEED);
};
