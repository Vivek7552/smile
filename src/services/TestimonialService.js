const Testimonial = require('../models/Testimonial');



exports.getTestimonials = async () => {
    return Testimonial.getTestimonials(['id', 'name','link']);
}
