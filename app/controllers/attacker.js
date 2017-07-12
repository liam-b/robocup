module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants) {
    behaviors.chase(bot.motors, constants, bot.seeker);
    if (bot.ColorSensor.value() < 40) {
      constants.attacker.STATE = 'shoot';
    }
  },
  'shoot': function (bot, behaviors, helpers, constants) {
    if (!constants.SHOOTING) {
      constants.SHOOTING = true;
      bot.motors.ratio([1, 1], constants.attacker.SHOOT_SPEED);
      setTimeout(behaviors.kick(bot.kicker), 500);
      setTimeout(function (){bot.motors.stop; constants.SHOOTING = false; constants.attacker.STATE = 'dribble'}, 1000);
    }
  }
};
