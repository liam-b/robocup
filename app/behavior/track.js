module.exports = function (motors, angle, speed) {
  switch (angle) {
    case 9:
      motors.ratio([0.5, -0.5], speed);
      break;
    case 8:
      motors.ratio([0.4, -0.4], speed);
      break;
    case 7:
      motors.ratio([0.2, -0.2], speed);
      break;
    case 6:
      motors.ratio([0.1, -0.1], speed);
      break;
    case 5:
      motors.ratio([0, 0], speed);
      break;
    case 4:
      motors.ratio([-0.1, 0.1], speed);
      break;
    case 3:
      motors.ratio([-0.2, 0.2], speed);
      break;
    case 2:
      motors.ratio([-0.4, 0.4], speed);
      break;
    case 1:
      motors.ratio([-0.5, 0.5], speed);
      break;
    case 0:
      motors.ratio([1, -1], speed);
      break;
  }
}