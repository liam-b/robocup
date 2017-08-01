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
      CLEAR_DISTANCE: 30
    },

    CONFIRM: {
      COUNT: 2,
      INTERCEPT_COUNT: 2
    },

    INTERCEPT: {
      SPEED: 400,
      TIMER: 0,
      KICK_TIME: 5
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
      SPEED: 400
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
