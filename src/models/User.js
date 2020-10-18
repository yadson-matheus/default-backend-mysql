module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        tableName: 'user',
        freezeTableName: true,
        underscored: true,
        version: true,
        sequelize,
    });

    return User;
};
