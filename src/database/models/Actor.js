module.exports = (sequelize, dataTypes) => {

    const alias = "Actors";

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
    const Actor = sequelize.define(alias, cols, config)

    return Actor
}