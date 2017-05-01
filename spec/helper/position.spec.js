var detail = require('../services/color.js');

detail('bot position and rotation', 'behavior', __filename, function () {
  pending('need to be upgraded')
  var position = require('../../lib/helper/position.js');

  it('return absolute position', function () {
    expect(position.absoluteRotation(0)).toBe(0);
    expect(position.absoluteRotation(180)).toBe(180);
  })

  it('should set a relative \'north\' position', function () {
    position.setRelativeNorth(0);
    expect(position._relativeNorthDirection).toBe(0);

    position.setRelativeNorth(360);
    expect(position._relativeNorthDirection).toBe(360);
  })

  it('return relative position', function () {
    position.setRelativeNorth(0);
    expect(position.relativeRotation(0)).toBe(0);
    position.setRelativeNorth(180);
    expect(position.relativeRotation(180)).toBe(0);
    expect(position.relativeRotation(0)).toBe(180);
  })
})