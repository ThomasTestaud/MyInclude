const express = require('express');
const router = express.Router();
const { GroupTask, Task, User, Relation, TaskToRelation } = require('../models/index.js');
const { Op } = require('sequelize');
const { getAllTasksOfUser, getGroupTasksScoresOfUser } = require('../services/task.js');
const { authenticationMiddleware, isAdmin, isHR, canGetCompany, canPostCompany } = require('../middlewares/authorization.js');

router.use(authenticationMiddleware);

router.post('/:id', isHR, async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    // Get the company_id of the user in param
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const company_id = user.company_id;

    // Check if the user can post a task for the company
    if (req.user.dataValues.role !== 'dev' && req.user.dataValues.company_id !== company_id) {
      return res.status(401).json("Access denied");
    }

    // Get the relations of the user
    const relation = await Relation.findOne({
      where: {
        [Op.or]: [
          { associate_id: id },
        ]
      }
    });

    if (!relation) {
      return res.status(404).json({ message: "No relation found for the user" });
    }

    data.relation_id = relation.id

    // Create a new task
    const task = await Task.create(data);
    if (!task) {
      return res.status(500).json({ message: "Error on creating task" });
    }
    res.json(task);
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }

});

router.get('/group/:id', async (req, res, next) => {
  const company = req.params.id;

  // Verify if the user can get the company
  if (req.user.dataValues.role !== 'dev' && req.user.dataValues.company_id !== company) {
    return res.status(401).json("Access denied");
  }

  // Get the group tasks of the company
  try {
    console.log("Company id = " + company)
    const groupTasks = await GroupTask.findAll({
      where: {
        company_id: company
      }
    });

    res.json(groupTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get('/group/scores/:id', async (req, res, next) => {
  const id = req.params.id;

  // Verify if the user can get the scores
  if (req.user.dataValues.role !== 'dev' && req.user.dataValues.company_id !== id) {
    return res.status(401).json("Access denied");
  }

  // Get the group tasks scores of the user
  try {
    const scores = await getGroupTasksScoresOfUser(id);
    if (!scores) {
      return res.status(500).json({ message: "Error on getting scores" });
    }
    res.json(scores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get('/company/:id', canGetCompany, async (req, res, next) => {
  const company = req.params.id;

  // Get all tasks of the company
  try {
    const data = await GroupTask.findAll({
      where: {
        company_id: company
      },
      include: [
        {
          model: Task,
        }
      ]
    });

    const tasks = [];
    for (let groupTask of data) {
      for (let task of groupTask.Tasks) {
        tasks.push({
          id: task.id,
          title: task.title,
          description_1: task.description_1,
          description_2: task.description_2,
          description_3: task.description_3,
          groupName: groupTask.name,
          groupId: groupTask.id
        });
      }
    }
    const groupTasks = data.map(groupTask => {
      return {
        id: groupTask.id,
        name: groupTask.name
      }
    });

    res.json({
      groupTasks,
      tasks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post('/', canPostCompany, async (req, res, next) => {
  const data = req.body;

  // DO SECURITY HERE

  // Create a new task
  try {
    const task = await Task.create(data);
    if (!task) {
      return res.status(500).json({ message: "Error on creating task" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post('/assign/:id', isHR, async (req, res, next) => {
  const data = req.body;
  const userId = req.params.id;

  // DO SECURITY HERE

  // Assign a task to a user
  try {
    const tasks = await Task.findAll({
      where: {
        id: {
          [Op.in]: data.task_id
        }
      }
    });

    if (!tasks.length) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    const relation = await Relation.findOne({
      where: {
        associate_id: userId
      }
    });

    if (!relation) {
      return res.status(404).json({ message: "Relation not found" });
    }

    const taskToRelation = await Promise.all(tasks.map(task => {
      const newTaskToRelation = {
        task_id: task.id,
        relation_id: relation.id,
        due_date: data.due_date
      };

      return TaskToRelation.create(newTaskToRelation);
    
    }));
    if (!taskToRelation) {
      return res.status(500).json({ message: "Error on assigning tasks" });
    }
    res.json(taskToRelation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});


module.exports = router;
