module.exports = function () { STATE[constants.DEFENDER.STATE](); };

var STATE = {
  'initial': function () {
    constants.DEFENDER.STATE = 'track';
    bot.motors.stop();
  },
  'track': function () {
    var value = bot.seeker.value();

    if (value.distance > constants.DEFENDER.TRACK.CLEAR_DISTANCE && value.angle == 5) {
      constants.DEFENDER.CONFIRM.COUNT = 0;
      constants.DEFENDER.STATE = 'confirm_ball';
    }
    else if (value.distance > constants.DEFENDER.TRACK.TRACK_DISTANCE) behaviors.track(bot.motors, bot.seeker, constants.DEFENDER.TRACK.SPEED);
    else bot.motors.stop();
  },
  'confirm_ball': function () {
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
    else bot.motors.stop();
  },
  'intercept': function () {
    var value = bot.seeker.value();

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'retreat';
    }
    else if (bot.motors.averagePosition() >= constants.DEFENDER.INTERCEPT.KICK_ROTATIONS) {
      constants.DEFENDER.KICK.TIMER = 0;
      constants.DEFENDER.STATE = 'kick';
    }
    else bot.motors.ratio([1, 1], constants.DEFENDER.INTERCEPT.SPEED);
  },
  'kick': function () {
    var value = bot.seeker.value();

    constants.DEFENDER.KICK.TIMER += 1;

    if (constants.DEFENDER.KICK.TIMER + 1 > constants.DEFENDER.KICK.RESET_TIME && constants.DEFENDER.STATE == 'kick') bot.motors.ratio([1, 1], constants.DEFENDER.INTERCEPT.SPEED);
    else bot.motors.ratio([-1, -1], constants.DEFENDER.INTERCEPT.SPEED);

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      bot.kicker.stop();
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'retreat';
    }

    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.KICK_TIME) bot.kicker.run(constants.DEFENDER.KICK.POWER);
    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.RESET_TIME) bot.kicker.run(-constants.DEFENDER.KICK.RESET_SPEED);
    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.RETREAT_TIME) {
      bot.kicker.stop();
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      constants.DEFENDER.STATE = 'retreat';
    }
  },
  'retreat': function () {
    bot.motors.ratio([-1, -1], constants.DEFENDER.INTERCEPT.SPEED);
    
    if (bot.motors.averagePosition() <= constants.DEFENDER.RETREAT.STOP_FUDGE) {
      bot.motors.stop();
      constants.DEFENDER.COOLDOWN.TIMER = 0;
      constants.DEFENDER.STATE = 'cooldown';
    }
  },
  'cooldown': function () {
    constants.DEFENDER.COOLDOWN.TIMER += 1;

    bot.motors.stop();

    if (constants.DEFENDER.COOLDOWN.TIMER == constants.DEFENDER.COOLDOWN.TRACK_TIME) constants.DEFENDER.STATE = 'track';
  }
};
