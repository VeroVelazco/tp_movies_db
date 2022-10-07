const moment = require('moment');
const db = require('../database/models')
const {validationResult} = require('express-validator');
const sequelize = db.sequelize; 


module.exports = {
    list : (req,res) => {
        db.Movie.findAll().then((movies) => {return res.render('moviesList',{movies})})
        .catch(error => console.log(error))
    },
    new : (req,res) => {
        db.Movie.findAll({
            order : [['release_date', 'DESC']],
            limit: 5,
        }).then(movies => {
                res.render('newestMovies', {movies});
        })
            .catch(error => console.log(error))
        },
    recommended : (req,res) => {
         db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movie => res.render('recommendedMovies', {movie}))
            .catch(error => console.log(error))

    },
    detail : (req,res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail',{movie}))
            .catch(error => console.log(error))
    },
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add:  (req, res) => {
        db.Genre.findAll({ // de la base de datos me traigo genre
            order : ['name'] // ordenado alfabeticamente
        }) 
        .then(genres => res.render('moviesAdd',{ // recibo todos los generos y renderizo la vista
            genres
        }))  
        .catch(error => console.log(error));
    },
    create:  (req, res) =>{
        const errors = validationResult(req);
        
        // return res.send(errors.mapped())
        
        if(errors.isEmpty()){
            const {title, rating, awards, release_date ,length,  genre_id } = req.body;
            db.Movie.create({
                // ...req.body,
                title : req.body.title.trim(),
                rating : +rating,
                awards : +awards,
                release_date : release_date,
                length : +length,
                genre_id : genre_id
            })
            .then(movie => {
                console.log(movie)
                return res.render("/movies/detail/"+ movie.id)
            })
            
        }else {
            return res.render('moviesAdd',{
                errors,
                old: req.body,
            })
        }
         
    },
    edit :  (req, res)=> {
        let genres = db.Genre.findAll({ 
            order : ['name'],
        });
        let movie = db.Movie.findByPk(req.params.id);
        
        Promise.all([genres, movie])
            .then(([genres, movie]) => {
                res.render('moviesEdit',{ 
                    genres,
                    Movie : movie,
                    moment : moment
                }); 
            })
            .catch(error => console.log(error));
    },
    update: function (req,res) {
        db.Movie.update(
        {...req.body,
            title : req.body.title.trim()
        },
        {where : {id: req.params.id}
        })
        .then(response =>{
            console.log(response);
            return res.redirect('/movies/detail/'+ req.params.id)
        })
        .catch(error => console.log(error))
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDelete',{
                Movie : movie
                })
            })
            .catch(error => console.log(error))
        
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            console.log(result)
            return res.redirect('/movies')
        })
        .catch(error => console.log(error))
    },

};

