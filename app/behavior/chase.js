var _timeSinceLostBall = 0

module.exports = function (motors, angle, distance, speed) {
  if (distance >= 26 && distance <= 30 && angle == 7) {
    motors.ratio([1, 1], speed);
  }
  else {
    switch (angle) {
      case 9:
        motors.ratio([0.5, -0.5], speed);
        break;
      case 8:
        motors.ratio([1.7, 0.3], speed);
        break;
      case 7:
        motors.ratio([1.5, 0.5], speed);
        break;
      case 6:
        motors.ratio([1.3, 0.7], speed);
        break;
      case 5:
        motors.ratio([1, 1], speed);
        break;
      case 4:
        motors.ratio([0.7, 1.3], speed);
        break;
      case 3:
        motors.ratio([0.5, 1.5], speed);
        break;
      case 2:
        motors.ratio([0.3, 1.7], speed);
        break;
      case 1:
        motors.ratio([-0.5, 0.5], speed);
        break;
      case undefined:
        motors.ratio([1, 1], speed);
        break;
    }
  }

  if (distance > 60 && (angle == 4 || angle == 5 || angle == 6)) motors.ratio([1, 1], speed);

  if (angle != 0) _timeSinceLostBall = 0;
  else _timeSinceLostBall += 1;

  if (_timeSinceLostBall >= 15) {
    motors.stop();
    process.exit();
  }

  if (_timeSinceLostBall >= 5) motors.ratio([-1, 1], speed);
}