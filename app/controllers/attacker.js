module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants); };

var timer = 0;

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants) {
    behaviors.chase(bot.motors, constants, bot.seeker);
    console.log(helpers.position.relativeRotation());
    if ((helpers.position.relativeRotation() > 315 || helpers.position.relativeRotation() < 45)) { //bot.seeker.value().distance < constants.KICK_RANGE &&
      timer = 0;
      constants.ATTACKER.STATE = 'shoot';
      console.log("shooting");
    }
  },
  'shoot': function (bot, behaviors, helpers, constants) {
    output.info('attack', 'shooting');
    bot.motors.ratio([1, 1], constants.ATTACKER.SHOOT_SPEED);
    behaviors.kick(bot.kicker);
    if (timer >= 10) {
      constants.ATTACKER.STATE = 'dribble';
    } else {
      timer += 1;
    }
  }
};
