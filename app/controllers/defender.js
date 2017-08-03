module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.DEFENDER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'initial': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.STATE = 'track';
    bot.motors.stop();
  },
  'track': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();

    console.log(value);

    if (value.distance > constants.DEFENDER.TRACK.CLEAR_DISTANCE && value.angle == 5) constants.DEFENDER.STATE = 'confirm_ball';
    else behaviors.track(bot.motors, bot.seeker, constants.DEFENDER.TRACK.SPEED);
  },
  'confirm_ball': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();

    constants.DEFENDER.CONFIRM.COUNT += 1;

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE || value.angle != 5) {
      constants.DEFENDER.STATE = 'track';
    }
    else if (constants.DEFENDER.CONFIRM.COUNT > constants.DEFENDER.CONFIRM.INTERCEPT_COUNT) {
      constants.DEFENDER.INTERCEPT.TIMER = 0;
      bot.motors.reset();
      constants.DEFENDER.STATE = 'intercept';
    }
    // else behaviors.track(bot.motors, bot.seeker, constants.DEFENDER.TRACK_SPEED);
    else bot.motors.stop();
  },
  'intercept': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();

    console.log(value);

    constants.DEFENDER.INTERCEPT.TIMER += 1;

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      bot.motors.stop();
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'retreat';
    }
    else if (constants.DEFENDER.INTERCEPT.TIMER == constants.DEFENDER.INTERCEPT.KICK_TIME) {
      constants.DEFENDER.KICK.TIMER = 0;
      constants.DEFENDER.STATE = 'kick';
    }
    else bot.motors.ratio([1, 1], constants.DEFENDER.INTERCEPT.SPEED);
  },
  'kick': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();
    constants.DEFENDER.KICK.TIMER += 1;

    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.KICK_TIME) bot.kicker.run(constants.DEFENDER.KICK.POWER);
    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.RESET_TIME) bot.kicker.run(constants.DEFENDER.KICK.RESET_SPEED);
    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.RETREAT_TIME) {
      bot.kicker.stop();
      constants.DEFENDER.RETREAT.TIMER = 0;
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'retreat';
    }

    bot.motors.ratio([1, 1], constants.DEFENDER.INTERCEPT.SPEED);
    // bot.motors.stop();
  },
  'retreat': function (bot, behaviors, helpers, constants) {
    var value = bot.seeker.value();

    console.log(value);

    if (bot.motors.averagePosition() <= 0) {
      bot.motors.stop();
      constants.DEFENDER.COOLDOWN.TIMER = 0;
      constants.DEFENDER.STATE = 'cooldown';
    }
    else bot.motors.ratio([-1, -1], constants.DEFENDER.INTERCEPT.SPEED);
  },
  'cooldown': function (bot, behaviors, helpers, constants) {
    constants.DEFENDER.COOLDOWN.TIMER += 1;

    if (constants.DEFENDER.COOLDOWN.TIMER == constants.DEFENDER.COOLDOWN.TRACK_TIME) constants.DEFENDER.STATE = 'track';
  }
};
