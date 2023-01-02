const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');
const server = require('http').createServer(app);

const connect = (url) => {
    return mongoose.connect(url, config.db.options); // connect to mongo db
};
server.listen(
    config.port,
    () => console.log('server running on port:' + config.port) // log server running on port
);
// app.listen(config.port);
connect(config.db.prod); // connect to mongo db
mongoose.connection.on('error', console.log);

module.exports = server;
