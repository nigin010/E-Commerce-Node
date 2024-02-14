import  {Router, Request, Response} from 'express';
import importResetPassword from '../controllers/authentication/resetPassword.ts';
import importProfile from '../controllers/supplierControllers/supplierProfile.ts';
import subscriptionPlanProfilerImport from '../controllers/supplierControllers/subscriptionPlanProfiler.ts';
import supplierInvite from '../controllers/supplierControllers/supplierInvite.ts';

const router = Router();

const profile = async(req : Request,res : Response) => {
	importProfile(req, res);
}

const resetPassword = async (req : Request,res : Response) => {
	importResetPassword(req, res);
}

const subscriptionPlanList = async(req : Request, res : Response) => {
	subscriptionPlanProfilerImport(req, res);
}

const supplierInviting = async(req : Request, res : Response) => {
	supplierInvite(req, res);
}
 
router.get('/profile', async(req: Request, res: Response) => {
	await profile(req, res);
});
 
router.patch('/resetPassword', async(req: Request, res: Response) => {
	await resetPassword(req, res);
});

router.get('/getSubscriptionPlans', async(req : Request, res : Response) => {
	await subscriptionPlanList(req, res);
});

router.post('/supplierInvite', async(req : Request, res : Response) => {
	await supplierInviting(req, res);
});

export default router;