var fs = require('fs');

var EV_KEY = 0x01;
var buttonEventFile = '/dev/input/by-path/platform-gpio-keys.0-event';

var buttonNames = {
  103: 'up',
  108: 'down',
  105: 'left',
  106: 'right',
  28: 'enter',
  14: 'back'
}

var buttons = [
  'up',
  'down',
  'left',
  'right',
  'enter',
  'back'
]

// Keep track of the states of each button
// States are: 'pressed', 'released', and not currently 'neutral'
var buttonStates = {
  'up': 'released',
  'down': 'released',
  'left': 'released',
  'right': 'released',
  'enter': 'released',
  'back': 'released',
}

function eventsThing () {
  var eventStream = fs.createReadStream(buttonEventFile);
  eventStream.on('data', function (chunk) {
    var allEvents = parseInputEvents(chunk);
    var keyEvents = allEvents.filter(function (event) {
      return event.type == EV_KEY;
    });

    for (var keyEventIndex in keyEvents) {
      var keyEvent = keyEvents[keyEventIndex];
      if (keyEvent.code in buttonNames) {
        buttonStates[buttonNames[keyEvent.code]] = (keyEvent.value) ? 'released' : 'pressed';
      }
    }
  });
}

function parseInputEvents (eventChunk) {
  var events = [];
  for (var i = 0; i < eventChunk.length; i += 16) {
    events.push({
      time: {
        sec: eventChunk.readUInt32LE(i + 0),
        usec: eventChunk.readUInt32LE(i + 4)
      },
      type: eventChunk.readUInt16LE(i + 8),
      code: eventChunk.readUInt16LE(i + 10),
      value: eventChunk.readUInt32LE(i + 12)
    });
  }

  return events;
}

module.exports.checkState = function (button) {
    eventsThing();
    return buttonStates[button];
    return "invalid";
}

module.exports.buttonStates = buttonStates;
