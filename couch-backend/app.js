const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
const tweetRoute = require('./routes/tweetRoutes');

// const couch = new NodeCouchDb({
//     host: '172.26.132.28',
//     protocol: 'http',
//     port: 5984,
//     auth: {
//         user: 'admin',
//         password: 'admin'
//     }
// });

// const dbName = 'tweets';
// // const viewUrl = '_design/all_customers/_view/all';
// const viewUrl = '_design/all/_view/demo-view?limit=500';


// couch.listDatabases().then((dbs) => {
//     console.log('ddbs: ', dbs);
// })

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


app.use('/', tweetRoute);

// app.get('/', (req, res) => {
//     // res.send('workingg');
//     console.log('getttttt')
//     couch.get(dbName, viewUrl).then((data, headers, status) => {
//         console.log('data: ', data.data.rows);
//         res.send('successful')
//         // res.render('index',  {
//         //     customers: data
//         // });
//     }, (err) => {
//         res.send(err);
//     })
// });

// app.post('/customer/add', (req, res) => {
//     const name = req.body
// })

app.listen(3001, () => {
    console.log('listeninggg');
});