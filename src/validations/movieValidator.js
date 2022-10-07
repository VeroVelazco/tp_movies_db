const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty()
        .withMessage('Ingresa un titulo').bail(),
    check('rating')
        .notEmpty()
        .isNumeric({
            no_symbols : true
        }).withMessage('Ingresa el rating').bail(),
    check('awards')
        .notEmpty()
        .isNumeric({
            no_symbols : true
        }).withMessage('Ingresa los premios recibidos').bail(),
    check('release_date')
        .notEmpty().bail()
        .withMessage('Ingresa una fecha de estreno'),
    check('length')
        .notEmpty()
        .isNumeric({
            no_symbols : true
        }).withMessage('Ingresa la duración de la película').bail(),
    check('genre_id')
        .notEmpty().bail()
        .withMessage('Ingresa el género').bail(),
        
]