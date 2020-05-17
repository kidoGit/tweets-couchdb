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

const dbName = 'tweets';
const viewUrl = '_design/all/_view/demo-view?limit=20';


tweetRoute.route('/').get((req, res) => {
    couch.get(dbName, viewUrl).then((data, headers, status) => {
        res.send(data.data.rows)
    }, (err) => {
        res.send('Something went wrong!');
    })
})

// tweetRoute.route('/create').post((req, res, next) => {});

// tweetRoute.route('/read/:id').get((req, res) => {})

// tweetRoute.route('/update/:id').put((req, res, next) => {})

// tweetRoute.route('/delete/:id').delete((req, res, next) => {})

module.exports = tweetRoute;