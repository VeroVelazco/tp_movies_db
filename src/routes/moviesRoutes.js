const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');

const movieValidator = require('../validations/movieValidator');

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recommended);
router.get('/detail/:id', moviesController.detail);

//Rutas exigidas para la creación del CRUD
router.get('/add', moviesController.add);
router.post('/create', movieValidator, moviesController.create);
router.get('/edit/:id', moviesController.edit);
router.post('/update/:id', moviesController.update); // put
router.get('/delete/:id', moviesController.delete);
router.post('/delete/:id', moviesController.destroy); //delete


module.exports = router;