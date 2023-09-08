var config = require('./config.js'),
    express = require('./express.js'),
    sockets = require('./sockets.js')


module.exports.start = function () {
    var app = express.init();
    app = sockets.createSocketServer(app)
    app.listen(process.env.PORT || config.port, '0.0.0.0', function () {
        console.log(`${new Date()} App listing on port ${process.env.PORT || config.port}`);
    });
};