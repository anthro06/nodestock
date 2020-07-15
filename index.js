// Stock Market Portfolio App

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require ('body-parser');
const PORT = process.env.PORT || 5000;

//Use body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//API Key pk_bc6511ce0c96483799efc351d03822fd
//Create call_api function
function call_api(finishedAPI, ticker) {
    //request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_bc6511ce0c96483799efc351d03822fd', { json: true }, (err, res, body) => {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_bc6511ce0c96483799efc351d03822fd', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200){
            //console.log(body);
            finishedAPI(body);
        };
    });
};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//const otherstuff = "Hello there, this is other stuff!";


// Set Handlebar index GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    }, "brk.a");
   
});

// Set Handlebar index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
            //posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI
        });
    }, req.body.stock_ticker);
   
});

// Create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log ('Server listening on port ' + PORT));
