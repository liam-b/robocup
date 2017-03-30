exports.bdescribe = function (name, func) {
  describe(name + '\x1b[34m' + ' behavior' + '\x1b[0m', func)
}

exports.hdescribe = function (name, func) {
  describe(name + '\x1b[34m' + ' helper' + '\x1b[0m', func)
}