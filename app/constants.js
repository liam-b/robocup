module.exports = {
  COMPETITION: false,
  SURPRESS_TRACE: true,

  PRESETS: [],

  ROLE: 'undecided',
  BOT_STATE: 'initial',
  PAUSED: false,

  CHASE_SPEED: 700,
  CHASE_LOST_TIMER:0,
  KICK_RANGE: 30,
  KICK_ANGLE: [4, 5, 6], // This is in seeker units

  ATTACKER: {
    STATE: 'dribble',
    SHOOT_SPEED: 850,
    SHOOTING: false,

    OVERLOAD: {
      TIMER: 0,
      SPEED: 600,
      COUNTER: 0,
      WAS_LAST_LOOP: false,
      COUNTER_MAX: 10
    },

    DRIBBLE: {
      DRIVE_FORWARD_DISTANCE: 35
    }
  },

  DEFENDER: {
    STATE: 'initial',
    TRACK: {
      SPEED: 600,
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
