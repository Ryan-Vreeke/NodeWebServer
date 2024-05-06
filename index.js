const express = require('express');
const vhost = require('vhost');
const mysql = require('mysql');
const moment = require('moment');
const { response } = require('express');

const app = express();
const api = express();

app.use(express.static('public'));
app.use(express.json());
app.use(vhost('api.localhost', api));
api.use(express.static('api'));

app.listen(3000, () => console.log('listening at port 3000'));


const con = mysql.createConnection({
    host: 'localhost',
    user: 'localnode',
    password: '********',
    database: 'portfolio'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

app.post('/api', (req, res) => {
    console.log('got location');
    const data = req.body;

    let stmt = `INSERT INTO locations(lat, lon) VALUES(?,?);`;
    let loc = [data.lat, data.lon];
    con.query(stmt, loc, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }

        console.log('location: ' + fields);
    });

    res.json({
        status: "success"
    });
});

app.get('/projects', (request, response) => {
    response.sendFile(__dirname + '/public/projects.html');
});

app.get('/message', (request, response) => {
    con.query(`SELECT * FROM Messages ORDER BY timestamp DESC;`, (err, rows) => {
        if (err) {
            response.end();
            return;
        }

        response.json(rows);
    });
});

app.post('/message', (request, response) => {
    console.log('got message');
    const data = request.body;


    let stmt = `INSERT INTO Messages(name,email,phone,message,timestamp) VALUES(?,?,?,?,?);`;
    let message = [data.name, data.email, data.phone, data.message, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')];
    con.query(stmt, message, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }

        console.log('Message: ' + fields);
    });

    response.json({
        status: "success",
        name: data.name,
        email: data.email,
        message: data.message
    });
});

app.get('/favicon.ico', (request, response) => {
    response.sendFile('./public/favicon.ico');
});

/*Projects*/
app.get('/qProjects', (req, res) => {
    let stmt = `SELECT * FROM Projects;`
    con.query(stmt, (err, rows) => {
        if (err) {
            response.end();
            return console.error(err.message);
        }
        console.log('sent projects query')
        res.json(rows);
    });


});

app.post('/categories',(req,res) => {
    const data = req.body;

    let stmt = 'SELECT * FROM Categories natural join ProCat WHERE pID = ' + data.pid + ';';
    con.query(stmt, (err, rows) => {
        if (err) {
            response.end();
            return console.error(err.message);
        }
        console.log('sent categories for ' + data.pid);
        res.json(rows);
    });
});

/*Api Requests*/

api.get('/projects', (req, res) => {
    res.sendFile(__dirname + '/api/apiProj.html')
});

api.post('/projects', (req, res) => {
    console.log(req.body);
    const data = req.body;

    res.json({
        status: "success",
        name: data.name,
        des: data.des
    });
});
