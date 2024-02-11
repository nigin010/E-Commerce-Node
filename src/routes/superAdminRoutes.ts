import { Router, Request, Response} from "express";
import superAdminAddPlan from "../controllers/superAdminControllers/superAdminAddPlan";

const router = Router();

const addPlan = async(req : Request, res : Response) => {
    superAdminAddPlan(req, res);
}

router.post('/addPlan',async(req : Request, res : Response) => {
    await addPlan(req, res);
});

export default router;