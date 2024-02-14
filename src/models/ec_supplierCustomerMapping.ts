import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config";
import EcSupplierCustomerMapping from "../../types/modelTypes/ec_supplierCustomerMapping";

EcSupplierCustomerMapping.init({
    supplier_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    customer_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    invite_status : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : 'PENDING',
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
	modelName : 'ec_supplierCustomerMapping',
	tableName : 'ec_supplierCustomerMapping',
});

export default EcSupplierCustomerMapping;