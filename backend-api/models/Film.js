

module.exports = (sequelize, DataTypes) => {
    const Film = sequelize.define(
        'Film', {
            FilmID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            UserScore: {
                type: DataTypes.DECIMAL,
            },
            RunTime: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ReleaseYear: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Language: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }
    )
    console.log(Film === sequelize.models.Film)
    return Film;
}