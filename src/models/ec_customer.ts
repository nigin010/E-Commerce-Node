import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config";
import EcCustomers from "../../types/modelTypes/ec_customer";

EcCustomers.init({
    customer_id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    customer_name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    customer_email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    phone_number : {
        type : DataTypes.NUMBER, 
        allowNull : false,
    }
},{
	sequelize:sequelize,
	modelName : 'ec_customer',
	tableName : 'ec_customer',
});

export default EcCustomers;