module.exports._relativeNorthDirection = 0;

module.exports.setRelativeNorth = function (direction) {
  module.exports._relativeNorthDirection = direction;
}

module.exports.relativeRotation = function (direction) {
  return module.exports._relativeNorthDirection - direction;
}

module.exports.absoluteRotation = function (direction) {
  return direction;
}

if (direction > module.exports._relativeNorthDirection) {
    if (direction > module.exports._relativeNorthDirection) return direction - module.exports._relativeNorthDirection;
    else if (direction < module.exports._relativeNorthDirection) return 360 - direction;
    return forward;