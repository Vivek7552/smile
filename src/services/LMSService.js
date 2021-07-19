const Program = require('../models/Program');
const ProgramMonthlyPlan = require('../models/ProgramMonthlyPlan');
const ProgramWeeklyPlan = require('../models/ProgramWeeklyPlan');
const ProgramTask = require('../models/ProgramTask');
const ProgramSubtask = require('../models/ProgramSubtask');
const Day = require('../models/Day');
const { Op } = require("sequelize");

exports.getAllDaysForLMS = async () => {
    return await Day.findAll({ where: { id: { [Op.notIn]: [6, 7] } } });
}

exports.getAllPrograms = async () => {
    return await Program.getAllPrograms();
}

exports.createNewProgram = async programName => {
    return await Program.createProgram(programName);
}

exports.getMonthlyPlansByProgramId = async programId => {
    return await ProgramMonthlyPlan.getPlansByProgramId(programId);
}

exports.createNewMonthlyPlan = async (planName, programId) => {
    return await ProgramMonthlyPlan.createMonthlyPlan(planName, programId);
}

exports.getWeeklyPlansByMonthlyPlanId = async monthlyPlanId => {
    return await ProgramWeeklyPlan.getPlansByMonthlyPlanId(monthlyPlanId);
}

exports.createNewWeeklyPlan = async (planName, programId, monthlyPlanId) => {
    return await ProgramWeeklyPlan.createWeeklyPlan(planName, programId, monthlyPlanId);
}

exports.createTask = async taskObj => {
    return await ProgramTask.createNewTask(taskObj);
}

exports.createSubTask = async taskObj => {
    return await ProgramSubtask.createNewSubTask(taskObj);
}

exports.removeOldTasks = async (weeklyPlanId, dayId) => {
    let conditions = { where: { weekly_plan_id: weeklyPlanId, day_id: dayId } };
    await ProgramTask.removeRecords(conditions);
    await ProgramSubtask.removeRecords(conditions);
}

exports.getWeekPlanData = async weeklyPlanId => {
    return await ProgramTask.getPlanDataForTheWeek(weeklyPlanId);
}