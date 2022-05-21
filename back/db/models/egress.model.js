const { Model, DataTypes, Sequelize } = require('sequelize')

const EGRESS_TABLE = 'egress';

const EgressSchema = {

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
        type: DataTypes.ENUM('ingress','egress'),
        allowNull: false
    },
    state:{
        type: DataTypes.ENUM('registered', 'created')
    }

}

class Egress extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EGRESS_TABLE,
            modelName: 'Egress',
            timestamps: false
        }
    }
}

module.exports = { EGRESS_TABLE, EgressSchema, Egress }