var _timeSinceLostBall = 0;

module.exports = function (motors, constants, seeker) {
  if (seeker.distance >= 26 && seeker.distance <= 30 && seeker.angle == 7) {
    motors.ratio([1, 1], constants.CHASE_SPEED);
  }
  else {
    switch (seeker.angle) {
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

  if (seeker.distance > 60 && (seeker.angle == 4 || seeker.angle == 5 || seeker.angle == 6)) motors.ratio([1, 1], constants.CHASE_SPEED);

  if (seeker.angle != 0) _timeSinceLostBall = 0;
  else _timeSinceLostBall += 1;

  if (_timeSinceLostBall >= 15) {
    motors.stop();
    process.exit();
  }

  if (_timeSinceLostBall >= 5) motors.ratio([-1, 1], constants.CHASE_SPEED);
};