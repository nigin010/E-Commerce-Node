import {Sequelize} from 'sequelize';
 
const sequelize = new Sequelize({
  database: 'e_commerce',
  username: 'root',
  password: 'experion@123',
  host: '127.0.0.1',
  dialect: 'mysql',
});
 
// const sequelize = new Sequelize({
//   database: 'e_commerce',
//   username: 'root',
//   password: 'Experion@123',
//   host: 'ec2-3-111-189-86.ap-south-1.compute.amazonaws.com',
//   dialect: 'mysql',
// })
export default sequelize;