var ev3dev = require('ev3dev-lang');

module.exports = function () {
  this.left = {
    green: new ev3dev.LED ('ev3:left:green:ev3dev'),
    red: new ev3dev.LED ('ev3:left:red:ev3dev')
  }
  this.right = {
    green: new ev3dev.LED ('ev3:right:green:ev3dev'),
    red: new ev3dev.LED ('ev3:right:red:ev3dev')
  }

  this.off = function () {
    this.left.green.off();
    this.left.red.off();

    this.right.green.off();
    this.right.red.off();
  }

  this.green = function () {
    this.left.green.on();
    this.left.red.off();

    this.right.green.on();
    this.right.red.off();
  }

  this.orange = function () {
    this.left.green.on();
    this.left.red.on();

    this.right.green.on();
    this.right.red.on();
  }

  this.red = function () {
    this.left.green.off();
    this.left.red.on();

    this.right.green.off();
    this.right.red.on();
  }

  this.off();
}