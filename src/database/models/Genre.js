module.exports = (sequelize, dataTypes) => {

    const alias = "Genre";

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(500),
            allowNull : false,
        },
        ranking : {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        active : {
            type: dataTypes.BOOLEAN,
            allowNull : false, 
            defaultValue: 1,
        }
        

    }

    const config = {
        tableName : 'genres' ,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Genre = sequelize.define(alias, cols, config)


    //  asocio la fk de generos con peliculas
    Genre.associate = (models) => {
        Genre.hasMany(models.Movie,{
            as : 'movies',
            foreignKey : 'genre_id'
        })
    }
    

    return Genre
}