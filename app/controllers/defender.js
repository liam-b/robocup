module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.DEFENDER.STATE](bot, behaviors, helpers, constants); };

// module.exports = function (bot, behaviors, helpers, constants) {
//   constants.DEFENDER.STATE = 'track';
//   STATE.track(bot, behaviors, helpers, constants);
// };

var STATE = {
  'initial': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.STATE = 'track';
  },
  'track': function (bot, behaviors, helpers, constants) {
    var values = bot.seeker.value();
    if (values.distance > constants.INTERCEPT.CLEAR_DISTANCE) {
      bot.motors.reset();
      constants.DEFENDER.STATE = 'intercept';
    }
    else {
      behaviors.track(bot.motors, bot.seeker, constants.TRACK_SPEED);
    }
  },
  'intercept': function (bot, behaviors, helpers, constants) {
    var values = bot.seeker.value();
    if (values.distance > constants.KICK_RANGE) {
      behaviors.kick(bot.motors);
      constants.DEFENDER.MOTOR_ROTATIONS = bot.motors.averagePosition();
      // constants.DEFENDER.STATE = 'return';
      constants.DEFENDER.STATE = 'track';
    }
    else {
      behaviors.chase(bot.motors, constants.CHASE_SPEED, bot.seeker);
    }
  },
  'return': function (bot, behaviors, helpers, constants) {
    if (abs(bot.motors.averagePosition()) - abs(constants.DEFENDER.MOTOR_ROTATIONS) >= 0) {
      bot.motors.stop();
      constants.DEFENDER.STATE = 'track';
    }
    else {
      bot.motors.ratio([-1, -1], constants.DEFENDER.RETURN_SPEED);
    }
  }
};

function abs (value) {
  return (value < 0) ? (value * -1) : (value);
}
