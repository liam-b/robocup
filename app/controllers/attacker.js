module.exports = function (bot, behaviors, helpers, constants) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants) {
    bot.motors.ratio([1,1],250);
    // behaviors.chase(bot.motors, constants, bot.seeker);
    // console.log('chase?')
    // if (bot.colorSensor.value() <= constants.FIELD.BLACK_PCT && (helpers.position.relativeRotation() > 315 || helpers.position.relativeRotation() < 45)) {
    //   constants.ATTACKER.STATE = 'shoot';
    // }
    // console.log('chase')
  },
  'shoot': function (bot, behaviors, helpers, constants) {
    if (!constants.ATTACKER.SHOOTING) {
      constants.ATTACKER.SHOOTING = true;
      bot.motors.ratio([1, 1], constants.ATTACKER.SHOOT_SPEED);
      setTimeout(behaviors.kick(bot.kicker), 250);
      setTimeout(function (){
        bot.motors.stop();
        constants.ATTACKER.SHOOTING = false;
        constants.ATTACKER.STATE = 'dribble';
      }, 500);
    }
  }
};
 ]
