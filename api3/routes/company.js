const express = require('express');
const router = express.Router();
const { Company, User } = require('../models/index.js');
const multer = require('multer');
const fs = require('fs').promises;
const sendEmail = require('../utils/mailer.js');

const { authenticationMiddleware, isAdmin, isHR, canGetCompany, canPostCompany } = require('../middlewares/authorization.js');

router.use(authenticationMiddleware);

router.get('/', isAdmin, async function (req, res, next) {

  const companies = await Company.findAll({
    order: [['name', 'ASC']],
  });
  res.json(companies);

});


router.get('/:id', async function (req, res, next) {

  const id = req.params.id;

  if (req.user.dataValues.role !== 'dev' && req.user.dataValues.company_id !== id) {
    return res.status(401).json("Access denied");
  }

  const company = await Company.findByPk(id, {
    include: [{ model: User }]
  });

  if (!company) {
    res.status(404);
    res.json('Not found');
  } else {
    res.json(company);
  }
});


router.post('/', isAdmin, async function (req, res, next) {

  const data = req.body;

  Company.create(data)
    .then((element) => {
      res.json(element);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});


router.post('/avatar/:id', async function (req, res, next) {
  try {
    const id = req.params.id;

    if (req.user.dataValues.role !== 'dev' && (req.user.dataValues.company_id !== id && req.user.dataValues.role !== 'hr')) {
      return res.status(401).json("Access denied");
    }

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const avatar = company.avatar;
    const token = Date.now();
    const filename = `company_${id}_avatar_${token}.png`;

    // If the company already has an avatar that is not the default, delete it
    if (avatar !== 'default_company.png') {
      await fs.unlink(`uploads/companies/${avatar}`);
    }

    // Set up the multer storage outside the route to avoid repetition
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/companies/'); // Set the directory where files should be saved
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

      await Company.update({ avatar: filename }, { where: { id: id } });
      res.json(filename);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

router.post('/create-employee', isAdmin, async function (req, res, next) {

  const data = req.body;
  data.password = Math.random().toString(36).slice(-8);

  const company = await Company.findByPk(data.company_id);

  User.create(data)
    .then((response) => {

      const to = data.email;
      const subject = 'Welcome to MyInclude';
      const text = `Hello ${data.first_name},\n\nWelcome to MyInclude! You have been added to the company ${company.name}. Your login credentials are:\n\nEmail: ${data.email}\nPassword: ${data.password}\n\nPlease log in to your account and change your password.\n\nBest regards,\nMyInclude`;

      try {
        sendEmail(to, subject, text).then((info) => {
          console.log('Email sent:', info.messageId);
          res.json(response);
        });
      } catch (error) {
        console.error('Error sending email:', error);
      }

    })
    .catch((error) => {
      console.log(error)
      res.status(500);
      res.json(error);
    });

});



module.exports = router;
