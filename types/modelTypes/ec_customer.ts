import {Model} from 'sequelize';

class EcCustomers extends Model {
    public customer_id ?: number;
    public customer_name ?: string;
    public customer_email ?: string;
    public phone_number ?: number;
}

export default EcCustomers;