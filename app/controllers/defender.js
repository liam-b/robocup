module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.DEFENDER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'initial': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.STATE = 'track';
    bot.motors.stop();
  },
  'track': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();
    console.log(value.distance);
    constants.DEFENDER.INTERCEPT_DELAY_TIMER += 1;

    if (value.distance > constants.INTERCEPT.CLEAR_DISTANCE && constants.DEFENDER.INTERCEPT_DELAY_TIMER >= constants.DEFENDER.INTERCEPT_DELAY_WAIT) {
      if (constants.INTERCEPT.CLEAR_TIMER >= constants.INTERCEPT.CLEAR_WAIT) {
        bot.motors.reset();
        constants.INTERCEPT.TIMER = 0;
        constants.INTERCEPT.INTERCEPT_RETREAT_TIMER = 0;
        constants.DEFENDER.STATE = 'intercept';
        constants.INTERCEPT.CLEAR_TIMER = 0;
      }
      constants.INTERCEPT.CLEAR_TIMER += 1;
    }
    else {
      behaviors.track(bot.motors, bot.seeker, constants.TRACK_SPEED);
    }
  },
  'intercept': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();
    // constants.INTERCEPT.TIMER += 1;
    //
    // if (constants.INTERCEPT.TIMER > constants.INTERCEPT.PAST_TIME) {
    //   constants.DEFENDER.RETURN_WAIT_TIMER = 0;
    //   console.log('stopped from timer');
    //   constants.DEFENDER.STATE = 'return';
    // }
    // if (value.angle > 7 || value.angle < 3) {
    //   constants.DEFENDER.RETURN_WAIT_TIMER = 0;
    //   console.log('stopped from angle');
    //   constants.DEFENDER.STATE = 'return';
    // }
    // if (value.distance > constants.KICK_RANGE) {
    //   behaviors.kick(bot.motors);
    //   constants.DEFENDER.MOTOR_ROTATIONS = bot.motors.averagePosition();
    //   bot.motors.reset();
    //   constants.DEFENDER.RETURN_WAIT_TIMER = 0;
    //   console.log('stopped from default');
    //   constants.DEFENDER.STATE = 'return';
    // }
    // else {
    //   behaviors.chase(bot.motors, constants.CHASE_SPEED, bot.seeker);
    // }

    constants.INTERCEPT.INTERCEPT_RETREAT_TIMER += 1;

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER < constants.INTERCEPT.RETURN_AT) {
      bot.motors.ratio([1, 1], 400);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER > constants.INTERCEPT.RETURN_AT && constants.INTERCEPT.INTERCEPT_RETREAT_TIMER < constants.INTERCEPT.STOP_AT) {
      bot.motors.ratio([-1, -1], 400);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER == constants.INTERCEPT.KICK_AT) {
      bot.kicker.run(700);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER == constants.INTERCEPT.RESET_KICK_AT) {
      bot.kicker.run(-300);
    }
    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER == constants.INTERCEPT.STOP_RESET) {
      bot.kicker.stop();
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER > constants.INTERCEPT.STOP_AT) {
      constants.INTERCEPT.INTERCEPT_RETREAT_TIMER = 0;
      bot.motors.stop();
      constants.DEFENDER.STATE = 'track';
    }
  },
  'return': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.RETURN_WAIT_TIMER += 1;
    if (Math.abs(bot.motors.averagePosition()) - Math.abs(constants.DEFENDER.MOTOR_ROTATIONS) > 0) {
      if (constants.DEFENDER.RETURN_WAIT_TIMER > constants.DEFENDER.RETURN_WAIT) {
        bot.motors.stop();
        constants.DEFENDER.INTERCEPT_DELAY_TIMER = 0;
        constants.DEFENDER.STATE = 'track';
      }
      else {}
    }
    else {
      bot.motors.ratio([-1, -1], constants.DEFENDER.RETURN_SPEED);
    }
  },
  'clear': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.RETURN_WAIT_TIMER += 1;
    if (Math.abs(bot.motors.averagePosition()) - Math.abs(constants.DEFENDER.MOTOR_ROTATIONS) > 0) {
      if (constants.DEFENDER.RETURN_WAIT_TIMER > constants.DEFENDER.RETURN_WAIT) {
        bot.motors.stop();
        constants.DEFENDER.INTERCEPT_DELAY_TIMER = 0;
        constants.DEFENDER.STATE = 'track';
      }
      else {}
    }
    else {
      bot.motors.ratio([-1, -1], constants.DEFENDER.RETURN_SPEED);
    }
  }
};
