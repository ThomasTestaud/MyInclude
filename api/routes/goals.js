const express = require('express');
const router = express.Router();
const { GroupTask, Task, User, Relation, TaskToRelation } = require('../models/index.js');
const { Op } = require('sequelize');
const { getAllTasksOfUser, getGroupTasksScoresOfUser } = require('../services/task.js');
const { authenticationMiddleware } = require('../middlewares/authorization.js');

router.use(authenticationMiddleware);



router.get('/', async (req, res, next) => {
 
  const tasks = await getAllTasksOfUser(req.user.id);
  const groupTasks = await getGroupTasksScoresOfUser(req.user.id);

  res.json({ tasks, groupTasks });
});




module.exports = router;
