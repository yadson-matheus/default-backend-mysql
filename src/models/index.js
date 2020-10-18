const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');

const config = require('../../config/database');

const db = {};
const basename = path.basename(__filename);

try {
    const sequelize = new Sequelize(config);

    fs.readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = require(path.join(__dirname, file))(sequelize, DataTypes);

            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    sequelize.sync();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
}
catch (error) {
    console.error('Unable to connect database:', error);
}

module.exports = db;
