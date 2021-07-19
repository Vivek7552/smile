
const PaymentService = require('../../../services/PaymentService');
const responseHandler = require('../../../utils/responderHandler');
const PaymentPlansResponse = require('../../../resources/paymentPlansResponse');

exports.getPaymentPlans = async (request, response, next) => {
    let plans = await PaymentService.getPaymentPlans();
    return responseHandler(request, response, next, true, 2011, PaymentPlansResponse.collection(plans));
}