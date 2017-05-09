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
        res.json({message: 'Welcome to Big Red booking api'});
    });

    // ACTS
    router.get('/acts', function (req, res) {
        var request = new Request('SELECT * FROM Acts;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/act/:act_id', function (req, res) {
        var actID = req.params['act_id'];
        var request = new Request('SELECT * FROM Acts WHERE Act_ID = ' + actID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });
    router.post('/act', function (req, res) {
        var request = new Request('INSERT INTO Acts (Name, Email, Genre, City, State)' +
            ' VALUES (@Name, @Email, @Genre, @City, @State);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Act Added'})
                }
            });

        request.addParameter('Name', TYPES.VarChar, req.body['Name']);
        request.addParameter('Email', TYPES.VarChar, req.body['Email']);
        request.addParameter('Genre', TYPES.VarChar, req.body['Genre']);
        request.addParameter('City', TYPES.VarChar, req.body['City']);
        request.addParameter('State', TYPES.VarChar, req.body['State']);

        connection.execSql(request);
    });

    router.put('/act', function (req, res) {
        var request = new Request('UPDATE Acts SET Name = @Name, Email = @Email, Genre = @Genre,' +
            'City = @City, State = @State WHERE Act_ID = @Act_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({message: 'Act Updated'})
                }
            });
        request.addParameter('Act_ID', TYPES.Int, req.body['Act_ID']);
        request.addParameter('Name', TYPES.VarChar, req.body['Name']);
        request.addParameter('Email', TYPES.VarChar, req.body['Email']);
        request.addParameter('Genre', TYPES.VarChar, req.body['Genre']);
        request.addParameter('City', TYPES.VarChar, req.body['City']);
        request.addParameter('State', TYPES.VarChar, req.body['State']);

        connection.execSql(request);
    });

    router.delete('/act/:act_id', function (req, res) {
        var actID = req.params['act_id'];
        var request = new Request('DELETE FROM Acts WHERE Act_ID = ' + actID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Act has been deleted'})
                }
            });
    });

    // COSTS
    router.get('/costs', function (req,res) {
        var request = new Request('SELECT * FROM Costs;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });
    router.get('/cost/:show_id', function (req, res) {
        var showID = req.params['show_id'];
        var request = new Request('SELECT * FROM Costs WHERE Show_ID = ' + showID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/cost', function (req, res) {
        var request = new Request('INSERT INTO Costs (Show_ID, Lights, Sound, Bouncer, Bar, Promoter_Cost, Band_Payout)' +
            'VALUES (@Show_ID, @Lights, @Sound, @Bouncer, @Bar, @Promoter_Cost, @Band_Payout);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Cost Added'});
                }
            });

        request.addParameter('Show_ID', TYPES.Int, req.body['Show_ID']);
        request.addParameter('Lights', TYPES.VarChar, req.body['Lights']);
        request.addParameter('Sound', TYPES.VarChar, req.body['Sound']);
        request.addParameter('Bouncer', TYPES.VarChar, req.body['Bouncer']);
        request.addParameter('Bar', TYPES.VarChar, req.query['Bar']);
        request.addParameter('Promoter_Cost', TYPES.VarChar, req.body['Promoter_Cost']);
        request.addParameter('Band_Payout', TYPES.VarChar, req.body['Band_Payout']);

        connection.execSql(request);
    });

    router.put('/cost', function (req, res) {
        var request = new Request('UPDATE Costs SET Lights = @Lights, Sound = @Sound, Bouncer = @Bouncer, Bar = @Bar, ' +
            'Promoter_Cost = @Promoter_Cost, Band_Payout = @Band_Payout WHERE Show_ID = @Show_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Cost Updated'});
                }
            });
        request.addParameter('Show_ID', TYPES.Int, req.body['Show_ID']);
        request.addParameter('Lights', TYPES.VarChar, req.body['Lights']);
        request.addParameter('Sound', TYPES.VarChar, req.body['Sound']);
        request.addParameter('Bouncer', TYPES.VarChar, req.body['Bouncer']);
        request.addParameter('Bar', TYPES.VarChar, req.query['Bar']);
        request.addParameter('Promoter_Cost', TYPES.VarChar, req.body['Promoter_Cost']);
        request.addParameter('Band_Payout', TYPES.VarChar, req.body['Band_Payout']);

        connection.execSql(request);
    });

    router.delete('/cost/:show_id', function (req, res) {
        var showID = req.params['show_id'];
        var request = new Request('DELETE FROM Costs WHERE Show_ID = ' + showID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Cost deleted'});
                }
            });
        connection.execSql(request);
    });

    // EMPLOYEE
    router.get('/employees', function (req, res) {
        var request = new Request('SELECT * FROM Employee;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/employee/:employee_id', function (req, res) {
        var employeeID = req.params['employee_id'];
        var request = new Request('SELECT * FROM Employee WHERE Emp_ID = ' + employeeID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/employee', function (req, res) {
        var request = new Request('INSERT INTO Employee (Position, Phone, Fname, Lname, Minit, Zip, State, City, Street)' +
            'VALUES (@Position, @Phone, @Fname, @Lname, @Minit, @Zip, @State, @City, @Street);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({message: 'Employee added'})
                }
            });

        request.addParameter('Position', TYPES.VarChar, req.body['Position']);
        request.addParameter('Phone', TYPES.VarChar, req.body['Phone']);
        request.addParameter('Fname', TYPES.VarChar, req.body['Fname']);
        request.addParameter('Lname', TYPES.VarChar, req.body['Lname']);
        request.addParameter('Minit', TYPES.VarChar, req.body['Minit']);
        request.addParameter('Zip', TYPES.VarChar, req.body['Zip']);
        request.addParameter('State', TYPES.VarChar, req.body['State']);
        request.addParameter('City', TYPES.VarChar, req.body['City']);
        request.addParameter('Street', TYPES.VarChar, req.body['Street']);
    });

    router.put('/employee', function (req, res) {
        var empID = req.params['employee_id'];
        var request = new Request('UPDATE Employee SET Position = @Position, Phone = @Phone, Fname = @Fname, Lname = @Lname,' +
            ' Minit = @Minit, Zip = @Zip, State = @State, City = @City, Street = @Street WHERE Emp_ID = @Emp_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({message: 'Employee Updated'});
                }
            });

        request.addParameter('Emp_ID', TYPES.Int, req.body['Emp_ID']);
        request.addParameter('Position', TYPES.VarChar, req.body['Position']);
        request.addParameter('Phone', TYPES.VarChar, req.body['Phone']);
        request.addParameter('Fname', TYPES.VarChar, req.body['Fname']);
        request.addParameter('Lname', TYPES.VarChar, req.body['Lname']);
        request.addParameter('Minit', TYPES.VarChar, req.body['Minit']);
        request.addParameter('Zip', TYPES.VarChar, req.body['Zip']);
        request.addParameter('State', TYPES.VarChar, req.body['State']);
        request.addParameter('City', TYPES.VarChar, req.body['City']);
        request.addParameter('Street', TYPES.VarChar, req.body['Street']);

        connection.execSql(request);

    });

    router.delete('/employee/:employee_id', function (req, res) {
        var empID = req.params['employee_id'];
        var request = new Request('DELETE FROM Employee WHERE Emp_ID = ' + empID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Employee deleted'});
                }
            });
        connection.execSql(request);
    });

    // EQUIPMENT
    router.get('/equipment/:venue_id', function (req, res) {
        var venueID = req.params['venue_id'];
        var request = new Request('SELECT * FROM Equipment WHERE Ven_ID = ' + venueID + ' ;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/equipment/:equipment_id', function (req, res) {
        var equipmentID = req.params['equipment_id'];
        var request = new Request('SELECT * FROM Equipment WHERE Eqp_ID = ' + equipmentID + ' ;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/equipment', function (req, res) {
        var request = new Request('INSERT INTO Equpiment (Ven_ID, Condition, Type, Model)' +
            'VALUES (@Ven_ID, @Condition, @Type, @Model);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Equipment Added'});
                }
            });

        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('Condition', TYPES.VarChar, req.body['Condition']);
        request.addParameter('Type', TYPES.VarChar, req.body['Type']);
        request.addParameter('Model', TYPES.VarChar, req.body['Model']);

        connection.execSql(request);
    });

    router.put('/equipment', function (req, res) {
        var request = new Request('UPDATE Equpiment SET Ven_ID = @Ven_ID, Condition = @Condition, Type = @Type,' +
            ' Model = @Model WHERE Eqp_ID = @Eqp_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Equipment Updated'});
                }
            });

        request.addParameter('Eqp_ID', TYPES.Int, req.body['Eqp_ID']);
        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('Condition', TYPES.VarChar, req.body['Condition']);
        request.addParameter('Type', TYPES.VarChar, req.body['Type']);
        request.addParameter('Model', TYPES.VarChar, req.body['Model']);

        connection.execSql(request);
    });

    router.delete('/equipment/:equipment_id', function (req, res) {
        var eqpID = req.params['equipment_id'];
        var request = new Request('DELETE FROM Equipment WHERE Eqp_ID = ' + eqpID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Equipment Deleted'});
                }
            });
        connection.execSql(request);
    });

    // HOUSING
    router.get('/housing/:venue_id', function (req, res) {
        var venueID = req.params['venue_id'];
        var request = new Request('SELECT * FROM Acts WHERE Ven_ID = ' + venueID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/housing/:housing_id', function (req, res) {
        var housingID = req.params['housing_id'];
        var request = new Request('SELECT * FROM Acts WHERE H_ID = ' + housingID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/housing', function (req, res) {
        var request = new Request('INSERT INTO Housing (Ven_ID, Capacity, Price, Complex, POC) VALUES' +
            '(@Ven_ID, @Capacity, @Price, @Complex, @POC);',
            function (err) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({message: 'Housing Added'});
                }
            });
        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('Capacity', TYPES.VarChar, req.body['Capacity']);
        request.addParameter('Price', TYPES.VarChar, req.body['Price']);
        request.addParameter('Complex', TYPES.VarChar, req.body['Complex']);
        request.addParameter('POC', TYPES.VarChar, req.body['POC']);

        connection.execSql(request);
    });

    router.put('/housing', function (req, res) {
        var request = new Request('UPDATE Housing SET Ven_ID = @Ven_ID, Capacity = @Capacity, Price = @Price,' +
            ' Complex = @Complex, POC = @POC) WHERE H_ID = @H_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Housing Updated'});
                }
            });
        request.addParameter('H_ID', TYPES.Int, req.body['H_ID']);
        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('Capacity', TYPES.VarChar, req.body['Capacity']);
        request.addParameter('Price', TYPES.VarChar, req.body['Price']);
        request.addParameter('Complex', TYPES.VarChar, req.body['Complex']);
        request.addParameter('POC', TYPES.VarChar, req.body['POC']);

        connection.execSql(request);
    });

    router.delete('/housing/:housing_id', function (req, res) {
        var housingID = req.params['housing_id'];
        var request = new Request('DELETE FROM Housing WHERE H_ID = ' + housingID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Housing Deleted'});
                }
            });
        connection.execSql(request);
    });

    // PROMOTER
    router.get('/promoters', function (req, res) {
        var request = new Request('SELECT * FROM Promoter;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/promoter/:promoter_id', function (req, res) {
        var promoterID = req.params['promoter_id'];
        var request = new Request('SELECT * FROM Promoter WHERE Pro_ID = ' + promoterID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/promoter', function (req, res) {
        var request = new Request('INSERT INTO Promoter (Fname, Lname, Minit, Phone, Organization)' +
            'VALUES (@Fname, @Lname, @Minit, @Phone, @Oranization);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Promoter Added'});
                }
            });
        request.addParameter('Fname', TYPES.VarChar, req.body['Fname']);
        request.addParameter('Lname', TYPES.VarChar, req.body['Lname']);
        request.addParameter('Minit', TYPES.VarChar, req.body['Minit']);
        request.addParameter('Phone', TYPES.VarChar, req.body['Phone']);
        request.addParameter('Organization', TYPES.VarChar, req.body['Organization']);

        connection.execSql(request);
    });

    router.put('/promoter', function (req, res) {
        var request = new Request('UPDATE Promoter SET Fname = @Fname, Lname = @Lname, Minit = @Minit, Phone = @Phone, ' +
            ' Organization = @Organization WHERE Pro_ID = @Pro_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Promoter Updated'});
                }
            });
        request.addParameter('Pro_ID', TYPES.Int, req.body['Pro_ID']);
        request.addParameter('Fname', TYPES.VarChar, req.body['Fname']);
        request.addParameter('Lname', TYPES.VarChar, req.body['Lname']);
        request.addParameter('Minit', TYPES.VarChar, req.body['Minit']);
        request.addParameter('Phone', TYPES.VarChar, req.body['Phone']);
        request.addParameter('Organization', TYPES.VarChar, req.body['Organization']);

        connection.execSql(request);
    });

    router.delete('/promoter/:promoter_id', function (req, res) {
        var promoterID = req.params['promoter_id'];
        var request = new Request('DELETE FROM Promoter WHERE Pro_ID = ' + promoterID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Promoter Deleted'});
                }
            });
        connection.execSql(request);
    });

    // SHOWS
    router.get('/shows', function (req, res) {
        var request = new Request('SELECT * FROM Shows;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/show/:show_id', function (req, res) {
        var showID = req.params['show_id'];
        var request = new Request('SELECT * FROM Shows WHERE Show_ID = ' + showID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/show', function (req, res) {
        var request = new Request('INSERT INTO Shows (Start_Time, End_Time, Doors_Time, Expected_Sales, Ven_ID, Tour_ID' +
            'VALUES (@Start_Time, @End_Time, @Doors_Time, @Expected_Sales, @Ven_ID, @Tour_ID);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Show Added'});
                }
            });
        request.addParameter('Start_Time', TYPES.Time, req.body['Start_Time']);
        request.addParameter('End_Time', TYPES.Time, req.body['End_Time']);
        request.addParameter('Doors_Time', TYPES.Time, req.body['Doors_Time']);
        request.addParameter('Expected_Sales', TYPES.Float, req.body['Expected_Sales']);
        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('Tour_ID', TYPES.Int, req.body['Tour_ID']);

        connection.execSql(request);
    });

    router.put('/show', function (req, res) {
        var request = new Request('UPDATE Shows SET Start_Time = @Start_Time, End_Time = @End_Time, Doors_Time = @Doors_Time,' +
            ' Expected_Sales = @Expected_Sales, Ven_ID = @Ven_ID, Tour_ID = @Tour_ID WHERE Show_ID = @Show_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Show Updated'});
                }
            });
        request.addParameter('Show_ID', TYPES.Int, req.body['Show_ID']);
        request.addParameter('Start_Time', TYPES.Time, req.body['Start_Time']);
        request.addParameter('End_Time', TYPES.Time, req.body['End_Time']);
        request.addParameter('Doors_Time', TYPES.Time, req.body['Doors_Time']);
        request.addParameter('Expected_Sales', TYPES.Float, req.body['Expected_Sales']);
        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('Tour_ID', TYPES.Int, req.body['Tour_ID']);

        connection.execSql(request);
    });

    router.delete('/show/:show_id', function (req, res) {
        var showID = req.params['show_id'];
        var request = new Request('DELETE FROM Shows WHERE Show_ID = ' + showID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Show Deleted'});
                }
            });
        connection.execSql(request);
    });

    // TICKETS
    // TODO get tickets for a specific act at a given show
    router.get('/ticket/:act_id', function (req, res) {
        var actID = req.params['act_id'];
        var request = new Request('SELECT * FROM Tickets WHERE Act_ID = ' + actID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/ticket', function (req, res) {
        var request = new Request('INSERT INTO Tickets (Show_ID, Act_ID, Amount_Sold, Amount_Given, Price' +
            'VALUES (@Show_ID, @Act_ID, @Amount_Sold, @Amount_Given, @Price);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Ticket Added'});
                }
            });

        request.addParameter('Show_ID', TYPES.Int, req.body['Show_ID']);
        request.addParameter('Act_ID', TYPES.Int, req.body['Act_ID']);
        request.addParameter('Amount_Sold', TYPES.VarChar, req.body['Amount_Sold']);
        request.addParameter('Amount_Given', TYPES.VarChar, req.body['Amount_Given']);
        request.addParameter('Price', TYPES.VarChar, req.body['Price']);

        connection.execSql(request);
    });

    router.put('/ticket', function (req, res) {
        var request = new Request('UPDATE Tickets SET Amount_Sold = @Amount_Sold, Amount_Given = @Amount_Given, ' +
            'Price = @Price WHERE Act_ID = @Act_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Ticket Updated'});
                }
            });
        request.addParameter('Act_ID', TYPES.Int, req.body['Act_ID']);
        request.addParameter('Amount_Sold', TYPES.VarChar, req.body['Amount_Sold']);
        request.addParameter('Amount_Given', TYPES.VarChar, req.body['Amount_Given']);
        request.addParameter('Price', TYPES.VarChar, req.body['Price']);

        connection.execSql(request);
    });

    router.delete('/ticket/:act_id', function (req, res) {
        var actID = req.params['act_id'];
        var request = new Request('DELETE FROM Tickets WHERE Act_ID = ' + actID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Ticket Deleted'});
                }
            });

        connection.execSql(request);
    });

    // TOURS
    router.get('/tours', function (req, res) {
        var request = new Request('SELECT * FROM Tours;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/tour/:tour_id', function (req, res) {
        var tourID = req.params['tour_id'];
        var request = new Request('SELECT * FROM Tours WHERE Tour_ID = ' + tourID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/tour', function (req, res) {
        var request = new Request('INSERT INTO Tours (Title) VALUES (@Title);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Tour added'});
                }
            });
        request.addParameter('Title', TYPES.VarChar, req.body['Title']);

        connection.execSql(request);
    });

    router.put('/tour', function (req, res) {
        var request = new Request('UPDATE Tours SET Title = @Title WHERE Tour_ID = @Tour_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Tour updated'});
                }
            });
        request.addParameter('Tour_ID', TYPES.VarChar, req.body['Tour_ID']);
        request.addParameter('Title', TYPES.VarChar, req.body['Title']);

        connection.execSql(request);
    });

    router.delete('/tour/:tour_id', function (req, res) {
        var tourID = req.params['tour_id'];
        var request = new Request('DELETE FROM Tours WHERE Tour_ID = ' + tourID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Tour Deleted'});
                }
            });
        connection.execSql(request);
    });
    // VENUE
    router.get('/venues', function (req, res) {
        var request = new Request('SELECT * FROM Venue;',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.get('/venue/:venue_id', function (req, res) {
        var venueID = req.params['venue_id'];
        var request = new Request('SELECT * FROM Venue WHERE Ven_ID = ' + venueID + ';',
            function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            });
        connection.execSql(request);
    });

    router.post('/venue', function (req, res) {
        var request = new Request('INSERT INTO Venue (POC, Capacity, Name, City, State, Street, ZIP, Type,' +
            'Time_Open, Time_Close) VALUES (@POC, @Capacity, @Name, @City, @State, @Street, @ZIP, @Time_Open, @Time_Close);',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Venue Added'});
                }
            });
        request.addParameter('POC', TYPES.VarChar, req.body['POC']);
        request.addParameter('Capacity', TYPES.Int, req.body['Capacity']);
        request.addParameter('Name', TYPES.VarChar, req.body['Name']);
        request.addParameter('City', TYPES.VarChar, req.body['City']);
        request.addParameter('State', TYPES.VarChar, req.body['State']);
        request.addParameter('Street', TYPES.VarChar, req.body['Street']);
        request.addParameter('ZIP', TYPES.Int, req.body['ZIP']);
        request.addParameter('TYPE', TYPES.VarChar, req.body['TYPE']);
        request.addParameter('Time_Open', TYPES.Time, req.body['Time_Open']);
        request.addParameter('Time_Close', TYPES.Time, req.body['Time_Close']);

        connection.execSql(request);
    });

    router.put('/venue', function (req, res) {
        var request = new Request('UPDATE Venue SET POC = @POC, Capacity = @Capacity, Name = @Name, City = @City,' +
            ' State = @State, Street = @Street, ZIP = @ZIP, Type = @Type, Time_Open = @Time_Open, Time_Close = @TimeClose' +
            'WHERE Ven_ID = @Ven_ID;',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Venue Updated'});
                }
            });
        request.addParameter('Ven_ID', TYPES.Int, req.body['Ven_ID']);
        request.addParameter('POC', TYPES.VarChar, req.body['POC']);
        request.addParameter('Capacity', TYPES.Int, req.body['Capacity']);
        request.addParameter('Name', TYPES.VarChar, req.body['Name']);
        request.addParameter('City', TYPES.VarChar, req.body['City']);
        request.addParameter('State', TYPES.VarChar, req.body['State']);
        request.addParameter('Street', TYPES.VarChar, req.body['Street']);
        request.addParameter('ZIP', TYPES.Int, req.body['ZIP']);
        request.addParameter('TYPE', TYPES.VarChar, req.body['TYPE']);
        request.addParameter('Time_Open', TYPES.Time, req.body['Time_Open']);
        request.addParameter('Time_Close', TYPES.Time, req.body['Time_Close']);

        connection.execSql(request);
    });

    router.delete('/venue/:venue_id', function (req, res) {
        var venueID = req.params['venue_id'];
        var request = new Request('DELETE FROM Venue WHERE Ven_ID = ' + venueID + ';',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: 'Venue Deleted'})
                }
            });
    });
});

module.exports = router;