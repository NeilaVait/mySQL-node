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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

// rodom musu html faila
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.html'));
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

// create authors table
app.get('/table/create/authors', (req, res) => {
  const sql = `
  CREATE TABLE authors(
	au_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    age INT,
    sex VARCHAR(255),
    post_id INT
)
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.send(err.stack);
      throw err;
    }
    console.log(result);
    res.json({ msg: 'autoriu lentele sukurta', result });
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
    res.redirect('/post');
    // res.json({ msg: 'irasas sukurtas', result });
  });
});

//add new author
app.post('/newauthor', (req, res) => {
  console.log('req.body', req.body);
  // const newAuthor = {
  //   name: 'bob',
  //   age: 29,
  //   sex: 'male',
  //   post_id: 2,
  // };
  const sql = 'INSERT INTO authors SET ?';
  db.query(sql, req.body, (err, result) => {
    if (err) throw err.stack;
    // res.redirect('/post');
    res.json({ msg: 'autorius sukurtas', result });
  });
});

//add new category
app.get('/newcategory', (req, res) => {
  // console.log('req.body', req.body);
  const newCategory = {
    name: 'garden',
    product_id: 3,
  };
  const sql = 'INSERT INTO product_categories SET ?';
  db.query(sql, newCategory, (err, result) => {
    if (err) throw err.stack;
    // res.redirect('/post');
    res.json({ msg: 'kategorija sukurta', result });
  });
});

// add new product
app.get('/newproduct', (req, res) => {
  // console.log('req.body', req.body);
  const newProduct = {
    product_name: 'flamethrower',
    price: 250,
    quantity: 2,
    category: 2,
  };

  const sql = 'INSERT INTO products SET ?';
  db.query(sql, newProduct, (err, result) => {
    if (err) throw err.stack;
    // res.redirect('/post');
    res.json({ msg: 'produktas sukurtas', result });
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

// get all authors
app.get('/authors', (req, res) => {
  const sql = 'SELECT * FROM authors';
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

// get ids and titles
app.get('/post-ids', (req, res) => {
  const sql = 'SELECT id, title FROM posts';
  db.query(sql, (err, result) => {
    if (err) throw err.stack;
    res.json(result);
  });
});

// get authors and posts
app.get('/authors/create-table', (req, res) => {
  const sql = `
  SELECT posts.title, authors.name, authors.age
  FROM posts
  INNER JOIN authors
  ON posts.id = authors.post_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ success: false, err: err.stack });
      throw err.stack;
    }
    console.log(result);
    res.json({ success: true, result });
  });
});

// get product and categories
app.get('/products/categories', (req, res) => {
  const sql = `
  SELECT products.product_name, product_categories.name, product_categories.cat_id
  FROM products
  INNER JOIN product_categories
  ON products.category = product_categories.cat_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ success: false, err: err.stack });
      throw err.stack;
    }
    console.log(result);
    res.json({ success: true, result });
  });
});

app.listen('3000', console.log('server is running port 3000'));
