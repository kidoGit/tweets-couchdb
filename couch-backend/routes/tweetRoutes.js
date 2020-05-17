const express = require('express');
const app = express();
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

const dbName = 'tweets';
// const viewUrl = '_design/all_customers/_view/all';
const viewUrl = '_design/all/_view/demo-view?limit=20';

// tweetRoute.route('/create').post((req, res, next) => {});


tweetRoute.route('/').get((req, res) => {
    console.log('getttttt')
    couch.get(dbName, viewUrl).then((data, headers, status) => {
        console.log('data: ', data.data.rows);
        res.send(data.data.rows)
        // res.render('index',  {
        //     customers: data
        // });
    }, (err) => {
        res.send(err);
    })
})

// tweetRoute.route('/read/:id').get((req, res) => {})

// tweetRoute.route('/update/:id').put((req, res, next) => {})

// tweetRoute.route('/delete/:id').delete((req, res, next) => {})

module.exports = tweetRoute;