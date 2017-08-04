module.exports = function () { STATE[constants.DEFENDER.STATE](); };

var STATE = {
  'initial': function () {
    output.debug('controller', 'started defending', constants.DEFENDER.STATE);
    constants.DEFENDER.STATE = 'track';
    bot.motors.stop();
  },
  'track': function () {
    var value = bot.seeker.value();

    if (value.distance > constants.DEFENDER.TRACK.CLEAR_DISTANCE && value.angle == 5) {
      constants.DEFENDER.CONFIRM.COUNT = 0;
      output.debug('controller', 'detected ball', constants.DEFENDER.STATE);

      if (constants.DEFENDER.CONFIRM.DO) {
        output.debug('controller', 'confirming ball', constants.DEFENDER.STATE);
        constants.DEFENDER.STATE = 'confirm_ball';
      }
      else {
        output.debug('controller', 'skipping ball confirmation', constants.DEFENDER.STATE);
        constants.DEFENDER.INTERCEPT.TIMER = 0;
        bot.motors.reset();
        output.debug('controller', 'intercepting', constants.DEFENDER.STATE);
        constants.DEFENDER.STATE = 'intercept';
      }
    }
    else if (value.distance > constants.DEFENDER.TRACK.TRACK_DISTANCE) behaviors.track(bot.motors, bot.seeker, constants.DEFENDER.TRACK.SPEED);
    else bot.motors.stop();
  },
  'confirm_ball': function () {
    var value = bot.seeker.value();

    constants.DEFENDER.CONFIRM.COUNT += 1;

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE || value.angle != 5) {
      output.warn('controller', 'lost ball while confirming', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'track';
    }
    else if (constants.DEFENDER.CONFIRM.COUNT > constants.DEFENDER.CONFIRM.INTERCEPT_COUNT) {
      constants.DEFENDER.INTERCEPT.TIMER = 0;
      bot.motors.reset();
      output.debug('controller', 'confirmed ball', constants.DEFENDER.STATE);
      output.debug('controller', 'intercepting', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'intercept';
    }
    else bot.motors.stop();
  },
  'intercept': function () {
    var value = bot.seeker.value();

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      output.warn('controller', 'lost ball during intercept', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'retreat';
    }
    else if (bot.motors.averagePosition() >= constants.DEFENDER.INTERCEPT.KICK_ROTATIONS) {
      constants.DEFENDER.KICK.TIMER = 0;
      output.debug('controller', 'kicking ball', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'kick';
    }
    else bot.motors.ratio([1, 1], constants.DEFENDER.INTERCEPT.SPEED);
  },
  'kick': function () {
    var value = bot.seeker.value();

    constants.DEFENDER.KICK.TIMER += 1;

    bot.motors.ratio([1, 1], constants.DEFENDER.KICK.DRIVE_SPEED);

    if (value.distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      bot.kicker.stop();
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      output.warn('controller', 'lost ball while kicking', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'retreat';
    }

    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.KICK_TIME) {
      output.debug('controller', 'kick!', constants.DEFENDER.STATE);
      bot.kicker.run(constants.DEFENDER.KICK.POWER);
    }

    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.RESET_TIME) bot.kicker.run(-constants.DEFENDER.KICK.RESET_SPEED);

    if (constants.DEFENDER.KICK.TIMER == constants.DEFENDER.KICK.RETREAT_TIME) {
      bot.kicker.stop();
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.averagePosition();
      output.debug('controller', 'retreating after kicking', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'retreat';
    }
  },
  'retreat': function () {
    bot.motors.ratio([-1, -1], constants.DEFENDER.INTERCEPT.SPEED);

    if (bot.motors.averagePosition() <= constants.DEFENDER.RETREAT.STOP_FUDGE) {
      if (constants.DEFENDER.COOLDOWN.DO) {
        bot.motors.stop();
        constants.DEFENDER.COOLDOWN.TIMER = 0;
        output.debug('controller', 'moving to cooldown', constants.DEFENDER.STATE);
        constants.DEFENDER.STATE = 'cooldown';
      }
      else {
        bot.motors.stop();
        output.debug('controller', 'skipping cooldown', constants.DEFENDER.STATE);
        constants.DEFENDER.STATE = 'track';
      }
    }
  },
  'cooldown': function () {
    constants.DEFENDER.COOLDOWN.TIMER += 1;

    bot.motors.stop();

    if (constants.DEFENDER.COOLDOWN.TIMER == constants.DEFENDER.COOLDOWN.TRACK_TIME) {
      output.debug('controller', 'cooldown finished', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'track';
    }
  }
};
