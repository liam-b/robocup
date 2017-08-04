for (var arg = 2; arg < process.argv.length; arg += 1) {
  if (process.argv[arg] == '-p' || process.argv[arg] == '--preset' || process.argv[arg] == '--presets') {
    var preset = arg + 1;
    while (preset < process.argv.length && process.argv[preset].charAt(0) != '-') {
      require('./presets/' + process.argv[preset] + '.js');
      constants.PRESETS.push(process.argv[preset]);
      preset += 1;
    }
  }
}