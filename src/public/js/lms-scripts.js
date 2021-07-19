let taskcounter = 0;
let emptyTask = {
    attachment_type: null,
    attachment_url: null,
    day_id: 0,
    has_attachment: 0,
    has_subelements: 0,
    level: "",
    task: "",
    type: "",
    weekly_plan_id: 0
};
let emptySubtask = { subtask: '', has_attachment: 0, attachment_url: null };

const addTask = (placeholder, day, taskObj = emptyTask) => {
    let html = prepareEmptyTaskHtml(taskcounter + 1, day, taskObj);
    taskcounter++;
    $_(placeholder).insertAdjacentHTML('beforeend', html);
    activateFileChangeEvents();
    showHideSaveButton(day);
}

const prepareEmptyTaskHtml = (counter, day, taskObj) => {
    let html = ``;
    html += `<div id="taskDiv${counter}" data-counterid="${counter}" class="divTask ${day}">`;
    html += `<label class="fs18">Task</label>`;
    html += `<div class="row mb-10">`;
    html += `<div class="col-md-3">`;
    html += `<label class="color-dimdark">Task type</label>`;
    html += `<select class="form-control" id="taskType${counter}"><option value="LISTEN" ${taskObj.type == 'LISTEN' ? 'selected' : ''}>Listening</option><option value="RECORD" ${taskObj.type == 'RECORD' ? 'selected' : ''}>Record & Send</option>`;
    html += `</select>`;
    html += `</div>`;
    html += `<div class="col-md-3">`;
    html += `<label class="color-dimdark">Task level</label>`;
    html += `<select class="form-control" id="taskLevel${counter}"><option value="NORMAL" ${taskObj.level == 'NORMAL' ? 'selected' : ''}>Normal</option><option value="LEVELUP" ${taskObj.level == 'LEVELUP' ? 'selected' : ''}>Level Up</option>`;
    html += `</select>`;
    html += `</div>`;
    html += `</div>`;
    html += `<textarea class="form-control" rows="5" id="task${counter}">${taskObj.task}</textarea>`;
    html += `<div class="row">`; // main-row
    html += `<div class="col-md-12 attachmentLabel"><label class="color-dimdark">Task Attachment <i class="fas fa-paperclip"></i></label></div>`
    html += `<div class="col-md-5">`; // audio-video-div
    html += `<div class="row">`; // audio-video-div row
    html += `<div class="col-md-6">`;
    html += `<select class="form-control" id="taskFileType${counter}"><option value="AUDIO" ${taskObj.attachment_type == 'AUDIO' ? 'selected' : ''}>Audio</option><option value="IMAGE" ${taskObj.attachment_type == 'IMAGE' ? 'selected' : ''}>Image</option>`;
    html += `</select>`;
    html += `</div>`;
    html += `<div class="col-md-6">`;
    html += `<input type="file" class="form-control file" id="taskFile${counter}">`;
    html += `<i id="taskFile${counter}remove" onclick="removeFile(this)" data-target="taskFile${counter}" class="far fa-times-circle color-red remove-file-icon d-none"></i>`;
    html += `</div>`;
    if (taskObj.attachment_type == 'AUDIO') {
        html += `<div class="col-md-12 mt-15">`;
        html += `<audio controls style="height:35px">`;
        html += `<source src="${taskObj.attachment_url}">`;
        html += `</audio>`
        html += `</div>`;
    }
    else if (taskObj.attachment_type == 'IMAGE') {
        html += `<div class="col-md-12 mt-15">`;
        html += `<img class="w50" src="${taskObj.attachment_url}">`;
        html += `</div>`;
    }
    html += `</div>`; // end audio-video-div row
    html += `</div>`; // end audio-video-div
    html += `<div class="col-md-2 text-center pt-10"><b>OR</b>`; // Or box
    html += `</div>`; // enc Or box
    html += `<div class="col-md-5"><input type="url" id="taskYoutube${counter}" class="form-control" placeholder="Youtube video url" value="${taskObj.attachment_type == 'LINK' ? taskObj.attachment_url : ''}">`; // youtube-url box
    html += `</div>`; // end youtube-url box
    html += `</div>`; // end main-row
    html += `<div class="row">`; // elements row
    html += `<div class="col-md-12 attachmentLabel"><label class="color-dimdark">Task Elements</label></div>`
    html += `<div id="elementsContainer${counter}">`;
    html += `</div>`;
    html += `<div class="col-md-12"><button id="addElementbtn${counter}" class="btn btn-outline-dark btn-sm" onclick="addElement(${counter}, this)" data-subelements="0">Add element</button></div>`;
    html += `</div>`; // end elements row
    html += `</div><hr>`; // end divTask
    return html;
}

