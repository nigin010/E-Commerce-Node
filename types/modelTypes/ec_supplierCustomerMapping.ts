import { ECDH } from 'crypto';
import {Model} from 'sequelize';

class EcSupplierCustomerMapping extends Model {
    public supplier_id ?: number;
    public customer_id ?: number;
}

export default EcSupplierCustomerMapping;