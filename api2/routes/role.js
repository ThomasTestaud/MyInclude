const express = require('express');
const router = express.Router();
const { Role } = require('../models/index.js');
const { authenticationMiddleware, isAdmin, isHR, canGetCompany, canPostCompany } = require('../middlewares/authorization.js');

router.use(authenticationMiddleware);

router.get('/', isHR, async function (req, res, next) {

  const roles = await Role.findAll({
    order: [['name', 'ASC']],
  });

  res.json(roles);
  
});



module.exports = router;
