const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(express.static(path.join(__dirname,"static")))

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'perfectcupnode'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));

exports.homes = (req, res) => {
    res.render('index', {
        title : 'homepage'
    });
}

exports.abouts = (req, res) => {
    res.render('about', {
        title : 'aboutpage'
    });
}


exports.contacts = (req, res) => {
    res.render('contact', {
        title : 'contactpage'
    });
}


exports.savecontacts = (req, res) => { 
    let data = {name: req.body.name, email: req.body.email, message: req.body.message};
    let sql = "INSERT INTO contacts SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/contact');
    });
}

exports.blogs = (req, res) => {
    res.render('blog', {
        title : 'blogpage'
    });
}