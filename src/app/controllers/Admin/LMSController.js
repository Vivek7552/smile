const LMSService = require('../../../services/LMSService');

exports.programs = async (request, response, next) => {
    let programs = await LMSService.getAllPrograms();
    response.render('programs', { title: "Programs", programs: programs });
}

exports.addProgram = async (request, response, next) => {
    await LMSService.createNewProgram(request.body.name);
    response.redirect('/programs');
}

exports.programMonthlyPlans = async (request, response, next) => {
    let monthlyPlans = await LMSService.getMonthlyPlansByProgramId(request.params.program_id);
    response.render('monthlyPlans', { title: "Monthly Plans", program_id: request.params.program_id, monthly_plans: monthlyPlans });
}

exports.addMonthlyPlanToProgram = async (request, response, next) => {
    await LMSService.createNewMonthlyPlan(request.body.name, request.body.programId);
    response.redirect(`/program/${request.body.programId}`);
}

exports.programWeeklyPlans = async (request, response, next) => {
    let weeklyPlans = await LMSService.getWeeklyPlansByMonthlyPlanId(request.params.plan_id);
    response.render('weeklyPlans', {
        title: "Weekly Plans",
        weekly_plans: weeklyPlans,
        plan_id: request.params.plan_id,
        program_id: request.params.program_id
    });

}

exports.addWeeklyPlanToProgram = async (request, response, next) => {
    await LMSService.createNewWeeklyPlan(request.body.name, request.body.programId, request.body.planId);
    response.redirect(`/plans/${request.body.programId}/${request.body.planId}`);
}

exports.weekPlanning = async (request, response, next) => {
    let days = await LMSService.getAllDaysForLMS();
    let weekPlanData = await LMSService.getWeekPlanData(request.params.weekly_plan_id);
    response.render('weekPlanning', {
        title: 'Week Planning',
        weekly_plan_id: request.params.weekly_plan_id,
        days: JSON.stringify(days),
        week_plan_data: JSON.stringify(weekPlanData)
    });
}

exports.uploadFile = async (request, response, next) => {
    response.send(`${process.env.CLOUDFRONT_URL}/${request.file.key}`);
}

exports.saveTaskForTheDay = async (request, response, next) => {
    try {
        await LMSService.removeOldTasks(request.body.weekly_plan_id, request.body.day_id);
        for (task of request.body.data) {
            let taskObj = {
                weekly_plan_id: request.body.weekly_plan_id,
                day_id: request.body.day_id,
                type: task.type,
                level: task.level,
                task: task.task,
                has_attachment: task.attachment == 'NONE' ? 0 : 1
            };
            if (task.attachment == 'FILE') {
                taskObj.attachment_type = task.attachment_data.type;
                taskObj.attachment_url = task.attachment_data.file;
            }
            else if (task.attachment == 'YOUTUBE') {
                taskObj.attachment_type = 'LINK';
                taskObj.attachment_url = task.attachment_data.url;
            }
            taskObj.has_subelements = task.subtasks.length ? 1 : 0;
            let savedTask = await LMSService.createTask(taskObj);
            if (!savedTask)
                throw 500;

            if (taskObj.has_subelements) {
                for (subtask of task.subtasks) {
                    let subtaskObj = {
                        weekly_plan_id: request.body.weekly_plan_id,
                        day_id: request.body.day_id,
                        task_id: savedTask.id,
                        subtask: subtask.task,
                        has_attachment: subtask.file ? 1 : 0,
                        attachment_url: subtask.file ? subtask.file : null
                    };
                    await LMSService.createSubTask(subtaskObj);
                }
            }
        }

        return response.send({ success: true });
    }
    catch (error) {
        return response.send({ success: false });
    }
}