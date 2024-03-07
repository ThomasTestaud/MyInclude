const { Relation, Task, GroupTask } = require('../models');
const { Op } = require('sequelize');

async function getAllTasksOfUser(id) {
    try {
        let tasks = await Task.findAll({
            include: [
                {
                    model: Relation,
                    where: {
                        [Op.or]: [
                            { associate_id: id },
                            { mentor_id: id },
                            { captain_id: id }
                        ]
                    }
                }
            ],
            order: [
                ['due_date', 'ASC']
            ]

        });

        tasks = tasks.map(task => {
            if (task.Relation.associate_id === id) {
                return {
                    as: 'associate',
                    title: task.title,
                    description: task.description_1,
                    doneable: task.doneable,
                    due_date: task.due_date,
                }
            } else if (task.Relation.mentor_id === id) {
                return {
                    as: 'mentor',
                    title: task.title,
                    description: task.description_2 ? task.description_2 : task.description_1,
                    doneable: task.doneable,
                    due_date: task.due_date,
                }
            } else if (task.Relation.captain_id === id) {
                return {
                    as: 'captain',
                    title: task.title,
                    description: task.description_3 ? task.description_3 : task.description_2 ? task.description_2 : task.description_1,
                    doneable: task.doneable,
                    due_date: task.due_date,
                }
            }
        });

        return tasks;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getGroupTasksScoresOfUser(id) {
    try {
        let groupTasks = await GroupTask.findAll({
            include: [
                {
                    model: Task,
                    include: [
                        {
                            model: Relation,
                            where: {
                                [Op.or]: [
                                    { associate_id: id },
                                ]
                            }
                        }
                    ]
                }
            ],
            order: [
                [Task, 'due_date', 'ASC']
            ]
        });
        console.log(groupTasks);
        groupTasks = groupTasks.filter(groupTask => groupTask.Tasks && groupTask.Tasks.length > 0);

        let scores = [];
        for (let groupTask of groupTasks) {
            scores.push({
                done_tasks: 0,
                total_tasks: groupTask.Tasks && groupTask.Tasks.length ? groupTask.Tasks.length : 0,
            });
            for (let task of groupTask.Tasks) {
                if (task.done_date != null) {
                    scores[scores.length - 1].done_tasks++;
                }
            }
        }
        console.log(scores);
        return scores;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { getAllTasksOfUser, getGroupTasksScoresOfUser };