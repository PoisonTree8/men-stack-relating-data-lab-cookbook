const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find({});
  res.render('index.ejs', { users });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('show.ejs', { otherUser: user });
});

module.exports = router;