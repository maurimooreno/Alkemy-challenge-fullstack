const { Model, DataTypes, Sequelize } = require('sequelize')

const INGRESS_TABLE = 'ingress';

const IngressSchema = {

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
    }
}

class Ingress extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: INGRESS_TABLE,
            modelName: 'Ingress',
            timestamps: false
        }
    }
}

module.exports = { INGRESS_TABLE, IngressSchema, Ingress }