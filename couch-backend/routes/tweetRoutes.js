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

tweetRoute.route('/medicare-aurin').get((req, res) => { // DO NOT TOUCH!
    couch.get("aurin_medicare", `_design/all/_view/medicare-view`)
        .then(async (data, headers, status) => {
            if (data.data.rows) {
                let graphData = []
                await data.data.rows.forEach(element => {
                    const suburb = element.value[0];
                    const pctValue = element.value[1];
                    graphData.push({ suburb, pctValue });
                });
                graphData = graphData.sort((a, b) => (a.pctValue < b.pctValue) ? 1 : ((b.pctValue < a.pctValue) ? -1 : 0));
                console.log(graphData.slice(0, 5));
                res.send(graphData.slice(0, 5));
            }
        }, (err) => {
            console.log('Environment went wrong!: ', err);
            res.send('Environment went wrong!');
        })
})

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