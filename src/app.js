const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = require('express')();
const logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

require("fs").readdirSync(require("path").join(__dirname, "rest")).forEach(function (file) {
    if (file.indexOf(".js") > 1) {
        app.use(require("./rest/" + file));
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {
    //erreur de validation.
    if (err.mapped){
        console.error(err.stack,"\nResponse: ",err.mapped());
        res.status(422).json(err.mapped());
    }else {
        console.error(err);
        res.status(err.status || 500).json({error:err.message});
    }
});

module.exports = app;
