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

tweetRoute.route('/tweets').get((req, res) => {
    let page = parseInt(req.query.pageNo);
    skip = page * rowsPerPage; //

    couch.get(dbName, `_design/all/_view/demo-view?limit=20&skip=${skip}`)
        .then((data, headers, status) => {
            res.send(data.data)
        }, (err) => {
            res.send('Something went wrong!');
        })
})

// tweetRoute.route('/create').post((req, res, next) => {});

// tweetRoute.route('/read/:id').get((req, res) => {})

// tweetRoute.route('/update/:id').put((req, res, next) => {})

// tweetRoute.route('/delete/:id').delete((req, res, next) => {})

module.exports = tweetRoute;