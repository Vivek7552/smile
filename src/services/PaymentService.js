const PaymentPlan = require('../models/PaymentPlan');

exports.getPaymentPlans = () => {
    return PaymentPlan.getAllPaymentPlans();
}