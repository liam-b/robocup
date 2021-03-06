var detail = require('../services/color.js');

detail('bot position and rotation', 'helper', __filename, function () {
  var position = require('../../app/helpers/position.js');

  it('return absolute position', function () {
    expect(position.absoluteRotation(0)).toBe(0);
    expect(position.absoluteRotation(180)).toBe(180);
  })

  it('should set a relative \'north\' position', function () {
    position.setRelativeNorth(0);
    expect(position._relativeNorthDirection).toBe(0);

    position.setRelativeNorth(86);
    expect(position._relativeNorthDirection).toBe(86);

    position.setRelativeNorth(360);
    expect(position._relativeNorthDirection).toBe(360);
  })

  it('return relative position', function () {
    position.setRelativeNorth(0);
    expect(position.relativeRotation(0)).toBe(0);
    position.setRelativeNorth(180);
    expect(position.relativeRotation(180)).toBe(0);
    expect(position.relativeRotation(0)).toBe(180);
    position.setRelativeNorth(124);
    expect(position.relativeRotation(0)).toBe(236);
    expect(position.relativeRotation(180)).toBe(56);
  })
})
