import {Model} from 'sequelize';

class EcSuperAdmin extends Model {
    public subscription_plan_id ?: number;
    public subscription_plan_name ?: string;
    public subscription_fee ?: number;
    public number_of_customers ?: number;
}

export default EcSuperAdmin;