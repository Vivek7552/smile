const StudentService = require('../../../services/StudentService');
const TutorService = require('../../../services/TutorService');
const StudentTutorService = require('../../../services/StudentTutorService');
const TutorProfileResponse = require('../../../resources/tutorProfileResponse');
const AllocateSlots = require('../../../utils/allocateSlots');

exports.students = async (request, response, next) => {
    let students = await StudentService.getAllStudents();
    let tutors = await TutorService.getTutorsForList();
    response.render('students', { title: "Students", students: students, tutors: JSON.stringify(tutors) });
}

exports.tutors = async (request, response, next) => {
    let tutors = await TutorService.getAlltutors();
    response.render('tutors', { title: "Tutors", tutors: tutors });
}

exports.getTutor = async (request, response, next) => {
    let tutor = new TutorProfileResponse(await TutorService.getProfile(request.query.tutor_id)).exec();
    response.status(200).send({ status: true, data: tutor });
}

exports.approveTutor = async (request, response, next) => {
    await TutorService.updateUser({ approved: 1 }, request.params.id);
    await AllocateSlots.allocateSlots(request.params.id)
    response.redirect('/tutors');
}

exports.assignTutor = async (request, response, next) => {
    await StudentTutorService.createAssociation(request.query.student_id,request.query.tutor_id);
    response.redirect('/students');
}