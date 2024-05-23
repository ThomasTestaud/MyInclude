const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Relation, User } = require('../models/index.js');
const { authenticationMiddleware, trueIfAdmin, isHR, canGetCompany } = require('../middlewares/authorization.js');
const getRelationsOfUser = require('../services/relation.js');

router.use(authenticationMiddleware);

router.post('/', isHR, async function (req, res, next) {
  const associate_id = req.body.associate_id;
  const mentor_id = req.body.mentor_id;
  const captain_id = req.body.captain_id;

  // Get the associate's company
  const associate = await User.findOne({
    where: {
      id: associate_id
    }
  });
  const company_id = associate.company_id;

  // Check if the user is either admin or hr of that company
  if (!trueIfAdmin && company_id !== req.user.company_id) { 
    return res.status(401).json("Access denied");
  }

  // Check if the user is already registered as an associate
  const relation = await Relation.findOne({
    where: {
      [Op.or]: [
        { associate_id: associate_id },
      ]
    }
  });
  if (relation) {
    return res.status(400).json("User is already has a mentor and captain");
  }

  // Check if all that 3 users are from the same company
  const associateCompany = await User.findOne({
    where: {
      id: associate_id
    }
  });
  const mentorCompany = await User.findOne({
    where: {
      id: mentor_id
    }
  });
  const captainCompany = await User.findOne({
    where: {
      id: captain_id
    }
  });
  
  if (associateCompany.company_id !== mentorCompany.company_id || associateCompany.company_id !== captainCompany.company_id) {
    return res.status(400).json("Users are not from the same company");
  }

  // Create the relation
  try {
    const newRelation = await Relation.create({
      associate_id: associate_id,
      mentor_id: mentor_id,
      captain_id: captain_id
    });

    const relation = await getRelationsOfUser(associate_id);

    res.json(relation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the relation.' });
  }

});



module.exports = router;
