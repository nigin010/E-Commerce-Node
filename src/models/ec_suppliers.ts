import {DataTypes, Sequelize} from 'sequelize';
import sequelize from '../config/sequelize-config.ts';
import EcSuppliers from '../../types/modelTypes/ec_suppliers.ts';
import bcrypt from 'bcrypt';

EcSuppliers.init(
  {
		id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		},
		full_name: {
		type: DataTypes.STRING,
		allowNull: false,
		},
		e_mail:{
		type:DataTypes.STRING,
		allowNull: false,
		unique : true,
		},
		password: {
		type: DataTypes.STRING,
		allowNull: false,
		
		},
		profile_pic:{
		type:DataTypes.STRING, 
		allowNull: true,
		},
		registration_id:{
		type:DataTypes.STRING,
		allowNull: true,
		defaultValue : () => {
			return Math.floor(100000 + Math.random() * 900000).toString();
		},
		},
		registration_time_stamp:{
		type:DataTypes.DATE,
		allowNull: false,
		defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
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
	modelName : 'ec_suppliers',
	tableName : 'ec_suppliers',
	hooks : {
		beforeCreate : (user : EcSuppliers) => {
			const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
			user.password = hashedPassword;
		}
	}
});

export default EcSuppliers;