module.exports = function () { STATE[constants.ATTACKER.STATE](); };

var timer = 0;

var STATE = {
  'dribble': function () {
    behaviors.chase(bot.motors, constants, bot.seeker);
    console.log(helpers.position.relativeRotation(bot.compass.value()));
    if (bot.seeker.value().distance > constants.KICK_RANGE && constants.KICK_ANGLE.indexOf(bot.seeker.value().angle) != -1 &&
    (helpers.position.relativeRotation(bot.compass.value()) > 315 || helpers.position.relativeRotation(bot.compass.value()) < 45)) {
      timer = 0;
      constants.ATTACKER.STATE = 'shoot';
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
