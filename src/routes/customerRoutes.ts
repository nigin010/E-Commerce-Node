import { Router, Request, Response} from "express";
import customerRegistration from "../controllers/customerControllers/customerRegistration";
import customerRequest from "../controllers/customerControllers/customerRequest";
import multer, {Multer} from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage : storage});

const createCustomer = async(req : Request, res : Response) => {
    customerRegistration(req, res);
}

const customerRequestHandle = async(req : Request, res : Response) => {
    customerRequest(req, res);
}
router.post('/createCustomer', upload.single("profile_pic"), async(req : Request, res : Response) => {
    await createCustomer(req, res);
});

router.post('/customerRequest', async(req : Request, res : Response) => {
    await customerRequestHandle(req, res);
})

export default router;