import express, {Express, Request, Response} from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
// import customerRoutes from './routes/customerRoutes.ts';

const app : Express = express();
const PORT = 3000;

sequelize
.sync({ force: false })
	.then(() => {
		console.log("Database Synced");
	})
	.catch((error : any) => {
		console.error("Error syncing Database", error);
	});


app.use(express.json());

app.use(indexRoutes);
app.use('/api/v1', supplierRoutes);
// app.use('/api/v2', customerRoutes);



app.listen(PORT, () => {
    console.log("Listening!!...");
})