import EcSuppliers from "../../models/ec_suppliers.ts";

async function findSupplierByRegistrationId(registration_id: string) {
    try {
        const found = await EcSuppliers.findOne({ where: { registration_id: registration_id } });
        return found;
    } catch (error) {
        throw error;
    }
}

export { findSupplierByRegistrationId };
