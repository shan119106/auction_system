const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const Sendresponse = require('../sendresponse');
const models = require(__dirname + '/../../models/');
const md5 = require('md5');

//Sample file for all routes

// trust first proxy3
app.set('trust proxy', 1);

app.use(
    cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    })
);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.post('/userRegisteration', function(req, res) {
    const {username: name, password, email, contact, country} = req.body;
    console.log('receive request');
    models.User.build({
        name,
        password: md5(password),
        role: 'User',
        balance: 0,
        email,
        contact,
        country
    })
        .save()
        .then(response => {
            Sendresponse(res, 200, 'User Registered Successfully');
        })
        .catch(err => {
            console.log(err);
            Sendresponse(res, 400, 'Error registering user');
        });
});

module.exports = app;
