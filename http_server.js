// add http server
// -----------------------
// YOUR CODE
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const low     = require('lowdb');
const fs      = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db      = low(adapter);
const cors    = require('cors');

// declate public assets folder
app.use(express.static('public'));

// Allow cross-origin resrouce sharing
app.use(cors());

// configure express to serve static files from public directory
// ------------------------------------------------------------------
// YOUR CODE

// init the data store
db.defaults({ posts: []}).write();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add users
app.post('/add-user', (req, res) => {
    const user = {
        'name': req.body.name,
        'dob': req.body.dob,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'streetaddress': req.body.streetaddress,
        'citystatezip': req.body.citystatezip,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'avatar': req.body.avatar,
    }

    db.get('users').push(user).write();
    console.log('from user', db.get('users').value());
    res.send(db.get('users').value());
})


app.get('/', function(req, res){     
    // YOUR CODE
    res.render("index");

});

// list posts
app.get('/data', function(req, res){     
    // YOUR CODE
    res.send(db.get('users').value());

});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
// ----------------------------------------------------
app.get('/posts/:title/:id/:published', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get('/published/:boolean', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get('/published/:id/:boolean', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get('/delete/:id/', function(req, res){

    // YOUR CODE

});

// handle non-existing routes
app.get('*', (req, res) => {  res.send('This page does not exist');});


// start server
// -----------------------
// YOUR CODE

app.listen(port, () => {
    console.log(`Server is listening to ${port}`);
})

