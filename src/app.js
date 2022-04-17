const express = require("express");
const session = require('express-session');
const SQLStorage = require('express-mysql-session');
const mariaDB = require('mariadb');
const path = require('path');
const credentials = require('../credentials/db.js');

const app = express();

const SQLStoreConfig = {
    host: credentials.sessions.host,
    port: credentials.sessions.port,
    user: credentials.sessions.user,
    password: credentials.sessions.password,
    database: credentials.sessions.database
}

const storeSession = new SQLStorage(SQLStoreConfig);

//SETTINGS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    saveUninitialized: false,
    resave: false,
    store: storeSession,
    secret: 'mysecretkey_node',
    key: 'user_cookie'   
}));

//ROUTES
app.use(require('./routes/index.js'));


app.listen(3000);
console.log('Server on port: ' + 3000)