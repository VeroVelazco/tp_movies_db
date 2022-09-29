const db = require('../database/models')
const sequelize = db.sequelize; 

module.exports = {
    list : (req,res) => {
        db.Movie.findAll()
            .then((movies) => {
                return res.render('moviesList.ejs',{movies})
            })
            .catch(error => console.log(error))
    },
    new : (req,res) => {
        

    },
    recommended : (req,res) => {

    },
    detail : (req,res) => {
        db.Movie.findByPk(req.params.id)
            .then(movies => {
                res.render('moviesDetail.ejs',{movies});
            });
    }
}
