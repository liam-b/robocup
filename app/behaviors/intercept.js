var rotations = 0;

var startedIntercepting = false;
var kicked = false;

module.exports.chase = function (motors, behaviors, constants, seeker) {
  if (!startedIntercepting) {
    startedIntercepting = true;
    motors.reset();
  }

  if (seeker.distance > constants.KICK_RANGE) {
    behaviors.kick(motors);
    kicked = true;
    rotations = motors.averagePosition();
    motors.reset();
  }
  else if (!kicked) {
    behaviors.chase(motors, seeker, constants.CHASE_SPEED);
  }
  if (kicked) {
    motors.ratio([-1, -1], constants.INTERCEPT.RETURN_SPEED);
    if (rotations - motors.averagePosition() <= 10) {
      motors.stop();
      module.exports.reset();
    }
  }
};

module.exports.reset = function () {
  startedIntercepting = false;
  kicked = false;
};
