const express = require('express');
const tweetRoute = express.Router();
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
    host: '172.26.132.28',
    protocol: 'http',
    port: 5984,
    auth: {
        user: 'admin',
        password: 'admin'
    }
});

// couch.listDatabases().then((dbs) => {
//     console.log(dbs);
// })

let skip = 0;
const rowsPerPage = 20;
const dbName = 'tweets';

tweetRoute.route('/environment-tweets').get((req, res) => { // DO NOT TOUCH!
    couch.get(dbName, `_design/all/_view/environment-view`)
        .then((data, headers, status) => {
            console.log(data.data.rows.length)
            res.send(data.data.rows)
        }, (err) => {
            console.log('Environment went wrong!: ', err)
            res.send('Environment went wrong!');
        })
})

tweetRoute.route('/accident-tweets').get((req, res) => { // DO NOT TOUCH!
    couch.get(dbName, `_design/all/_view/accident-view`)
        .then((data, headers, status) => {
            console.log(data.data.rows.length)
            res.send(data.data.rows)
        }, (err) => {
            console.log('Something went wrong!')
            res.send('Something went wrong!');
        })
})

tweetRoute.route('/pollution-tweets').get((req, res) => { // DO NOT TOUCH!
    couch.get(dbName, `_design/all/_view/pollution-view`)
        .then((data, headers, status) => {
            console.log(data.data.rows.length)
            res.send(data.data.rows)
        }, (err) => {
            console.log('Something went wrong!')
            res.send('Something went wrong!');
        })
})

tweetRoute.route('/lavishness-tweets').get((req, res) => { // DO NOT TOUCH!
    couch.get(dbName, `_design/all/_view/lavish-view`)
        .then((data, headers, status) => {
            console.log(data.data.rows.length)
            res.send(data.data.rows)
        }, (err) => {
            console.log('Something went wrong!')
            res.send('Something went wrong!');
        })
})

module.exports = tweetRoute;