module.exports = function () { STATE[constants.ATTACKER.STATE](); };

var timer = 0;

var STATE = {
  'dribble': function () {
    var distance = bot.seeker.distance();
    var angle = bot.seeker.angle();

    if (bot.motors.state().contains('stalled')) {
      constants.ATTACKER.STATE = 'stalled';
      constants.ATTACKER.STALL.TIMER = 20;
    }

    if (distance > constants.ATTACKER.DRIBBLE.DRIVE_FORWARD_DISTANCE && angle == 6) {
      // bot.motors.ratio([1, 1], constants.CHASE_SPEED);
      bot.motors.ratio([1, 0.9], constants.CHASE_SPEED);
      console.log('drive straight!');
    }
    else {
      behaviors.chase();
    }
    // console.log(helpers.position.relativeRotation(bot.compass.value()));
    // if (bot.seeker.value().distance > constants.KICK_RANGE && constants.KICK_ANGLE.indexOf(bot.seeker.value().angle) != -1 && (helpers.position.relativeRotation(bot.compass.value()) > 315 || helpers.position.relativeRotation(bot.compass.value()) < 45)) {
    //   timer = 0;
    //   constants.ATTACKER.STATE = 'shoot';
    // }
  },
  'stalled': function () {
    if (constants.ATTACKER.STALL.TIMER > 0) {
      bot.motors.ratio([-1, -1], constants.CHASE_SPEED);
      constants.ATTACKER.STALL.TIMER -= 1;
      console.log(constants.ATTACKER.STALL.TIMER)
    } else {
    // else if (!bot.motors.state().contains('stalled')) {
      constants.ATTACKER.STATE = 'stalled';
    }
  },
  'shoot': function () {
    // output.info('attack', 'shooting'); // Somehow this was working...
    bot.motors.ratio([1, 1], constants.ATTACKER.SHOOT_SPEED);
    if (timer >= 10) {
      behaviors.kick(bot.kicker);
      constants.ATTACKER.STATE = 'dribble';
    } else {
      timer += 1;
    }
  }
};
