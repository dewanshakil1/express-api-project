const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const nodemon = require('nodemon');
const pageLayout = require('express-ejs-layouts');
const studentroute = require('./routers/studentRoute');

// environtment variable
dotenv.config();
const port = process.env.PORT;
// init express
const app = express();
// data manage
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(pageLayout);
// init ejs
app.set('view engine', 'ejs');
app.set('layout', './Layouts/app.ejs');

app.use('/student', studentroute);
// create server
app.listen(port, () => {
	console.log(`server is running on ${port}`.bgBlue.blue);
});
