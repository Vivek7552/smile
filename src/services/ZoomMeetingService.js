const ZoomMeetingDetail = require('../models/ZoomMeetingDetail');



exports.saveMeetingDetails = async (data) => {
    return ZoomMeetingDetail.saveMeeting(data);
}

exports.findMeetings = async (tutor_id,day_id,meeting_date) => {
    return ZoomMeetingDetail.findMeetings(tutor_id,day_id,meeting_date);
}
