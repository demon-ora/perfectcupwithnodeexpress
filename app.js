const path = require('path');
const express = require('express');
const ejs = require('ejs');
var session = require('express-session');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const homess = require('./controller/home');
const authss = require('./controller/auth');
const dashboardss = require('./controller/dashboard');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.use(upload());
app.use(express.static(path.join(__dirname,"static")))
app.use(express.static(path.join(__dirname,'uploads')))
 
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
 
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',homess.homes);
app.get('/about',homess.abouts);
app.get('/contact',homess.contacts);
app.post('/contact',homess.savecontacts);
app.get('/login',authss.logins);
app.post('/login',authss.loginbaby);
app.get('/reg',authss.regs);
app.post('/reg',authss.saves);
app.get('/blog',homess.blogs);
app.get('/dashboard',dashboardss.dashboards);

app.get('/dashboard/edit/:userId',dashboardss.edit);

app.post('/dashboard/update',dashboardss.update);
 
app.get('/dashboard/delete/:userId',dashboardss.deletes);

app.get('/dashboardcontact',dashboardss.dashboardcontacts);

app.get('/dashboardcontact/edit/:contactId',dashboardss.contactedit);

app.post('/dashboardcontact/update',dashboardss.contactupdate);
 
app.get('/dashboardcontact/delete/:contactId',dashboardss.contactdeletes);


app.get('/dashboardblog',dashboardss.showblog);
app.post('/dashboardblog',dashboardss.saveblogs);

app.get('/dashboardblog/edit/:blogId',dashboardss.editblog);

app.post('/dashboardblog/update',dashboardss.updateblog);
 
app.get('/dashboardblog/delete/:blogId',dashboardss.deletesblogs);


app.listen(3000, () => {
    console.log('Server is running at port 3000');
});