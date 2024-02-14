import {DataTypes, Sequelize} from "sequelize";
import sequelize from "../config/sequelize-config";
import EcSuperAdmin from "../../types/modelTypes/ec_superAdmin";

EcSuperAdmin.init ({
    subscription_plan_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
    subscription_plan_name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    subscription_fee : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    number_of_customers : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
},{
	sequelize:sequelize,
	modelName : 'ec_superAdmin',
	tableName : 'ec_superAdmin',
});

export default EcSuperAdmin;