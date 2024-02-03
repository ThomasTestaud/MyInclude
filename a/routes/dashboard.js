const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, UserToUser } = require('../models/index.js');
const auth = require('../middlewares/authorization.js');
const { getParentsOfUser, getChildrensOfUser } = require('../services/userToUser.js');


router.use(auth);

router.get('/', auth, async function (req, res, next) {

  const user = req.user;
  const parent = await getParentsOfUser(user.id);
  const children = await getChildrensOfUser(user.id);

  res.json({
    user: req.user,
    parent: parent,
    children: children
  });
  
});




module.exports = router;
