const { Relation, Task, TaskToRelation, GroupTask } = require('../models');
const { Op } = require('sequelize');

async function getAllTasksOfUser(id) {
    try {
        let tasks = await Relation.findAll({
            where: {
                [Op.or]: [
                    { associate_id: id },
                    { mentor_id: id },
                    { captain_id: id }
                ]
            },
            include: [
                {
                    model: TaskToRelation,
                    include: [
                        {
                            model: Task,
                        }
                    ]
                }
            ],
            
            order: [
                [TaskToRelation, 'due_date', 'ASC']
            ]

        });

        tasks = tasks.map(relation => {
            return relation.TaskToRelations.map(taskToRelation => {
                return {
                    as: relation.associate_id === id ? 'associate' : relation.mentor_id === id ? 'mentor' : 'captain',
                    title: taskToRelation.Task.title,
                    description: taskToRelation.Task.description_3 ? taskToRelation.Task.description_3 : taskToRelation.Task.description_2 ? taskToRelation.Task.description_2 : taskToRelation.Task.description_1,
                    //doneable: taskToRelation.done_date === null,
                    due_date: taskToRelation.due_date,
                    done_date: taskToRelation.done_date
                }
            })
        }).flat();

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
                            model: TaskToRelation,
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
                    ]
                }
            ],
            /*
            order: [
                [TaskToRelation, 'due_date', 'ASC']
            ]*/
        });
        //console.log(groupTasks);
        groupTasks = groupTasks.filter(groupTask => groupTask.Tasks && groupTask.Tasks.length > 0);

        let scores = [];
        for (let groupTask of groupTasks) {
            scores.push({
                name: groupTask.name,
                done_tasks: 0,
                total_tasks: groupTask.Tasks && groupTask.Tasks.length ? groupTask.Tasks.length : 0,
            });
            for (let task of groupTask.Tasks) {
                console.log(task.TaskToRelations[0].done_date);
                if (task.TaskToRelations[0].done_date != null) {
                    scores[scores.length - 1].done_tasks++;
                }
            }
        }
        //console.log(scores);
        return scores;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { getAllTasksOfUser, getGroupTasksScoresOfUser };