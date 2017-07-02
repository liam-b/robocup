var request = require('request');

console.log('2', process.argv[2]);
console.log('3', process.argv[3]);

var values = {
  message: process.argv[2],
  id: process.argv[3]
};

// console.log(process.argv[2]);

var commit = {
  message: values.message,
  link: 'https://github.com/liam-b/robocup/commit/' + values.id,
  id: values.message.substr(0, 2)
};

console.log('c', commit);

request.post({
  url: 'https://liam-server-3000.herokuapp.com/commit-trello',
  form: {
    data: JSON.stringify(commit)
  }
}, function (error, response, body) {
  console.log(body);
});

//