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