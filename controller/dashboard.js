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

exports.dashboards = (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('dashboard', {
            title : 'dashboard',
            users : rows
        });
    });
}


exports.edit = (req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user : result[0]
        });
    });
}

exports.update = (req, res) => {
    const userId = req.body.id;
    let sql = "Update users SET name='"+req.body.name+"', lastname='"+req.body.lastname+"',  email='"+req.body.email+"',  password='"+req.body.password+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboard');
    });
}


exports.deletes = (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/dashboard');
    });
}
