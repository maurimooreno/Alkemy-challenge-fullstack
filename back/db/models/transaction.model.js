const { Model, DataTypes, Sequelize } = require('sequelize')

const TRANSACTION_TABLE = 'transaction';

const TransactionSchema = {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    concept:{
        type: DataTypes.STRING,
        allowNull: false
    },
    amount:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    type:{
        type: DataTypes.ENUM('costs','income'),
        allowNull: false
    },
}

class Transaction extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TRANSACTION_TABLE,
            modelName: 'Transaction',
            timestamps: false
        }
    }
}

module.exports = { TRANSACTION_TABLE, TransactionSchema, Transaction }