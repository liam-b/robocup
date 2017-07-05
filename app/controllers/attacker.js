module.exports.default = function (bot, behaviors, helpers, constants) { STATE[constants.ATTACKER.STATE](bot, behaviors, helpers, constants); };

var STATE = {
  'dribble': function (bot, behaviors, helpers, constants) {
    console.log("chase?")
    behaviors.chase(bot.motors, constants, bot.seeker)
  }
}