const addElement = async (counter, clickedElement, subtaskObj = emptySubtask) => {
    let subElementCount = parseInt(clickedElement.dataset.subelements) + 1;
    html = `<div class="col-md-12 mb-15">`;
    html += `<div class="row">`; // row
    html += `<div class="col-md-5">`;
    html += `<label class="fs12">Subtask</label><input type="text" class="subtask${counter} form-control" id="subtask${counter}-${subElementCount}" value="${subtaskObj.subtask}">`;
    html += `</div>`;
    html += `<div class="col-md-3">`;
    html += `<label class="fs12">Subtask attachment <i class="fas fa-paperclip"></i></label><input type="file" class="subtaskattachment${counter} form-control file" id="subtask${counter}-${subElementCount}attachment">`;
    html += `<i id="subtask${counter}-${subElementCount}attachmentremove" onclick="removeFile(this)" data-target="subtask${counter}-${subElementCount}attachment" class="far fa-times-circle color-red remove-file-icon-with-label d-none"></i>`;
    html += `</div>`;
    if (subtaskObj.has_attachment) {
        html += `<div class="col-md-4 pt-22">`;
        html += `<audio controls style="height:35px">`;
        html += `<source src="${subtaskObj.attachment_url}">`;
        html += `</audio>`
        html += `</div>`;
    }
    html += `</div>`; // end row
    html += `</div>`;
    $_(`elementsContainer${counter}`).insertAdjacentHTML('beforeend', html);
    clickedElement.dataset.subelements = subElementCount;
    activateFileChangeEvents();
}

const activateFileChangeEvents = () => {
    let files = $$_("file");
    files = Array.from(files);
    files.map(element => {
        element.addEventListener("change", () => {
            if (element.files.length) {
                let id = element.getAttribute('id');
                $_(`${id}remove`).classList.remove('d-none');
            }
        });
    });
}

const removeFile = clickedElement => {
    let file = clickedElement.dataset.target;
    $_(file).value = '';
    clickedElement.classList.add('d-none');
}

const showHideSaveButton = day => {
    if ($$_(day).length) $_(`btnSave-${day}`).classList.remove('d-none');
}

const save = async day => {
    loaderOn();
    let data = [], request = {};
    if ($$_(day).length) {
        for (let i = 0; i < $$_(day).length; i++) {
            let taskcounter = $$_(day).item(i).dataset.counterid;
            let task = {};
            task.type = $_(`taskType${taskcounter}`).value;
            task.level = $_(`taskLevel${taskcounter}`).value;
            task.task = $_(`task${taskcounter}`).value;
            task.attachment = 'NONE';
            if ($_(`taskFile${taskcounter}`).files.length) {
                task.attachment = 'FILE';
                task.attachment_data = {
                    type: $_(`taskFileType${taskcounter}`).value,
                    file: await uploadFile(`taskFile${taskcounter}`)
                }
            }
            else if ($_(`taskYoutube${taskcounter}`).value != '') {
                task.attachment = 'YOUTUBE';
                task.attachment_data = {
                    url: $_(`taskYoutube${taskcounter}`).value
                }
            }

            task.subtasks = [];

            if ($$_(`subtask${taskcounter}`).length) {
                for (let j = 0; j < $$_(`subtask${taskcounter}`).length; j++) {
                    let subtask = $$_(`subtask${taskcounter}`).item(j);
                    if (subtask.value != '') {
                        let subtaskId = subtask.getAttribute('id');
                        let subtaskObj = { task: subtask.value };
                        if ($_(`${subtaskId}attachment`).files.length)
                            subtaskObj.file = await uploadFile(`${subtaskId}attachment`);

                        task.subtasks.push(subtaskObj);
                    }
                }
            }
            data.push(task);
        }

        request = { weekly_plan_id: weeklyPlanId, day_id: getDayId(day), data: data };
    }
    let dataSaved = await axiosPostCall('/save-day-tasks', request);
    if (dataSaved.success) alert('Data saved Successfully!');
    else alert('Data count not be saved, Please try again!');
}

const htmlForEditContext = () => {
    for (task of weekPlanData) {
        let dayName = getDayName(task.day_id);
        addTask(`taskPlaceholder${dayName}`, dayName, task);
        if (task.has_subelements) {
            for (subtask of task.ProgramSubtasks) {
                addElement(taskcounter, $_(`addElementbtn${taskcounter}`), subtask);
            }
        }
    }
}

const getDayId = day => {
    day = days.filter(dayObj => dayObj.day == day);
    return day.length ? day[0].id : null;
}

const getDayName = dayId => {
    let day = days.filter(dayObj => dayObj.id == dayId);
    return day.length ? day[0].day : null;
}