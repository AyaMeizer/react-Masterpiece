const app = require('./src/app');

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, function () {
  var port = server.address().port;
  console.log(`Express is working on http://localhost:${PORT}`);
});
