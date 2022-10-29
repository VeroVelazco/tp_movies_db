module.exports = (sequelize, dataTypes) => {

    const alias = "Actor";

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
       
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : true,
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : true,
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false,
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            defaultValue : 0,
        }

    }

    const config = {
        tableName : 'actors' ,
        timestamp : true,
        underscored : true,
    }
    const Actor = sequelize.define(alias, cols, config);

    // traigo la asosiacion creada en Movie

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie,{
            // creo asociacion entre películas y actores
            as : 'movies',
            // tabla pivot
            through : "actor_movie",
            // hace referencia donde estot parado
            foreignKey : 'actor_id',
            // hace referencia a la otra tabla
            otherKey : 'movie_id'
        })
    }

    return Actor
}