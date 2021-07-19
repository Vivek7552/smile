let tutorModal = new bootstrap.Modal($_('tutorModal'), {
    keyboard: false, backdrop: true
})

let showTutor = async clickedElement => {
    let tutorData = await axiosGetCall('/ajax/get-tutor', { tutor_id: clickedElement.dataset.tutorid });
    if (tutorData) makeTutorModalHtml(tutorData.data);
}

let makeTutorModalHtml = tutorData => {
    $_('tutorModalHeading').textContent = `${tutorData.first_name} ${tutorData.last_name}`;
    let html = '<div class="fs15">';
    html += `<div class="detailHolder"><b>Email:</b> ${tutorData.email}</div>`;
    html += `<div class="detailHolder mt-5"><b>Contact:</b> ${tutorData.contact || 'N/A'}</div>`;
    html += `<div class="detailHolder mt-5"><b>Age:</b> ${tutorData.age || 'N/A'}</div>`;
    html += `<div class="detailHolder mt-5"><b>Rating:</b> ${tutorData.rating}</div>`;
    html += `<div class="detailHolder mt-5"><b>Gender:</b> ${tutorData.gender || 'N/A'}</div>`;
    html += `<div class="detailHolder mt-5"><b>State of Origin:</b> ${tutorData.state_of_origin || 'N/A'}</div>`;
    html += `<div class="detailHolder mt-5"><b>Studied Igbo formally:</b> ` + (tutorData.studied_formally ? 'Yes' : 'No') + `</div>`;
    if (tutorData.dialects.length) {
        let dialects = '';
        tutorData.dialects.forEach(dialect => { dialects += `${dialect.name}, `; });
        html += `<div class="detailHolder mt-5"><b>Dialects:</b> ${dialects.slice(0, -2)}</div>`;
    }
    html += `</div>`;
    $_('divTutorDetails').innerHTML = html;
    $_('btn-approve').href = `/approve-tutor/${tutorData.id}`;
    if (tutorData.approved) $_('btn-approve').style.display = 'none';
    tutorModal.show();
}