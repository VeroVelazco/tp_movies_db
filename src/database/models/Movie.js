module.exports = (sequelize, dataTypes) => {

    const alias = "Movie";

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING,
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false,
        },
        awards : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            defaultvalue : 0  
        },
        release_date :{
            type : dataTypes.DATE,
            allowNull : false,
        },
        length :{
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : true,
            defaultValue : null
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : true,
            defaultValue : null
        }
    }
    const config = {
        tableName : 'movies' ,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Movie = sequelize.define(alias, cols, config)
    // asociacion que vincula películas con género.
    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre,{
            as : 'genre',
            foreignKey : 'genre_id'
        })
   
        // asociacion que vincula películas con actores.
        // relación de muchos a muchos.
  
        Movie.belongsToMany(models.Actor,{
            // creo asociacion entre películas y actores
            as : 'actors',
            // tabla pivot
            through : 'actor_movie',
            // hace referencia donde estoy parado
            foreignKey : 'movie_id',
            // hace referencia a la otra tabla
            otherKey : 'actor_id'
        })
    }


    return Movie
}