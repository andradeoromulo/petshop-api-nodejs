const Sequelize = require('sequelize');
const instance = require('../../database');

const columns = {
    company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    category: {
        type: Sequelize.ENUM('Food', 'Toys'),
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    tableName: 'supplier',
    timestamps: true,
    version: 'version'
}

module.exports = instance.define('supplier', columns, options);