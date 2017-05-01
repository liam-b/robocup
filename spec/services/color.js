module.exports = function (name, type, directory, func) {
  describe(name + '\x1b[34m ' + type + '\x1b[0m \x1b[30m' + directory + '\x1b[0m', func)
}