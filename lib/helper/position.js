module.exports._relativeNorthDirection = 0;

module.exports.setRelativeNorth = function (direction) {
  module.exports._relativeNorthDirection = direction;
}

module.exports.relativeRotation = function (direction) {
  return ((((direction - module.exports._relativeNorthDirection) % 360) + 360) % 360);
}

module.exports.absoluteRotation = function (direction) {
  return direction;
}