var color = require('../services/color.js');
var bdescribe = color.bdescribe;
var hdescribe = color.hdescribe;

hdescribe('bot position and rotation', function () {
  var position = require('../../lib/helper/position.js');
  console.log(global)

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
  })
})