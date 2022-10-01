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
exports.loginbaby = (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM users order by id desc";
    let query = connection.query(sql, (err, rows) => {
        i=0;
        if(err) throw err;
        for(i=0;i<rows.length;i++){
          
        if(rows[i].name==req.body.name && rows[i].password==req.body.password){
            req.session.sname=req.body.name;
            res.redirect('/');
            break;}else if (req.body.name=="ora" && req.body.password=="oraora"){
                req.session.ssname=req.body.name;
                res.redirect('/dashboarduser');
            break;
            }else if(i==rows.length-1 ){  
                res.redirect('/contact');
            }
        } 
    });
}
