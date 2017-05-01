// requires
var express = require('express');
var bodyParser = require('body-parser');

// set up express
var app = express();

// create tedious connection objects
var ConnectionPool = require('tedious-connection-pool');
var poolConfig = {
    min: 10,
    max: 50
};
var connectionConfig = {
    server: 'cosc457.database.windows.net',
    userName: 'cosc457',
    password: 'Group3pass!',
    options: {
        encrypt: true,
        database: 'cosc457',
        rowCollectionOnDone: true,
        rowCollectionOnRequestCompletion: true
    }
};

var pool = new ConnectionPool(poolConfig, connectionConfig);

// make connection to database
pool.on('error', function (err) {
    console.log(err);
});

// Middleware
//----------------------------------------------------------------------------------
// configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set header to allow connection by given url
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//----------------------------------------------------------------------------------
// API Routes
//----------------------------------------------------------------------------------
var router = express.Router();
app.use('/api', router);
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


pool.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }

    // default connection to api
    router.get('/', function (req, res) {
        res.json({message: 'welcome to big red booking api'});
    });

    router.get('/test', function (req, res) {
        var request = new Request('SELECT * FROM [TestTable];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });
});


app.listen(process.env.PORT || 1337);
console.log('Server has started on port 1337');
