import { Router, Request, Response} from "express";
import customerRegistration from "../controllers/customerControllers/customerRegistration";
import customerRequest from "../controllers/customerControllers/customerRequest";

const router = Router();

const createCustomer = async(req : Request, res : Response) => {
    customerRegistration(req, res);
}

const customerRequestHandle = async(req : Request, res : Response) => {
    customerRequest(req, res);
}
router.post('/createCustomer',async(req : Request, res : Response) => {
    await createCustomer(req, res);
});

router.post('/customerRequest', async(req : Request, res : Response) => {
    await customerRequestHandle(req, res);
})

export default router;