import { Router, Request, Response} from "express";
import addProducts from "../controllers/productControllers/addProduct";
import {viewProducts, sortedProducts, searchProducts, filterProducts} from "../controllers/productControllers/viewProducts";

const router = Router();

const addProductController = async(req : Request, res : Response) => {
    addProducts(req, res);
}

const viewProductsController = async(req : Request, res : Response) => {
    viewProducts(req, res);
}

const sortedPRoductsController = async(req : Request, res :Response) => {
    sortedProducts(req, res);
}

const searchProductsController = async(req : Request, res : Response) => {
    searchProducts(req, res);
}

const filterProductsController = async(req : Request, res : Response) => {
    filterProducts(req, res);
}
router.post('/addProduct',async(req : Request, res : Response) => {
    await addProductController(req, res);
});

router.get('/viewProduct', async(req : Request, res : Response) => {
    await viewProductsController(req, res);
});

router.get('/sortProduct', async(req : Request, res : Response) => {
    await sortedPRoductsController(req, res);
}) ;

router.get('/searchProduct', async(req : Request, res : Response) => {
    await searchProductsController(req, res);
});

router.get('/filterProduct', async(req : Request, res : Response) => {
    await filterProductsController(req, res);
});

export default router;