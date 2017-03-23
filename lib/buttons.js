var fs = require('fs');

var EV_KEY = 0x01
var buttonEventFile = 'dev/input/by-path/platform-gpio-keys.0-event';

// Button values for EV3, same as standard keyboard
var buttonNames = {
  103: 'up',
  108: 'down',
  105: 'left',
  106: 'right',
  28: 'enter',
  14: 'back'
}

var eventStream = fs.createReadStream(buttonEventFile);
eventStream.on('data', function (chunk) {
  var allEvents = parseInputEvents(chunk);

  // Filter events to get only key eventStream
  var keyEvents = allEvents.filter(function (event) {
    return event.type == EV_KEY;
  });

  // Process the key events that correspond to known key codes
  for (var keyEventIndex in keyEvents) {
    var keyEvent = keyEvents[keyEventIndex];
    if (keyEvent.code in buttonNames) {
      // This will run everytime one of the six buttons is pressed or released.
      // keyEvent.value contains a number indicating whether a button was pressed or released.
      console.log("Button " + buttonNames[keyEvent.code] + " is " + (keyEvent.value ? 'released' : 'pressed'));
    }
  }
});

function parseInputEvents (eventChunk) {
  // Parse all events received in this chunk
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

  return events
}
