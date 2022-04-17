const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const user_data = req.session.user_data;
    res.render('index.ejs', ({
        user_data
    }));
});

router.get('/login', (req, res) => {
    const user_data = req.session.user_data;
    res.render('login.ejs', ({
        user_data
    }));
})

router.post('/register', (req, res) => {
    console.log(req.body);
    req.session.user_data = req.body;
    res.redirect('/profile');
});

router.get('/profile', (req, res) => {
    const user_data = req.session.user_data;
    res.render('profile.ejs', {
        user_data
    });
});

router.get('/logout', (req, res) => {
    const user_data = req.session.user_data;
    res.render('logout.ejs', {
        user_data
    })
});

router.post('/close_session', (req, res) => {
    const data = req.session.user_data;
    if(data.password == req.body.password){
        req.session.destroy();
        res.redirect('/');
    }
    else {
        console.log('Contraseña incorrecta');
    }
});
module.exports = router;