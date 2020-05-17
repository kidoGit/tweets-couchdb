const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const tweetRoute = require('./routes/tweetRoutes');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(cors());
app.use('/', tweetRoute);

app.listen(3001, () => {
    console.log('listening on port 3001');
});