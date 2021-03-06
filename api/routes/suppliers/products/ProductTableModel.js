const Sequelize = require('sequelize');
const instance = require('../../../database');

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    supplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../SupplierTableModel'),
            key: 'id'
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: 'product',
    timestamps: true,
    version: true
}

module.exports = instance.define('product', columns, options);
