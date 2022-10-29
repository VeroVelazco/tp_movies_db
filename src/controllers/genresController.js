const db = require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Genre.findAll()
        .then((genres) => {
            return res.render('genresList',{genres})
        })
        .catch(error => console.log(error))
    },
    new : (req,res) => {

    },
    recommended : (req,res) => {

    },
    detail : (req,res) => {
        db.Genre.findByPk(req.params.id,{
            include: [
                {
                    association : 'movies'
                }
            ]
        })
            .then(genre => {
                // return res.send(genre)
                res.render('genresDetail',{genre});
            });
    }
    
}
