const StateOfOrigin = require('../../../models/StateOfOrigin');
const Dialect = require('../../../models/Dialect');
const Day = require('../../../models/Day');
const TestimonialService = require('../../../services/TestimonialService');
const responseHandler = require('../../../utils/responderHandler');
const { Op } = require("sequelize");

exports.getMasterData = async (request, response, next) => {
    let responses = {};
    responses.state_of_origins = await StateOfOrigin.findAll();
    responses.dialects = await Dialect.findAll();
    responses.days = await Day.findAll({ where:{id: { [Op.ne]: 8}},attributes:[['id','day_id'],'day']});
    return responseHandler(request, response, next, true, 2011, responses);
}


exports.getAllTestimonials = async (request, response, next) => {
    const testimonials = await TestimonialService.getTestimonials();
    return responseHandler(request, response, next, true, 2022, testimonials);
}