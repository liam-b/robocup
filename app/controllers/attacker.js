module.exports = function () { STATE[constants.ATTACKER.STATE](); };

var timer = 0;

var STATE = {
  'dribble': function () {
    var distance = bot.seeker.distance();
    var angle = bot.seeker.angle();

    console.log(constants.ATTACKER.OVERLOAD.COUNTER);

    if (bot.motors.state().contains('overloaded')) {
      if (constants.ATTACKER.OVERLOAD.COUNTER == constants.ATTACKER.OVERLOAD.COUNTER_MAX) {
        constants.ATTACKER.STATE = 'overloaded';
        constants.ATTACKER.OVERLOAD.TIMER = 3; // 5 is about half a field width, iirc
      }
      else constants.ATTACKER.OVERLOAD.COUNTER += 1;
    }
    else {
      constants.ATTACKER.OVERLOAD.COUNTER = 0;
    }

    if (distance > constants.ATTACKER.DRIBBLE.DRIVE_FORWARD_DISTANCE && angle == 6) {
      // bot.motors.ratio([1, 1], constants.CHASE_SPEED);
      bot.motors.ratio([1, 0.9], constants.CHASE_SPEED);
      console.log('drive straight (slightly right)!');
    }
    else if (distance > constants.ATTACKER.DRIBBLE.DRIVE_FORWARD_DISTANCE && angle == 4){
      bot.motors.ratio([0.9, 1], constants.CHASE_SPEED);
      console.log('drive straight (slightly left)!');
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
  'overloaded': function () {
    if (constants.ATTACKER.OVERLOAD.TIMER > 0) {
      bot.motors.ratio([-1, -1], constants.ATTACKER.OVERLOAD.SPEED);
      constants.ATTACKER.OVERLOAD.TIMER -= 1;
      console.log(constants.ATTACKER.OVERLOAD.TIMER);
    } else {
      constants.ATTACKER.OVERLOAD.COUNTER = 0;
      constants.ATTACKER.STATE = 'dribble';
    }
  },
  'shoot': function () {
    // output.info('attack', 'shooting'); // Somehow this was working...
    bot.motors.ratio([1, 1], constants.ATTACKER.SHOOT_SPEED);
    if (timer >= 10) {
      behaviors.kick(bot.kicker);
      constants.ATTACKER.OVERLOAD.COUNTER = 0;
      constants.ATTACKER.STATE = 'dribble';
    } else {
      timer += 1;
    }
  }
};
