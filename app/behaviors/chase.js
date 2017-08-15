module.exports = function () {
  var angle = bot.seeker.angle();

  switch (angle) {
    case 9:
      bot.motors.ratio([0.5, -0.5], constants.CHASE_SPEED);
      break;
    case 8:
      bot.motors.ratio([1.7, 0], constants.CHASE_SPEED);
      break;
    case 7:
      bot.motors.ratio([1.5, 0.5], constants.CHASE_SPEED);
      break;
    case 6:
      bot.motors.ratio([1.3, 0.6], constants.CHASE_SPEED);
      break;
    case 5:
      // bot.motors.ratio([1, 1], constants.CHASE_SPEED);
      bot.motors.ratio([0.9, 1], constants.CHASE_SPEED);
      break;
    case 4:
      bot.motors.ratio([0.6, 1.3], constants.CHASE_SPEED);
      break;
    case 3:
      bot.motors.ratio([0.5, 1.5], constants.CHASE_SPEED);
      break;
    case 2:
      bot.motors.ratio([0, 1.7], constants.CHASE_SPEED);
      break;
    case 1:
      bot.motors.ratio([-0.5, 0.5], constants.CHASE_SPEED);
      break;
    case 0:
      bot.motors.ratio([-0.25, -1.75], constants.CHASE_SPEED);
      break;
  }
  // } else {
  //   bot.motors.ratio([1, 1], constants.CHASE_SPEED);
  // }
};
