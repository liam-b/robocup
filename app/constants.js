module.exports = {
  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 500,
  TRACK_SPEED: 500,
  KICK_RANGE: 30,

  INTERCEPT: {
    RETURN_SPEED: 500,
    CLEAR_DISTANCE: 19
  },
  ATTACKER: {
    STATE: 'dribble'
  },
  DEFENDER: {
    STATE: 'initial',
    RETURN_SPEED: 300,
    MOTOR_ROTATIONS: 0
   }
};
