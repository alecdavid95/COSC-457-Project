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

//----------------------------------------------------------------------------------
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
    // ACTS
    router.get('/acts', function (req, res) {
        var request = new Request('SELECT * FROM [Acts];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // COSTS
    router.get('/costs/:show_id', function (req, res) {
        var showID = req.params['show_id'];
        var request = new Request('SELECT * FROM [Costs] WHERE Show_ID = ' + showID +  ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // EMPLOYEE
    router.get('/employees', function (req, res) {
        var request = new Request('SELECT * FROM [Employee];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // EQUIPMENT
    router.get('/equipment/:venue_id', function (req, res) {
        var venueID = req.params['venue_id'];
        var request = new Request('SELECT * FROM [Equipment] WHERE Ven_ID = ' + venueID + ' ;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // HOUSING
    router.get('/housing/:venue_id', function (req, res) {
        var venueID = req.params['venue_id'];
        var request = new Request('SELECT * FROM [Acts] WHERE Ven_ID = ' + venueID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // PROMOTER
    router.get('/promoters', function (req, res) {
        var request = new Request('SELECT * FROM [Promoter];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // SHOWS
    router.get('/shows', function (req, res) {
        var request = new Request('SELECT * FROM [Shows];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // TICKETS
    router.get('/tickets', function (req, res) {
        var request = new Request('SELECT * FROM [Tickets];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // TOURS
    router.get('/tours', function (req, res) {
        var request = new Request('SELECT * FROM [Tours];',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    // VENUE
    router.get('/venues', function (req, res) {
        var request = new Request('SELECT * FROM [Venue];',
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
