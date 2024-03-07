const express = require('express');
const router = express.Router();
const { User, Role } = require('../models/index.js');
const { getAllTasksOfUser, getGroupTasksScoresOfUser } = require('../services/task.js');
const getRelationsOfUser = require('../services/relation.js');
const getUserData = require('../services/user.js');
const { authenticationMiddleware, isAdmin, isHR, canGetCompany, canPostCompany  } = require('../middlewares/authorization.js');

router.use(authenticationMiddleware);

router.get('/:id', async function (req, res, next) {

  const id = req.params.id;
  
  if (req.user.dataValues.role !== 'dev' && req.user.dataValues.company_id !== id) {
    return res.status(401).json("Access denied");
  }

  const user = await getUserData(id);
  const relations = await getRelationsOfUser(user.id);
  const tasks = await getAllTasksOfUser(user.id);
  const scores = await getGroupTasksScoresOfUser(user.id);
  
  if (!relations) {
    return res.status(500).json("Error on getting relations");
  }
  if (!user) {
    return res.status(500).json("Error on getting user");
  }

  res.json({
    user: user,
    relations: relations,
    tasks: tasks,
    scores: scores
  });
  
});




module.exports = router;
