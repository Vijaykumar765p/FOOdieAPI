var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var configdata = require('./config/config');
const cors = require('cors');
var dbmodel = require('./lib/dbquery');

var mysql = require('mysql');

var mysqlconn = mysql.createConnection(configdata.mysqlconnection);
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


http.createServer(app).listen(5000, function (err) {
    console.log('running server on port 5000');
});



/*----------------------------------------------------------------------------------------------*/

// GET METHODS

app.get('/user/:id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getUser(req, mysqlconn, function (result) {
        res.json(result);
    });
});


//Get PeriodType by id API
app.get('/places/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getPlace(req, mysqlconn, function (result) {
        res.json(result);
    });
});

app.get('/trip/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getTRIP(req, mysqlconn, function (result) {
        res.json(result);
    });
});

app.get('/tripbusdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.gettripBusDetails(req, mysqlconn, function (result) {
        res.json(result);

    });
});

app.get('/getfromlocationdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getFromLocationDetails(req, mysqlconn, function (result) {
        res.json(result);

    });
});

app.get('/gettolocationdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getToLocationDetails(req, mysqlconn, function (result) {
        res.json(result);

    });
});

app.get('/confirmseats/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.confirmseats(req, mysqlconn, function (result) 
    {
        res.json(result);
    });
});


app.get('/getbusticketdetails/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getbusticketdetails(req, mysqlconn, function (result) 
    {
        res.json(result);
    });
});

app.get('/getbus/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    dbmodel.getBUS(req, mysqlconn, function (result) 
    {
        res.json(result);
    });
});

/*-----------------------------------------------------------------------------------------------*/

// POST METHODS

app.post('/bmtcslotlogin', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    /*var bdobj=JSON.parse(Object.keys(req.body)[0]);
     console.log(bdobj['email']);
     console.log(bdobj['password']);*/
    //res.json();
    dbmodel.doslotLogin(req, mysqlconn, function (result) {
        res.json(result);
    });
});

app.post('/signup', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    dbmodel.signup(req, mysqlconn, function (result) {
        res.json(result);
    });
});

app.post('/editprofile', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    dbmodel.editProfile(req, mysqlconn, function (result) {
        res.json(result);
    });
});