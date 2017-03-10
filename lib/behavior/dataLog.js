module.exports = function (data) {
  var output = {
    direction: _direction(data.direction)
  }
  return output;
}

function _direction (direction) {
  switch (direction) {
    case 9:
      return '         \n         \nx   o    ';
    case 8:
      return '         \n x       \n    o    ';
    case 7:
      return '  x      \n         \n    o    ';
    case 6:
      return '   x     \n         \n    o    ';
    case 5:
      return '    x    \n         \n    o    ';
    case 4:
      return '    x    \n         \n    o    ';
    case 3:
      return '     x   \n         \n    o    ';
    case 2:
      return '      x  \n         \n    o    ';
    case 1:
      return '         \n       x \n    o    ';
    case 0:
      return '         \n         \n    o    ';
  }
}