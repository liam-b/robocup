module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.DEFENDER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'initial': function (bot, behaviors, helpers, constants) {
    console.log('initial');
    constants.DEFENDER.STATE = 'track';
  },
  // 'track': function (bot, behaviors, helpers, constants) {
  //   console.log('track');
  //   var values = bot.sensor.seeker.value();
  //   console.log('got seeker values');
  //   console.log('values', values);
  //   console.log('dist', constants.INTERCEPT.CLEAR_DISTANCE);
  //   if (values.distance > constants.INTERCEPT.CLEAR_DISTANCE) {
  //     console.log('going to intercept');
  //     bot.motors.reset();
  //     constants.DEFENDER.STATE = 'intercept';
  //   }
  //   else {
  //     console.log('going to track');
  //     behaviors.track(bot.motors, bot.seeker, constants.TRACK_SPEED);
  //   }
  //   console.log('end of track loop');
  // },
  'track': function (bot, behaviors, helpers, constants) {
    console.log('track');
      var values = bot.sensor.seeker.value();
      console.log('values', values);
  },
  'intercept': function (bot, behaviors, helpers, constants) {
    console.log('intercept');
    var values = bot.sensor.seeker.value();
    if (values.distance > constants.KICK_RANGE) {
      behaviors.kick(bot.motors);
      constants.DEFENDER.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'return';
    }
    else {
      behaviors.chase(bot.motors, bot.seeker, constants.CHASE_SPEED);
    }
  },
  'return': function (bot, behaviors, helpers, constants) {
    console.log('return');
    if (bot.motors.averagePosition() + constants.DEFENDER.MOTOR_ROTATIONS == 0) {
      bot.motors.stop();
      constants.DEFENDER.STATE = 'track';
    }
    else {
      bot.motors.ratio([-1, -1], constants.DEFENDER.RETURN_SPEED);
    }
  }
};
