const express = require('express');
const router = express.Router();
const { Task, User, Relation } = require('../models/index.js');
const { Op } = require('sequelize');
const getAllTasksOfUser = require('../services/task.js');
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




module.exports = router;
