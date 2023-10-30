const express  = require('express');
const router = express.Router();
const { User } = require('../class/user');
const {Confirm} = require('../class/confirm');


// ========================================================
User.create(
    {
        email: 'qwerty@gmail.com',
        password: 'qwerty',
        role: 1,
    }
);
//=========================================================
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
        const user = User.getByEmail(email);
        if(user) {
            return res.status(400).json({ message: 'Користувач з таким email вже існує' });
        }

        User.create({ email, password, role})

        return res.status(200).json({message: 'Ви успішно зареєстровані'});
        
    } catch (error) {
        return res.status(400).json({ message: 'Помилка створення користувача' })
    }
})
//=========================================================
router.get('/recovery', function(req,res) { 
    res.render('recovery',
    {
        name: 'recovery',
        component: ['back-button', 'field'],
        title: 'Відновлення паролю',
        data:{},
    })
})

router.post('/recovery', function(req,res) {
    const { email } = req.body;
    console.log(email);
    if(!email) {
        return res.status(400).json({ message: 'Помилка! Введіть всі дані' });
    }
 try {
    const user = User.getByEmail(email);
   
    if(!user) {
        return res.status(400).json({ message: 'Користувача з таким email не знайдено' });
    }
    const confirm = Confirm.create(email); // Store the generated code

    
    console.log(confirm)
    return res.status(200).json({ message: 'Вам на пошту відправлено лист з кодом підтвердження' });
 } catch (error) {
    return res.status(400).json({ message: error.message })
 }

})
//=========================================================
router.get('/recovery-confirm', function(req,res) { 
    res.render('recovery-confirm',
    {
        name: 'recovery-confirm',
        component: ['back-button', 'field', 'field-password'],
        title: 'Підтвердження відновлення паролю',
        data:{},
    })
})


router.post('/recovery-confirm', function(req,res) {
    const {password, code} = req.body;
    console.log(req.body);

    if(!password || !code) {
        return res.status(400).json({ message: 'Помилка! Введіть всі дані' });
    }
    try {
        const email = Confirm.getData(Number(code));
        if(!email) {
            return res.status(400).json({ message: 'Код підтвердження не знайдено' });
        }
        const user = User.getByEmail(email);
        if(!user) {
            return res.status(400).json({ message: 'Користувача з таким email не знайдено' });
        }
        user.password = password;
        console.log(user);
        return res.status(200).json({ message: 'Пароль успішно змінено' });

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})


//=========================================================

module.exports = router;