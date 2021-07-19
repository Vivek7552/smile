const StudentTutor = require('../models/StudentTutorAssociation');


exports.createAssociation = async (student_id, tutor_id) => {
    const studentExists = await StudentTutor.findStudentById(student_id);
    if(!studentExists)
    StudentTutor.createAssociationDetails(student_id, tutor_id);
    else
    StudentTutor.updateAssociationDetails(student_id, tutor_id);
}

exports.findTutorByStudentId = async (student_id) => {
    return  await StudentTutor.findAllocatedTutor(student_id);
}