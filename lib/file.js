module.exports.sensorPath = '/sys/class/lego-sensor/';
module.exports.motorPath = '/sys/class/tacho-motor/';

module.exports.port = {
  OUT_A: 'outA',
  OUT_B: 'outB',
  OUT_C: 'outC',
  OUT_D: 'outD',

  IN_1: 'in1',
  IN_2: 'in2',
  IN_3: 'in3',
  IN_4: 'in4'
};

module.exports.portType = function (port) {
  return (port.charAt(0) == 'o') ? 'output' : 'input';
};

module.exports.write = function (path, data) {
  fs.writeFileSync(path, data);
};

module.exports.read = function (path) {
  return fs.readFileSync(path, 'utf8');
};

module.exports.list = function (path) {
  return fs.readdirSync(path);
};