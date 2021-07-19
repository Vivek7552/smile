const Day = require('../models/Day');



exports.getDays = async () => {
    return Day.getAllDays(['id', 'day']);
}
