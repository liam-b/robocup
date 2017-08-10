module.exports = {
  COMPETITION: false,
  SURPRESS_TRACE: true,

  PRESETS: [],

  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 700,
  KICK_RANGE: 30,
  KICK_ANGLE: [4, 5, 6], // This is in seeker units

  ATTACKER: {
    STATE: 'dribble',
    SHOOT_SPEED: 850,
    SHOOTING: false
  },

  DEFENDER: {
    STATE: 'initial',
    TRACK: {
      SPEED: 500,
      CLEAR_DISTANCE: 22,
      TRACK_DISTANCE: 5
    },

    CONFIRM: {
      DO: true,
      COUNT: 0,
      INTERCEPT_COUNT: 0
    },

    INTERCEPT: {
      SPEED: 400,
      DISTANCE: 700
    },

    KICK: {
      POWER: 800,
      POSITION: 50,
      RESET_SPEED: 100,
      DRIVE_SPEED: 300
    },

    RETREAT: {
      MOTOR_ROTATIONS: 0,
      STOP_FUDGE: 50
    },

    COOLDOWN: {
      DO: true,
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
