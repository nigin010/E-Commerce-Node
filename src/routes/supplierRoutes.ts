import  {Router, Request, Response} from 'express';
import importResetPassword from '../controllers/authentication/resetPassword.ts';
import importProfile from '../controllers/supplierControllers/supplierProfile.ts';

const router = Router();

const profile = async(req : Request,res : Response) => {
	importProfile(req, res);
}

const resetPassword = async (req : Request,res : Response) => {
	importResetPassword(req, res);
}
 
router.get('/profile', async(req: Request, res: Response) => {
	await profile(req, res);
});
 
router.patch('/resetPassword', async(req: Request, res: Response) => {
	await resetPassword(req, res);
});

export default router;