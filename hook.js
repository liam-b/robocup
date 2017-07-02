var request = require('request');

var values = {
  message: process.argv[2],
  id: process.argv[3]
};

var commit = {
  message: values.message,
  link: 'https://github.com/liam-b/robocup/commit/' + values.message,
  id: values.id.substr(0, 2)
};

request.post({
  url: 'https://liam-server-3000.herokuapp.com/commit-trello',
  form: {
    data: JSON.stringify(commit)
  }
}, function (error, response, body) {
  console.log(body);
});

//