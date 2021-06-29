// this is it
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');

// set up connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodesql',
});

// connect
db.connect((err) => {
  if (err) throw err;
  console.log('connected to database');
});

const app = express();

// middleware
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Express veikia normaliai');
});

// create database
app.get('/createdb', (req, res) => {
  const sql = 'CREATE DATABASE nodesql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    // no errors
    console.log(result);
    res.send('nodesql duomenu baze sukurta');
  });
});

app.listen('3000', console.log('server is running port 3000'));
