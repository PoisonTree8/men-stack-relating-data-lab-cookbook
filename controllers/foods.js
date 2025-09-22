
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
const currentUser = await User.findById(req.session.user._id);
res.locals.pantry = (currentUser && Array.isArray(currentUser.pantry)) ? currentUser.pantry : [];
res.render('foods/index.ejs');
} catch (error) {
console.log(error);
res.redirect('/');
}
});


router.get('/new', (req,res) => {
    res.render('foods/new.ejs');
})


router.post('/', async (req,res) => {
try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect('/');
}   catch (error) {
    console.log(error);
    res.redirect('/');
}
});

router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);

    if (food) {
      console.log('Food Found');
      food.deleteOne();
      await currentUser.save();
      res.redirect(`/users/${req.params.userId}/foods`);
    } else {
      console.log('Food not found');
      res.redirect(`/users/${req.params.userId}/foods`);
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
}
});


module.exports = router;
