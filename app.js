// this is it
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');

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

// middleware /////////////////////
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded());

// rodom musu html faila
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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

// create table
app.get('/table/create', (req, res) => {
  const sql = `
  CREATE TABLE posts(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.send(err.stack);
      throw err;
    }
    console.log(result);
    res.json({ msg: 'lentele sukurta', result });
  });
});

// add new post
app.post('/newpost', (req, res) => {
  console.log('req.body', req.body);
  // const newPost = {
  //   title: 'third post title',
  //   body: 'third post body and something',
  // };
  const sql = 'INSERT INTO posts SET ?';
  db.query(sql, req.body, (err, result) => {
    if (err) throw err.stack;
    res.json({ msg: 'irasas sukurtas', result });
  });
});

// get all posts
app.get('/post', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, result) => {
    if (err) throw err.stack;
    res.json(result);
  });
});

// get single post dynamically
app.get('/post/:id', (req, res) => {
  const sql = `SELECT * FROM posts WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (err, result) => {
    if (err) throw err.stack;
    res.json(result);
  });
});

// update post
app.get('/post/:id/update', (req, res) => {
  // is vartotojo formos gryzta atnaujintas title
  const newTitle = 'updated title';
  const sql = `UPDATE posts SET title = ${db.escape(newTitle)} WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (err, result) => {
    if (err) throw err.stack;
    res.redirect;
  });
});

// delete post
app.get('/post/:id/delete', (req, res) => {
  const sql = `DELETE FROM posts WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (err, result) => {
    if (err) throw err.stack;
    res.redirect('/allposts');
  });
});

app.listen('3000', console.log('server is running port 3000'));
