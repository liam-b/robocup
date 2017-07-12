module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants) {
    behaviors.chase(bot.motors, constants, bot.seeker);
    if (bot.ColorSensor.value() < constants.) {
      constants.ATTACKER.STATE = 'shoot';
    }
  },
  'shoot': function (bot, behaviors, helpers, constants) {
    if (!constants.ATTACKER.SHOOTING) {
      constants.ATTACKER.SHOOTING = true;
      bot.motors.ratio([1, 1], constants.ATTACKER.SHOOT_SPEED);
      setTimeout(behaviors.kick(bot.kicker), 500);
      setTimeout(function (){bot.motors.stop; constants.ATTACKER.SHOOTING = false; constants.ATTACKER.STATE = 'dribble'}, 1000);
    }
  }
};
