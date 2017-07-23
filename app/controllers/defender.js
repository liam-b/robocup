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

    constants.INTERCEPT.INTERCEPT_RETREAT_TIMER += 1;

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER < constants.INTERCEPT.RETURN_AT) {
      bot.motors.ratio([1, 1], 400);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER > constants.INTERCEPT.RETURN_AT && constants.INTERCEPT.INTERCEPT_RETREAT_TIMER < constants.INTERCEPT.STOP_AT) {
      bot.motors.ratio([-1, -1], 400);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER == constants.INTERCEPT.KICK_AT) {
      bot.kicker.run(600);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER == constants.INTERCEPT.RESET_KICK_AT) {
      bot.kicker.run(-300);
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER == constants.INTERCEPT.STOP_RESET) {
      bot.kicker.stop();
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER < constants.INTERCEPT.CHECK_SENSOR) {
      if (value.distance < constants.INTERCEPT.CLEAR_DISTANCE) {
        constants.INTERCEPT.INTERCEPT_RETREAT_TIMER = constants.INTERCEPT.RETURN_AT + constants.INTERCEPT.CHECK_SENSOR;
      }
    }

    if (constants.INTERCEPT.INTERCEPT_RETREAT_TIMER > constants.INTERCEPT.STOP_AT) {
      constants.INTERCEPT.INTERCEPT_RETREAT_TIMER = 0;
      bot.motors.stop();
      constants.DEFENDER.STATE = 'track';
    }
  }
};
