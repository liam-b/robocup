var request = require('request');

request.post('https://fathomless-mesa-60224.herokuapp.com/todoist/add', {form: {
  text: 'Robocup build failed',
  priority: 1
}}, function (error, response, body) {
  console.log(body);
});