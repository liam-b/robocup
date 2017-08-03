module.exports = {
  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 700,
  KICK_RANGE: 30,
  KICK_ANGLE: [4,5,6], //This is in seeker units

  ATTACKER: {
    STATE: 'dribble',
    SHOOT_SPEED: 850,
    SHOOTING: false
  },
  DEFENDER: {
    STATE: 'initial',
    TRACK: {
      SPEED: 500,
      CLEAR_DISTANCE: 27
    },

    CONFIRM: {
      COUNT: 2,
      INTERCEPT_COUNT: 3
    },

    INTERCEPT: {
      SPEED: 400,
<<<<<<< HEAD
      KICK_ROTATIONS: 1000
=======
      KICK_ROTATIONS: 50
>>>>>>> b327654f525d570ca8196c8028cd5c03ab3ef99f
    },

    KICK: {
      POWER: 800,
      RESET_SPEED: 100,
      KICK_TIME: 1,
      RESET_TIME: 2,
      RETREAT_TIME: 3,
      TIMER: 0
    },

    RETREAT: {
      SPEED: 400,
      MOTOR_ROTATIONS: 0
    },

    COOLDOWN: {
      TIMER: 0,
      TRACK_TIME: 2
    }
  },
  FIELD: {
    // Both of these are max values
    GREEN_PCT: 45, // Never used; value from school
    BLACK_PCT: 3
  }
};
