var detail = require('./services/color.js');

detail('dummy fail thing', 'fail', __filename, function () {
  it('will fail', function () {
    expect(true).toBe(false);
  });
});