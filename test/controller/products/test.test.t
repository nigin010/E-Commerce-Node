import sinon, { SinonSpy } from 'sinon';
import superAdminAddPlan from '../../../src/controllers/superAdminControllers/superAdminAddPlan';
import {Request, Response} from 'express';
import supplierProfile from '../../../src/controllers/supplierControllers/supplierProfile';

//---------------------------COMMENT SECTION 1 BEGINS HERE--------------------------------



//Generally all the tests will run.
//If we give "it.only", only that function will run
//if we give "it.skip", that function will be skipped

// describe("random group for tests", () => {
//     let number = 2;

//     beforeEach(()=>{
//         number = 2;
//     })
//     afterEach(()=>{
//         number = 2;
//     })
    
//     it("random test", () => {
//         sinon.assert.match(2, number);
//     });
    
//     it.skip("random string", () => {
//         sinon.assert.match(number,3);
//     })
// })


//---------------------------COMMENT SECTION 1 ENDS HERE----------------------------------

let req : Partial<Request> = {
   
    body:{
        registration_id:"2342323",
    }
}

// let req : Partial<Request>;

let jsonSpy = sinon.spy();
let statusStub = sinon.stub();

let res : Partial<Response>= {
    status: statusStub,
    json : jsonSpy,
}

describe("testing supplierProfile",() => {
    
    let supplierProfileSpy : SinonSpy;

    beforeEach( () => {
        supplierProfileSpy = sinon.spy(supplierProfile);
    });

    afterEach( () => {
        sinon.reset();
    });

    it("registration_id not found", async() => {
        await supplierProfileSpy(req, res);
        // delete req.query.supplier_reg_id;
        // delete req.body.subscription_plan_id;
        sinon.assert.called(supplierProfileSpy);
        sinon.assert.calledWith(supplierProfileSpy,req,res)
        sinon.assert.calledWith(jsonSpy, {error : 'reg ID required in the Request'})
    })

    
})
