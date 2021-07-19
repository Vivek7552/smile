let studentModal = new bootstrap.Modal($_('studentModal'), {
    keyboard: false,
    backdrop: true
})

let showStudent = async clickedElement => {
    console.log(clickedElement.dataset.studentid)
    const student_id = clickedElement.dataset.studentid
    makestudentTutorModalHtml(student_id);
}

let makestudentTutorModalHtml = (student_id) => {
    $_('studentTutorModalHeading').textContent = `Assign Tutor`;
    let html = `<div class="fs15">`;
    html += `<select class='form-select' aria-label="Default select example" id="tutorDropdown">
    <option selected disabled value='-1'>Select Tutor</option>`
    let Tutors = JSON.parse(tutorList);
    for (i = 0; i < Tutors.length; i++) {
        html += `<option value="${Tutors[i].id}">${Tutors[i].first_name} ${Tutors[i].last_name}</option>`
    }
    html += `</select>`
    html += `</div>`
    $_('divStudentTutorDetails').innerHTML = html;
    $_('btn-assign').onclick = function () {
        const tutor_id = $_('tutorDropdown').value;
        if (tutor_id == '-1') {
            alert('Please select a tutor');
        } else {
            $_('btn-assign').href = `/assign-tutor?student_id=${student_id}&tutor_id=${tutor_id}`;
        }
    };
    studentModal.show();
}