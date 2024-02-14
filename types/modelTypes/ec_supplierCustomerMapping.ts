import {Model} from 'sequelize';

class EcSupplierCustomerMapping extends Model {
    public supplier_id ?: number;
    public customer_id ?: number;
    public invite_status ?: string;
    public createdAt ?: Date;
    public updatedAt ?: Date;
}

export default EcSupplierCustomerMapping;