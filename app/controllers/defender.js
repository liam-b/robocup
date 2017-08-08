module.exports = function () { STATE[constants.DEFENDER.STATE](); };

var STATE = {
  'initial': function () {
    output.debug('controller', 'started defending', constants.DEFENDER.STATE);
    constants.DEFENDER.STATE = 'track';
    bot.motors.stop();
  },
  'track': function () {
    var distance = bot.seeker.distance();
    var angle = bot.seeker.angle();

    if (distance > constants.DEFENDER.TRACK.CLEAR_DISTANCE && angle == 5) {
      constants.DEFENDER.CONFIRM.COUNT = 0;
      output.debug('controller', 'detected ball', constants.DEFENDER.STATE);

      if (constants.DEFENDER.CONFIRM.DO) {
        output.debug('controller', 'confirming ball', constants.DEFENDER.STATE);
        constants.DEFENDER.STATE = 'confirm_ball';
      }
      else {
        output.debug('controller', 'skipping ball confirmation', constants.DEFENDER.STATE);
        output.debug('controller', 'intercepting', constants.DEFENDER.STATE);
        constants.DEFENDER.STATE = 'pre_intercept';
      }
    }
    else if (distance > constants.DEFENDER.TRACK.TRACK_DISTANCE) behaviors.track(bot.motors, bot.seeker, constants.DEFENDER.TRACK.SPEED);
    else bot.motors.stop();
  },
  'confirm_ball': function () {
    var distance = bot.seeker.distance();
    var angle = bot.seeker.angle();

    constants.DEFENDER.CONFIRM.COUNT += 1;

    if (distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE || angle != 5) {
      output.warn('controller', 'lost ball while confirming', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'track';
    }
    else if (constants.DEFENDER.CONFIRM.COUNT > constants.DEFENDER.CONFIRM.INTERCEPT_COUNT) {
      output.debug('controller', 'confirmed ball', constants.DEFENDER.STATE);
      output.debug('controller', 'intercepting', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'pre_intercept';
    }
    else bot.motors.stop();
  },
  'pre_intercept': function () {
    constants.DEFENDER.INTERCEPT.TIMER = 0;
    bot.motors.reset();
    // console.log(bot.motors);
    bot.motors.ratioTo([1, 1], constants.DEFENDER.INTERCEPT.SPEED, constants.DEFENDER.INTERCEPT.DISTANCE);
    constants.DEFENDER.STATE = 'intercept';
  },
  'intercept': function () {
    var distance = bot.seeker.distance();
    var angle = bot.seeker.angle();

    if (distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      bot.motors.stop();
      output.warn('controller', 'lost ball during intercept', constants.DEFENDER.STATE);
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.position();
      constants.DEFENDER.STATE = 'start_retreat';
    }
    else if (bot.motors.position() >= constants.DEFENDER.INTERCEPT.DISTANCE - 300) {
      output.debug('controller', 'kicking ball', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'start_kick';
    }
  },
  'start_kick': function () {
    bot.kicker.runTo(constants.DEFENDER.KICK.POSITION, constants.DEFENDER.KICK.POWER);
    constants.DEFENDER.STATE = 'kick';
    bot.motors.ratio([1, 1], constants.DEFENDER.KICK.DRIVE_SPEED);

    if (distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      bot.motors.stop();
      output.warn('controller', 'lost ball during start of kick', constants.DEFENDER.STATE);
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.position();
      bot.kicker.runTo(-constants.DEFENDER.KICK.POSITION, constants.DEFENDER.KICK.RESET_SPEED);
      constants.DEFENDER.STATE = 'start_retreat';
    }
  },
  'kick': function () {
    if (!bot.kicker.state().contains('running') || bot.kicker.state().contains('overloaded')) {
      bot.kicker.runTo(-constants.DEFENDER.KICK.POSITION, constants.DEFENDER.KICK.RESET_SPEED);
      constants.DEFENDER.STATE = 'end_kick';
    }

    if (distance < constants.DEFENDER.TRACK.CLEAR_DISTANCE) {
      bot.motors.stop();
      output.warn('controller', 'lost ball during kick', constants.DEFENDER.STATE);
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.position();
      bot.kicker.runTo(-constants.DEFENDER.KICK.POSITION, constants.DEFENDER.KICK.RESET_SPEED);
      constants.DEFENDER.STATE = 'start_retreat';
    }
  },
  'end_kick': function () {
    if (!bot.kicker.state().contains('running') || bot.kicker.state().contains('stalled')) {
      bot.kicker.stop();
      constants.DEFENDER.RETREAT.MOTOR_ROTATIONS = bot.motors.position();
      // output.warn('controller', 'lost ball while kicking', constants.DEFENDER.STATE);
      output.debug('controller', 'retreating after kicking', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'start_retreat';
    }
  },
  'start_retreat': function () {
    console.log(-constants.DEFENDER.RETREAT.MOTOR_ROTATIONS);
    bot.motors.ratioTo([1, 1], constants.DEFENDER.INTERCEPT.SPEED, -constants.DEFENDER.RETREAT.MOTOR_ROTATIONS);
    constants.DEFENDER.STATE = 'retreat';
  },
  'retreat': function () {
    if (!bot.motors.state().contains('running')) {
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

    if (!bot.kicker.state().contains('running') || bot.kicker.state().contains('stalled')) {
      bot.kicker.stop();
    }

    if (constants.DEFENDER.COOLDOWN.TIMER == constants.DEFENDER.COOLDOWN.TRACK_TIME) {
      output.debug('controller', 'cooldown finished', constants.DEFENDER.STATE);
      constants.DEFENDER.STATE = 'track';
    }
  }
};
