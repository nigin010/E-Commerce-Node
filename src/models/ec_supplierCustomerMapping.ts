import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config";
import EcSupplierCustomerMapping from "../../types/modelTypes/ec_supplierCustomerMapping";

EcSupplierCustomerMapping.init({
    supplier_id : {
        type : DataTypes.NUMBER,
        allowNull : false,
    },
    customer_id : {
        type : DataTypes.NUMBER,
        allowNull : false,
    }
},{
	sequelize:sequelize,
	modelName : 'ec_supplierCustomerMapping',
	tableName : 'ec_supplierCustomerMapping',
});

export default EcSupplierCustomerMapping;