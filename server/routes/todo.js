var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {

            client.query('SELECT * FROM todo;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.put('/:id', function (req, res) {
    var toComplete = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase)
            res.sendStatus(500);
        } else {
            client.query('UPDATE todo SET completed=$1 WHERE id=$2', ['Y', toComplete], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})

router.delete('/:id', function (req, res) {
    var toDoToDelete = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM todo WHERE id=$1;`, [toDoToDelete], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var task = req.body.task;
    var due = req.body.due;
    var steps = req.body.steps;
    console.log(task)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("INSERT INTO todo (task, due, steps, completed) VALUES ($1, $2, $3, 'N')", [task, due, steps], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
            
        }
    })
})

module.exports= router;