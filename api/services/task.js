const { Relation, Task } = require('../models');
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
                    title: task.title_1,
                    description: task.description_1,
                    doneable: task.doneable,
                    due_date: task.due_date,
                }
            } else if (task.Relation.mentor_id === id) {
                return {
                    as: 'mentor',
                    title: task.title_2 ? task.title_2 : task.title_1,
                    description: task.description_2 ? task.description_2 : task.description_1,
                    doneable: task.doneable,
                    due_date: task.due_date,
                }
            } else if (task.Relation.captain_id === id) {
                return {
                    as: 'captain',
                    title: task.title_3 ? task.title_3 : task.title_2 ? task.title_2 : task.title_1,
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

module.exports = getAllTasksOfUser;