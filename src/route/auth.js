const express  = require('express');
const router = express.Router();
const { User } = require('../class/user');

router.get('/signup', function(req,res) {
    res.render('signup',
    {
        name: 'signup',
        component: ['back-button', 'field', 'field-password', 'field-checkbox', 'field-select'],
        title: 'Реєстрація',
        data: { 
            role: [
                { value: User.USER_ROLE.USER, name: 'Користувач' },
                { value: User.USER_ROLE.ADMIN, name: 'Адміністратор' },
                { value: User.USER_ROLE.DEVELOPER, name: 'Разробник' },
            ]
        },
    })
})

module.exports = router;