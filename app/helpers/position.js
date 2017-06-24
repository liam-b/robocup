module.exports.init = function (output) {
  global.output = output
  module.exports._relativeNorthDirection = 0;
}

module.exports.setRelativeNorth = function (direction) {
  module.exports._relativeNorthDirection = direction;
  // global.output.log('set', 'relative north set to ' + module.exports._relativeNorthDirection);
}

module.exports.relativeRotation = function (direction) {
  return ((((direction - module.exports._relativeNorthDirection) % 360) + 360) % 360);
  if (direction > module.exports._relativeNorthDirection) {
    if (direction > module.exports._relativeNorthDirection) return direction - module.exports._relativeNorthDirection;
    else if (direction < module.exports._relativeNorthDirection) return 360 - direction;
    return direction;
  }
  // return module.exports._relativeNorthDirection - direction;
}

module.exports.absoluteRotation = function (direction) {
  return direction;
}
