module.exports = function (name, type, func) {
  describe(name + '\x1b[34m ' + type + '\x1b[0m \x1b[30m' + __filename + '\x1b[0m', func)
}