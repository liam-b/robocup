module.exports = {
  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 700,
  KICK_RANGE: 30,

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
      COUNT: 3,
      INTERCEPT_COUNT: 2
    },

    INTERCEPT: {
      SPEED: 400,
      TIMER: 0,
      KICK_TIME: 5
    },

    KICK: {
      POWER: 800,
      RESET_SPEED: 200,
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
