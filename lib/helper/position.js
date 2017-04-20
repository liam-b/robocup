module.exports._relativeNorthDirection = 0;

module.exports.setRelativeNorth = function (direction) {
  module.exports._relativeNorthDirection = direction;
}

module.exports.relativeRotation = function (direction) {
<<<<<<< HEAD
  return ((((direction - module.exports._relativeNorthDirection) % 360) + 360) % 360);
=======
  if (direction > module.exports._relativeNorthDirection) {
      if (direction > module.exports._relativeNorthDirection) return direction - module.exports._relativeNorthDirection;
      else if (direction < module.exports._relativeNorthDirection) return 360 - direction;
      return direction;
  // return module.exports._relativeNorthDirection - direction;
>>>>>>> 3699e95a9c5f75e2644c928d3bd51251c5a26312
}

module.exports.absoluteRotation = function (direction) {
  return direction;
<<<<<<< HEAD
}
=======
}
>>>>>>> 3699e95a9c5f75e2644c928d3bd51251c5a26312
