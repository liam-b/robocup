module.exports = function (port, errorHandler) {
  this.path = '';
  this.port = port;
  this.type = '';
  this.name = '';

  if (file.portType(port) == 'output') {
    this.path = file.motorPath;
    this.type = 'motor';
  }
  else {
    this.path = file.sensorPath;
    this.type = 'sensor';
  }

  var devices = file.list(this.path);
  console.log(devices)

  for (var i = 0; i < devices.length; i += 1) {
    if (file.read(this.path + devices[i] + '/address').indexOf(this.port) != -1) {
      this.name = devices[i];
      this.path = this.path + devices[i] + '/';
      break;
    }
  }

  if (this.name == '' || this.path == '') {
    errorHandler({
      code: 'EIOPRT',
      stack: 'Error: EIOPRT, no response from port ' + this.port
    });
  }

  this.set = function (property, value) {
    try {
      file.write(this.path + property, value);
    } catch (err) {
      errorHandler(err);
    }
  };

  this.get = function (property) {
    try {
      return file.read(this.path + property).replace('\n','').replace('\r','');
    }
    catch (err) {
      errorHandler(err);
    }
  };
};
