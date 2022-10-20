const db = require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Actors.findAll()
        .then((actors) => {
            return res.render('actorsList.ejs',{actors})
        })
        .catch(error => console.log(error))
    },
    new : (req,res) => {

    },
    recommended : (req,res) => {

    },
    detail : (req,res) => {
        db.Actors.findByPk(req.params.id)
            .then(actors => {
                res.render('actorsDetail',{actors});
            });
    }
    
}