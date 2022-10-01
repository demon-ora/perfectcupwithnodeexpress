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


exports.logins = (req, res) => {
    res.render('login', {
        title : 'loginpage'
    });
}

exports.regs = (req, res) => {
    res.render('reg', {
        title : 'regpage'
    });
}


exports.saves = (req, res) => { 
    let data = {name: req.body.name, lastname: req.body.lastname, email: req.body.email, password: req.body.password};
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/login');
    });
}
