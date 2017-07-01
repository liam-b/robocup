var request = require('request');

// http://localhost:3000/todoist/add

request.post('https://fathomless-mesa-60224.herokuapp.com/todoist/add', {form: {
  text: 'Robocup build failed',
  priority: 4,
  label: 2148074807
}}, function (error, response, body) {
  console.log(body);
});