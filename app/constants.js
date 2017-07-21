module.exports = {
  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 300,
  TRACK_SPEED: 500,
  KICK_RANGE: 30,

  INTERCEPT: {
    RETURN_SPEED: 300,
    CLEAR_DISTANCE: 23,
    TIMER: 0
  },
  ATTACKER: {
    STATE: 'dribble',
    SHOOT_SPEED: 650,
    SHOOTING: false
  },
  DEFENDER: {
    STATE: 'initial',
    RETURN_SPEED: 300,
    MOTOR_ROTATIONS: 0,
    RETURN_WAIT: 10,
    RETURN_WAIT_TIMER: 0,
    INTERCEPT_DELAY_WAIT: 10,
    INTERCEPT_DELAY_TIMER: 0
  },
  FIELD: {
    // Both of these are max values
    GREEN_PCT: 45,
    BLACK_PCT: 15
  }
};
