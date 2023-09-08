var express = require('express'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    usersRouter = require('../routes/users.routes'),
    creatorRouter = require('../routes/creator.routes'),
    authorizer = require('../middleware/authorizer'),
    powerRouter = require('../routes/power.routes'),
    triviaRouter = require('../routes/trivia.routes'),
    objectivesRouter = require('../routes/objectives.routes')

module.exports.init = function () {

    var app = express();

    app.use(bodyParser.json());
    app.use(cors());

    // routes
    app.use('/users', usersRouter);
    app.use('/creator', creatorRouter);
    app.use('/power', authorizer.authorize, powerRouter);
    app.use('/trivia',  authorizer.authorize, triviaRouter)
    app.use('/objectives',  authorizer.authorize, objectivesRouter)

    return app;
}

