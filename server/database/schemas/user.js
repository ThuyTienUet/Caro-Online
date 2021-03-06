module.exports.define = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        role: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
};
