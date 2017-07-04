var request = require('request');

// http://localhost:3000/
// https://liam-server-3000.herokuapp.com/

var values = {
  status: process.argv[2],
  build: process.argv[3],
  commit: process.argv[4].substr(0, 7),
  message: process.argv[5],
  time: process.argv[6]
};

var todoist = {
  failed: {
    content: 'Robocup build ' + values.build + ' [' + values.commit + '] failed',
    priority: 3,
    labels: [2148074807]
  }
};

var trello = {
  failed: {
    id: values.build,
    commit: values.commit,
    status: 'failing',
    message: values.message
  },
  passed: {
    id: values.build,
    commit: values.commit,
    status: 'passing',
    message: values.message
  },
  pending: {
    id: values.build,
    commit: values.commit,
    status: 'pending',
    message: values.message
  }
};

var availableServices = {
  after: [
    {service: 'trello', data: (values.status == 'success') ? trello.passed : trello.failed},
    {service: 'todoist', data: (values.status == 'success') ? null : todoist.failed}
  ],
  before: [
    {service: 'trello', data: trello.pending},
  ]
};

var services = (values.time == 'before') ? availableServices.before : availableServices.after;

for (var i = 0; i < services.length; i += 1) {
  if (services[i].data != null) {
    request.post({
      url: 'https://liam-server-3000.herokuapp.com/' + services[i].service,
      form: {
        data: JSON.stringify(services[i].data)
      }
    }, function (error, response, body) {
      console.log(body);
    });
  }
}