const TutorSlotService = require('../../../services/TutorSlotService');
const responseHandler = require('../../../utils/responderHandler');
const SlotResponse = require('../../../resources/slotResponse');
const StudentTutorService = require('../../../services/StudentTutorService');
const DayService = require('../../../services/DayService');
const StoredProcedure = require('../../../utils/storedProcedure');
const customAxios = require('../../../utils/checkTokenExpiry');
const ZoomDetailService = require('../../../services/ZoomDetailService');
const StudentService = require('../../../services/StudentService');
const ZoomMeetingService = require('../../../services/ZoomMeetingService');
const SlotService = require('../../../services/SlotService');
const axios = require('axios');
const moment = require('moment')

exports.getSlots = async (request, response, next) => {
    try {
        let slots = [];
        let days = await DayService.getDays({
            attributes: ['id', 'day']
        });
        for (let day of days) {
            let records = await StoredProcedure('Tutor_getAvailableSlots(:tutorId, :dayId)', {
                tutorId: request.user.userId,
                dayId: day.id
            });
            records = SlotResponse.collection(records);
            let obj = {
                "day_id": day.id,
                "day": day.day,
                "slots": records
            }
            slots.push(obj)
        }

        return responseHandler(request, response, next, true, 2019, slots);
    } catch (error) {
        next(error);
    }
}

exports.getAvailableSlots = async (request, response, next) => {
    try {
        const tutorDetails = await StudentTutorService.findTutorByStudentId(request.user.userId)
        if (!tutorDetails)
            return responseHandler(request, response, next, true, 1010, {});

        const day_id = request.query.day_id
        const current_date = moment().format('YYYY-MM-DD')
        const tutor_id = tutorDetails.tutor_id
        const slot = await ZoomMeetingService.findMeetings(tutor_id, day_id, current_date)

        let records = await StoredProcedure('Tutor_getAvailableSlots(:tutorId, :dayId)', {
            tutorId: tutor_id,
            dayId: day_id
        });
        records = SlotResponse.collection(records);
        if (slot.length >= 1) {
            slot.map(el => {
                records = records.filter(obj => {
                    if (obj.id == el.slot_id)
                        obj.available_for_booking = false
                    return obj;
                })
            })
        }
        let obj = {
            "day_id": day_id,
            "slots": records
        }
        return responseHandler(request, response, next, true, 2020, obj);
    } catch (error) {
        next(error);
    }
}

exports.updateSlots = async (request, response, next) => {
    try {

        let data = request.body
        data.map(async (element) => {
            await TutorSlotService.updateSlots(request.user.userId, element.slots, element.day_id);
        })
        return responseHandler(request, response, next, true, 2021, {});
    } catch (error) {
        next(error);
    }
}


exports.authorizeZoom = async (request, response, next) => {
    try {
        if (!request.query.code)
            return responseHandler(request, response, next, true, 1012, {});

        let userId
        if (request.query.state) {
            let bufferObj = Buffer.from(request.query.state, "base64");
            let decodedString = bufferObj.toString("utf8");
            userId = decodedString
        }
        var config = {
            method: 'post',
            url: `https://zoom.us/oauth/token?code=${request.query.code}&grant_type=authorization_code`,
            headers: {
                'Authorization': 'Basic ' + process.env.ZOOM_API_KEY
            }
        };
        const responseDetails = await axios(config);

        let data = {
            id: userId,
            access_token: responseDetails.data.access_token,
            refresh_token: responseDetails.data.refresh_token
        }
        await ZoomDetailService.saveAccessToken(data)
        return responseHandler(request, response, next, true, 2027, {});
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}

exports.createMeeting = async (request, response, next) => {
    try {
        const userId = request.user.userId
        const zoomDetails = await StudentService.getZoomDetails(userId);

        const slotDetails = await SlotService.getSlot(request.body.slot_id);
        var utcStart = new moment.utc(`${request.body.meeting_date} ${slotDetails.start_time}`, "YYYY-MM-DD HH:mm");
        const start_time = utcStart.format();

        var data = {
            "topic": "OBODO meeting",
            "type": 2,
            "settings": {
                "join_before_host": true,
                "jbh_time": 5,
                "start_time": start_time,
                "duration": "60"
            }
        }
        var config = {
            method: 'post',
            url: `https://api.zoom.us/v2/users/me/meetings`,
            headers: {
                'Authorization': 'Bearer ' + zoomDetails.ZoomDetail.access_token
            },
            data: data,
            optional: zoomDetails.ZoomDetail.refresh_token,
            userId: userId
        };
        const responseDetails = await customAxios(config);
        // console.log("=====Zoom Meeting=====", responseDetails.data)
        //save in db
        const tutorDetails = await StudentTutorService.findTutorByStudentId(userId)
        let meeting_data = {
            tutor_id: tutorDetails.tutor_id,
            student_id: userId,
            meeting_id: responseDetails.data.id,
            start_url: responseDetails.data.start_url,
            join_url: responseDetails.data.join_url,
            day_id: request.body.day_id,
            slot_id: request.body.slot_id,
            meeting_date: request.body.meeting_date,
        }
        await ZoomMeetingService.saveMeetingDetails(meeting_data)
        return responseHandler(request, response, next, true, 2028, {});
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}


exports.studentMeetingList = async (request, response, next) => {
    try {
        const userId = request.user.userId
        const startdate = moment().format('YYYY-MM-DD');
        const enddate = moment(startdate).add(6, 'days').format('YYYY-MM-DD')

        let result = await StoredProcedure('Student_Meeting_List(:student_id, :start_date, :end_date)', {
            student_id: userId,
            start_date: startdate,
            end_date: enddate
        });
        let unique_dates = [...new Set(result.map(item => item.meeting_date))];
        let meeting_list = [];

        unique_dates.map(meeting_date => {
            result.map(meeting => {
                if (meeting_date == meeting.meeting_date) {
                    let meetingIndex
                    const found = meeting_list.some((el, index) => {
                        meetingIndex = index;
                        return el.meeting_date == meeting.meeting_date
                    });

                    if (found)
                        meeting_list[meetingIndex].meetings.push(meeting)
                    else {
                        let obj = {
                            "meeting_date": meeting.meeting_date,
                            "meetings": [meeting]
                        }
                        meeting_list.push(obj)
                    }
                }
            })
        })
        return responseHandler(request, response, next, true, 2029, meeting_list);
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}

exports.tutorMeetingList = async (request, response, next) => {
    try {
        const userId = request.user.userId
        const startdate = moment().format('YYYY-MM-DD');
        const enddate = moment(startdate).add(6, 'days').format('YYYY-MM-DD')

        let result = await StoredProcedure('Tutor_Meeting_List(:tutor_id, :start_date, :end_date)', {
            tutor_id: userId,
            start_date: startdate,
            end_date: enddate
        });
        let unique_dates = [...new Set(result.map(item => item.meeting_date))];
        let meeting_list = [];

        unique_dates.map(meeting_date => {
            result.map(meeting => {
                if (meeting_date == meeting.meeting_date) {
                    let meetingIndex
                    const found = meeting_list.some((el, index) => {
                        meetingIndex = index;
                        return el.meeting_date == meeting.meeting_date
                    });

                    if (found)
                        meeting_list[meetingIndex].meetings.push(meeting)
                    else {
                        let obj = {
                            "meeting_date": meeting.meeting_date,
                            "meetings": [meeting]
                        }
                        meeting_list.push(obj)
                    }
                }
            })
        })
        return responseHandler(request, response, next, true, 2030, meeting_list);
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}