import express, {Express, NextFunction,  Request, Response} from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import verifyToken from './middleware/verifyjwt.ts';
// import customerRoutes from './routes/customerRoutes.ts';
import superAdminRoutes from './routes/superAdminRoutes.ts';

const app : Express = express();
const PORT = 3000;
export const X_API_KEY : string = "THIS IS AN X-API KEY";

sequelize
.sync({ force: false })
	.then(() => {
		console.log("Database Synced");
	})
	.catch((error : any) => {
		console.error("Error syncing Database", error);
	});


app.use(express.json());

const middleware = (req : Request, res : Response, next : NextFunction) => {

	res.setHeader("Set-Cookie", ["type = e-commerce", "language = typescript"]);
	const api_key = req.headers['x-api-key'];
	console.log("Hi From Middleware!");
	if(api_key === X_API_KEY)
		next();
	else
		return res.json({message : "Invalid X-API-Key"});
}

const superAdminMiddleware = (req : Request, res : Response, next : NextFunction) => {
	const api_key = req.headers['x-api-key'];
	console.log("Hi From Super Admin Middleware!");

	const {registration_id} = req.body;
	if(registration_id === '1')
	{
		next();
	}
	else
	return res.json({message : "Invalid Registration ID"});
}

//Normal Way
// app.use((req, res, next)=> middleware(req, res,next));
// app.use('/api/v1', supplierRoutes);


app.use(indexRoutes);

//To setup the middleware specifically for a route
app.use('/api/v1', supplierRoutes);
// app.use('/api/v1', verifyToken, supplierRoutes);
app.use('/api/v3',superAdminMiddleware, superAdminRoutes);

// app.use('/api/v1', supplierRoutes);
// app.use('/api/v2', customerRoutes);

app.listen(PORT, () => {
    console.log("Listening!!...");
})

export default middleware;
