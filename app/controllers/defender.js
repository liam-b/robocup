module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.DEFENDER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'initial': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.STATE = 'track';
  },
  'track': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();
    if (value.distance > constants.INTERCEPT.CLEAR_DISTANCE) {
      bot.motors.reset();
      constants.DEFENDER.STATE = 'intercept';
    }
    else {
      behaviors.track(bot.motors, bot.seeker, constants.TRACK_SPEED);
    }
  },
  'intercept': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();
    if (value.distance > constants.KICK_RANGE) {
      behaviors.kick(bot.motors);
      constants.DEFENDER.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'return';
    }
    else {
      behaviors.chase(bot.motors, constants.CHASE_SPEED, bot.seeker);
    }
  },
  'return': function (bot, behaviors, helpers, constants) {
    if (Math.abs(bot.motors.averagePosition()) - Math.abs(constants.DEFENDER.MOTOR_ROTATIONS) > 0) {
      bot.motors.stop();
      constants.DEFENDER.STATE = 'track';
    }
    else {
      bot.motors.ratio([-1, -1], constants.DEFENDER.RETURN_SPEED);
    }
  }
};
