const { Router } = require('express');
const mariaDB = require('mariadb');
const router = Router();

router.get('/', (req, res) => {
    const user_data = req.session.user_data;
    res.render('index.ejs', ({
        user_data
    }));
});

router.get('/login', (req, res) => {
    const user_data = req.session.user_data;
    res.render('login.ejs', ({ user_data }));
});

router.get('/register', (req, res) => {
    const user_data = req.session.user_data;
    res.render('signup.ejs', ({ user_data }));
});

router.get('/profile', (req, res) => {
    const user_data = req.session.user_data;
    res.render('profile.ejs', { user_data });
});

router.get('/logout', (req, res) => {
    const user_data = req.session.user_data;
    res.render('logout.ejs', { user_data });
});

router.post('/new-account', (req, res) => {
    console.log(req.body);
    res.send('Recibido'); 
});

router.post('/new-login', (req, res) => {
    console.log(req.body);
    req.session.user_data = req.body;
    res.redirect('/profile');
});

router.post('/close_session', (req, res) => {
    const data = req.session.user_data;
    if(data.password == req.body.password){
        req.session.destroy();
        res.redirect('/login');
    }
    else {
        console.log('Contraseña incorrecta');
    }
});
module.exports = router;