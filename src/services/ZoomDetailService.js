const ZoomDetail = require('../models/ZoomDetail');



exports.saveAccessToken = async (data) => {
    return ZoomDetail.createToken(data);
}


exports.updateAccessToken = async (data,userId) => {
    return ZoomDetail.updateToken(data,userId);
}

exports.findAccessToken = async (userId) => {
    return ZoomDetail.findToken(userId);
}
