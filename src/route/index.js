// Імпортуємо бібліотеку Express.js і зберігаємо її в змінній 'express'
const express = require('express');

// Створюємо новий маршрутизатор (router) за допомогою Express.js
const router = express.Router();

// Маршрут для обробки HTTP GET-запитів на кореневому шляху веб-сайту
router.get('/', (req, res) => {
    // Відправляємо HTML-сторінку на основі шаблону 'index' разом з певними даними до клієнта
    res.render('index', {
        name: 'index',
        component: [],
        title: 'Головна',
        data: {},
    });
});

// Імпортуємо роутер "auth" з файлу "auth.js"
const auth = require('./auth');

// Підключаємо роутер "auth" до поточного маршруту
router.use('/', auth);

// Ви можете використовувати інші файли роутів, якщо вони є

// Експортуємо глобальний маршрут для використання в інших частинах програмного коду
module.exports = router;