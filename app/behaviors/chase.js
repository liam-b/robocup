module.exports = function (motors, constants, seeker) {
  var values = seeker.value();
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
      // console.log('eh?'); // s
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
  }
  // } else {
  //   motors.ratio([1, 1], constants.CHASE_SPEED);
  // }
};
