module.exports = function (motors, seeker, speed) {
  // var values = seeker.value();

  switch (bot.seeker.angle()) {
    case 9:
      motors.ratio([0.6, -0.6], speed);
      break;
    case 8:
      motors.ratio([0.4, -0.4], speed);
      break;
    case 7:
      motors.ratio([0.3, -0.3], speed);
      break;
    case 6:
      motors.ratio([0.2, -0.2], speed);
      break;
    case 5:
      // motors.ratio([0, 0], speed);
      motors.stop();
      break;
    case 4:
      motors.ratio([-0.2, 0.2], speed);
      break;
    case 3:
      motors.ratio([-0.3, 0.3], speed);
      break;
    case 2:
      motors.ratio([-0.4, 0.4], speed);
      break;
    case 1:
      motors.ratio([-0.6, 0.6], speed);
      break;
    case 0:
      motors.ratio([-0.3, 0.3], speed);
      break;
  }
};
