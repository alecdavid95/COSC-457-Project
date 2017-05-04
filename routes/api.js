const express = require('express');
const router = express.Router();
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

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

router.get('/dummy', (req, res) => {
  let query_result = { rows :[
    ['Sean', 'Male', 'Towson'],
    ['Kevin', 'Male', 'Towson'],
    ['Max', 'Male', 'Towson']
  ],
  columnHeaders: ['name', 'gender','company']};
  res.status(200).json(query_result);
});

//----------------------------------------------------------------------------------
// API Routes
//----------------------------------------------------------------------------------



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

module.exports = router;