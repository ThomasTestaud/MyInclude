const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Company, Role } = require('../models/index.js');
const { authenticationMiddleware, isAdmin, isHR, canGetCompany, canPostCompany } = require('../middlewares/authorization.js');
const multer = require('multer');
const getUserData = require('../services/user.js');




router.post('/login', async function (req, res, next) {

  const identifier = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        email: identifier,
      }
    });
    if (!user) {
      console.log('no user')
      res.status(401);
      res.json(false);
    } else {
      const secret = process.env.JWT_SECRET;

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('wrong password')
        res.status(401);
        res.json(false);
      } else {
        const userData = await getUserData(user.id);

        res.json({
          "token": JWT.sign({ id: user.id }, secret, { expiresIn: '2d' }),
          "user": userData
        });
      }
    }
  } catch (error) {
    res.status(500);
    res.json('error on login: ' + error);
  }
});


router.use(authenticationMiddleware);


router.post('/register', isAdmin, function (req, res, next) {

  console.log(req.body)
  const data = req.body;


  User.create(data)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error)
      res.status(500);
      res.json(error);
    });

});

router.get('/refresh-token', async function (req, res, next) {
  
  const secret = process.env.JWT_SECRET;

  res.json({
    "token": JWT.sign({ id: req.user.id }, secret, { expiresIn: '2d' }),
    "user": req.user
  });

});


router.get('/all/:id', isAdmin, async function (req, res, next) {
  const id = req.params.id;
  try {
    const users = await User.findAll({
      include: {
        model: Role
      },
      where: {
        [Op.or]: [
            { company_id: id },
        ]
    }
    });

    res.json(users);
  } catch (error) {
    res.status(500);
    res.json('error on getting users: ' + error);
  }

});



router.post('/avatar/:id', async function (req, res, next) {

  let auth = true;
  if (req.user.id !== Number(req.params.id) && req.user.Role.name !== 'dev') {
    auth = false;
  }
  console.log(req.user.role)
  if (req.user.role === 'hr') {
    const company = await Company.findByPk(req.user.company_id);
    console.log(company.id === req.user.company_id)
    console.log(company.id, req.user.company_id)
    if (company.id === req.user.company_id) {
      auth = true;
    } else {
      auth = false;
    }
  }
  if (!auth) {
    return res.status(403).json("Access denied");
  }

  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const avatar = user.avatar;
    const token = Date.now();
    const filename = `user_${id}_avatar_${token}.png`;

    // If the user already has an avatar that is not the default, delete it
    if (avatar !== 'default_user.png') {
      await fs.unlink(`uploads/users/${avatar}`);
    }

    // Set up the multer storage outside the route to avoid repetition
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/users/'); // Set the directory where files should be saved
      },
      filename: (req, file, cb) => {
        const id = req.params.id;
        cb(null, filename); // Set the file name
      }
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Not an image! Please upload only images.'), false);
        }
      },
    }).single('photo');

    upload(req, res, async (err) => {
      if (err) {
        console.log('Upload error:', err);
        return res.status(400).json({ message: 'Error uploading file. Please ensure it is an image and does not exceed 5MB.' });
      }

      await User.update({ avatar: filename }, { where: { id: id } });
      res.json(filename);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});








router.patch('/', function (req, res, next) {

  const { first_name, last_name, email, password } = req.body;

  User.update({ first_name, last_name, email, password }, {
    where: {
      id: req.user.id
    }
  }).then(() => {
    res.json('User updated');
  }).catch((error) => {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409);
      res.json('username or email already in use');
    } else {
      res.status(500);
      res.json('error on updating user: ' + error);
    }
  });

});

module.exports = router;
