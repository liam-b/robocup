module.exports = function (data) {
  var output = {
    ball: _drawBall(_ballPosition(data.direction, data.distance), {
      x: 10,
      y: 10
    })
  }
  return output;
}

function _drawBall (position, size) {
  var output = '';
  for (var y = size.y; y > 0; y -= 1) {
    for (var x = size.x; x > 0; x -= 1) {
      if ((x - Math.floor(size.x / 2)) == 0 && (y - Math.floor(size.y / 2)) == 0) output += 'o';
      else if ((x - Math.floor(size.x / 2)) == position[0] && (y - Math.floor(size.y / 2)) == position[1]) output += 'x';
      else output += ' ';
      output += ' ';
    }
    output += '\n';
  }
  return output;
}

function _ballPosition (direction, distance) {
  switch (direction) {
    case 9:
      return _multiply([3, 0], distance);
    case 8:
      return _multiply([3, 1], distance);
    case 7:
      return _multiply([2, 2], distance);
    case 6:
      return _multiply([1, 2], distance);
    case 5:
      return _multiply([0, 2], distance); // mid
    case 4:
      return _multiply([-1, 2], distance);
    case 3:
      return _multiply([-2, 2], distance);
    case 2:
      return _multiply([-3, 1], distance);
    case 1:
      return _multiply([-3, 0], distance);
    case 0:
      return [0, 0];
  }
}

function _multiply (array, scalar) {
  for (var i = 0; i < array.length; i += 1) {
    array[i] *= 50 - Math.floor(scalar / 5);
  }
  return array;
}