const { Router } = require('express');
const mariaDB = require('mariadb');
const credentials = require('../credentials/db.js');
const router = Router();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: credentials.page.host, 
     user: credentials.page.user, 
     password: credentials.page.password,
     database: credentials.page.database,
     connectionLimit: 5
});

const returnValue = (request, response) => {
    return new Promise((res, rej) => {
        pool.getConnection().then(conn => { conn.query(`SELECT 1 FROM users WHERE user_email='${request.body.email}'`)
            .then( (rows) => { 
                if(rows.length == 0){
                    console.log("Ejecutando if de promesa...");
                    conn.query(`INSERT INTO users (user_email, user_name, user_lastname, user_password, user_age) VALUES ('${request.body.email}', '${request.body.name}', '${request.body.lastname}', '${request.body.password}', ${request.body.age})`);
                    request.session.message= `Usuario creado exitosamente`;
                    request.session.user_data = request.body;
                    response.redirect('/profile');
                    res(`¡El usuario ${request.body.name} ${request.body.lastname} ha sido creado exitosamente!`);
                } 
                else {
                    console.log('Ejecutando else de promesa...');
                    conn.query(`SELECT user_password FROM users WHERE user_email='${request.body.email}'`).then( result => rej(result));
                    request.session.message = `El correo ya se encuentra registrado en la plataforma.`;
                    response.redirect('/register');
                }
                conn.end();
            }).catch(info => console.log(info))
            .catch( err => console.log(err) ); 
        }).catch(err => { console.log(err) }); 
    });
}


router.get('/', (req, res) => {
    const user_data = req.session.user_data;
    res.render('index.ejs', ({
        user_data
    }));
});

router.get('/login', (req, res) => {
    const user_data = req.session.user_data;
    const message = req.session.message;
    delete req.session.message;
    res.render('login.ejs', ({ user_data , message }));
});

router.get('/register', (req, res) => {
    const user_data = req.session.user_data;
    const message = req.session.message;
    delete req.session.message;
    res.render('signup.ejs', ({ user_data, message }));
});

router.get('/profile', (req, res) => {
    const user_data = req.session.user_data;
    const message = req.session.message;
    res.render('profile.ejs', { user_data, message });
});

router.get('/logout', (req, res) => {
    const user_data = req.session.user_data;
    res.render('logout.ejs', { user_data });
});

router.post('/new-account', (req, res) => {
    console.log(req.body);
    returnValue(req, res).then( result => { console.log(result) }).catch( err => { console.log(err) });
});

router.post('/new-login', (req, res) => {
    console.log(req.body);
    req.session.user_data = req.body;
    res.redirect('/profile');
});

router.post('/close_session', (req, res) => {
    const data = req.session.user_data;
    if(data.password == req.body.password){
        delete req.session.user_data;
        res.redirect('/login');
    }
    else {
        console.log('Contraseña incorrecta');
    }
});
module.exports = router;