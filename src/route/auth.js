const express  = require('express');
const router = express.Router();
const { User } = require('../class/user');

User.create(
    {
        email: 'qwerty@gmail.com',
        password: 'qwerty',
        role: 1,
    }
)

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

router.post('/signup', function(req,res) {
    const { email, password, role } = req.body;
    console.log(req.body);
    if(!email || !password || !role) {
        return res.status(400).json({ message: 'Помилка! Введіть всі дані' });
        
    }
    try {
        User.create({ email, password, role})

        return res.status(200).json({message: 'Ви успішно зареєстровані'});
        
    } catch (error) {
        return res.status(400).json({ message: 'Помилка створення користувача' })
    }
})

module.exports = router;