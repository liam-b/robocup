module.exports = function () { STATE[constants.ATTACKER.STATE](); };

var timer = 0;

var STATE = {
  'dribble': function () {
    var distance = bot.seeker.distance();
    var angle = bot.seeker.angle();
    bot.motors.ratio([1, 0.9], constants.CHASE_SPEED);
    if bot.motors.state().contains('stalled') {
      constants.ATTACKER.STATE = 'stalled';
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
  'stalled': function () {},
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
