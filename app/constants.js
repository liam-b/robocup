module.exports = {
  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 550,
  TRACK_SPEED: 500,
  KICK_RANGE: 30,

  INTERCEPT: {
    RETURN_SPEED: 300,
    CLEAR_DISTANCE: 30,
    TIMER: 0,
    PAST_TIME: 30,
    CLEAR_TIMER: 0,
    CLEAR_WAIT: 4
  },
  ATTACKER: {
    STATE: 'dribble',
    SHOOT_SPEED: 850,
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
    GREEN_PCT: 45, // Never used; value from school
    BLACK_PCT: 3
  }
};
