module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants); };

var timer = 0

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants) {
    // bot.motors.ratio([1,1],250);
    behaviors.chase(bot.motors, constants, bot.seeker);
    if (bot.seeker.value().distance < constants.KICK_RANGE && (helpers.position.relativeRotation() > 315 || helpers.position.relativeRotation() < 45)) {
      timer = 0
      constants.ATTACKER.STATE = 'shoot';
    }
  },
  'shoot': function (bot, behaviors, helpers, constants) {
    // if (!constants.ATTACKER.SHOOTING) {
    //   constants.ATTACKER.SHOOTING = true;
    output.info('attack', 'shooting');
    bot.motors.ratio([1, 1], constants.ATTACKER.SHOOT_SPEED);
    behaviors.kick(bot.kicker);
      // setTimeout(function (){
        // bot.motors.stop();
        // constants.ATTACKER.SHOOTING = false;
    if (timer >= 10) {
      constants.ATTACKER.STATE = 'dribble';
    } else {
      timer += 1;
    }
  }
}
