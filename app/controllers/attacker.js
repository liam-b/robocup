module.exports.default = function (bot, behaviors, helpers, constants, output) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants, output); };

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants, output) {
    behaviors.chase(bot.motors, constants, bot.seeker, output)
  }
}
