const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json());
const database = new Datastore('database.db');
const messageDB = new Datastore('messages.db');
messageDB.loadDatabase();
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log('got request');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        status: "success",
        latitude: data.lat,
        longitude: data.lon
    });
});

app.get('/message', (request, response) => {
    messageDB.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);

    });
});

app.post('/message', (request, response) => {
    console.log('got message');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    messageDB.insert(data);

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
