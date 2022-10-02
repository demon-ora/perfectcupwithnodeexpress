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

exports.dashboardcontacts = (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM contacts";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('dashboardcontact', {
            title : 'dashboardcontact',
            contacts : rows
        });
    });
}


exports.contactedit = (req, res) => {
    const contactId = req.params.contactId;
    let sql = `Select * from contacts where id = ${contactId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('editcontact', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            contact : result[0]
        });
    });
}

exports.contactupdate = (req, res) => {
    const contactId = req.body.id;
    let sql = "Update contacts SET name='"+req.body.name+"',  email='"+req.body.email+"',  message='"+req.body.message+"' where id ="+contactId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboardcontact');
    });
}


exports.contactdeletes = (req, res) => {
    const contactId = req.params.contactId;
    let sql = `DELETE from contacts where id = ${contactId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/dashboardcontact');
    });
}


exports.showblog = (req, res) => {
    let sql = "SELECT * FROM blogs";
    let query = connection.query(sql, (err, rowss) => {
        if(err) throw err;
        res.render('dashboardblog', {
            title : 'blog',
            blogs : rowss
        });
    });
}

exports.saveblogs = function(req, res){ 
    var file = req.files.image;
    var filename = file.name;
file.mv('./uploads/'+filename,function(err){
    if(err) throw err;
})
    let data = {title: req.body.title, dob: req.body.dob, image: filename , des: req.body.des };
    let sql = "INSERT INTO blogs SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboardblog');
    });
}

exports.editblog = (req, res) => {
    const blogId = req.params.blogId;
    let sql = `Select * from blogs where id = ${blogId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('editblogs', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            blog : result[0]
        });
    });
}

exports.updateblog = (req, res) => {
    if(req.files){
       var file = req.files.image;
    var filename = file.name;
file.mv('./uploads/'+filename,function(err){
    if(err) throw err;
})}else{
    var filename = req.body.oldimage;
}

if(req.body.dob){
    var date = req.body.dob;
}
else{
    var event = new Date(req.body.olddob);

    var date = JSON.stringify(event)
    date = date.slice(1,11)
}
  

    const blogId = req.body.id;
    let sql = "Update blogs SET title='"+req.body.title+"',  dob='"+date+"',   image='"+filename+"',  des='"+req.body.des+"' where id ="+blogId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboardblog');
    });
}

exports.deletesblogs = (req, res) => {
    const blogId = req.params.blogId;
    let sql = `DELETE from blogs where id = ${blogId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/dashboardblog');
    });
}
