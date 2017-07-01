var request = require('request');

// http://localhost:3000/
// https://liam-server-3000.herokuapp.com/

var todoist = {
  failed: {
    content: 'Robocup build ' + process.argv[2] + ' failed',
    priority: 4,
    labels: [2148074807]
  }
};

var notification = {
  failed: {
    title: 'Travis CI build failed',
    message: 'Robocup build failed'
  }
};

// request.post({
//   url: 'https://liam-server-3000.herokuapp.com/notification',
//   form: {
//     data: JSON.stringify(notification.failed)
//   }
// }, function (error, response, body) {
//   console.log(body);
// });

request.post({
  url: 'https://liam-server-3000.herokuapp.com/todoist',
  form: {
    data: JSON.stringify(todoist.failed)
  }
}, function (error, response, body) {
  console.log(body);
});