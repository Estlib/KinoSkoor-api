module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV7
            },
            FullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EmailAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PasswordHASH: {
                type: DataTypes.STRING,
                allowNull: false
            },
            DisplayName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PhoneNumber2FA: {
                type: DataTypes.STRING,
                allowNull: true
            }
            // LISTID ORDERS MISSING DUE TO TABLE MISSING
        }
    )
    console.log(User === sequelize.models.User)
    return User;
}