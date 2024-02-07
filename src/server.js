const express = require('express');
const app = new express();
const PORT = 3000;

const sequelize = require('./config/sequelize-config.js');
const ec_suppliers = require('./models/ec_suppliers.js');
sequelize.sync({ force: false })
	.then(() => {
		console.log("Database Synced");
	})
	.catch((error) => {
		console.error("Error syncing Database", error);
	});


app.use(express.json());

const supplierRegistration = async (req,res) =>{
    try{
        const {full_name, e_mail, password, profile_pic} = req.body;

        if(!full_name)
            return res.status(422).send("Enter some Value in the Name Field ");
        if(!e_mail)
            return res.status(422).send("Email Field is Empty");
        if(!password)
            return res.status(422).send("Password Field is Empty");
		if(!profile_pic)
			return res.status(422).send("Profile Picture Field is Empty");
		
			const newSupplier = await ec_suppliers.create({
            full_name: full_name,
            e_mail: e_mail,
            password: password,
            profile_pic: profile_pic
        },{raw: true});
		
        return res.status(200).send(`New Supplier Has Been Registerd.\nSupplier Details\nRegistration ID :${newSupplier.registration_id}\nFull Name :${newSupplier.full_name}\nEmail :${newSupplier.e_mail}`);
 
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
   
 
}

const login = async (req, res) => {
	try {
		const {e_mail, password, user_type} = req.body;

		if(!e_mail)
            return res.status(422).send("Email Field is Empty");
        if(!password)
            return res.status(422).send("Password Field is Empty");
		if(!user_type)
			return res.status(422).send("Specify the Type of User");

		const found = await ec_suppliers.findOne({where:{e_mail : e_mail, password : password}, raw : true});

		if(found != null)
			return res.status(200).send(`Supplier successfully logged in. \n Supplier ID : ${found.registration_id}`);
		else
			return res.status(404).send("Incorrect Username or Password");
	}catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

const profile = async(req, res) => {
	const {registration_id, user_type} = req.body;

	if(!registration_id)
		return res.status(422).send("ID Field is Empty");
	if(!user_type)
		return res.status(422).send("User Type Field is Empty");

	const found = await ec_suppliers.findOne({where : {registration_id : registration_id}});

	if(found != null)
	{
		return res.status(200).send(`Supplier Profile\nUser Name : ${found.full_name}\nE Mail : ${found.e_mail}\nProfile Picture : ${found.profile_pic}\nRegistration ID: ${found.registration_id}\nRegistration Time : ${found.registration_time_stamp}`);
	}
	else
		return res.status(404).send('Invalid Credentials');
}

const patch = async (req,res) => {
	const {e_mail, user_type, new_password} = req.body;

	if(!e_mail)
		return res.status(422).send("Email Field is Empty!");
	if(!user_type)
		return res.status(422).send("Type of User is not Defined!");
	if(!new_password)
		return res.status(422).send("New Password Field is Empty");

	const result = await ec_suppliers.update({ password : new_password },{where : {e_mail : e_mail}});
	
	if(result != null)
		return res.status(200).send("Password has been Successfully changed!");
	else
		return res.status(404).send("Invalid Email!");
	
}
 
app.post('/supplierRegistration', async (req,res) =>{
    await supplierRegistration(req,res);
});

app.post('/login', async(req, res) => {
	await login(req, res);
});

app.get('/profile', async(req, res) => {
	await profile(req, res);
});
 
app.post('/patch', async(req, res) => {
	await patch(req, res);
});

app.listen(PORT, () => {
    console.log("Listening!!...");
})