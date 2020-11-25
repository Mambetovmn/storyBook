const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')


// @desc  Login/login
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    title: 'Login Page',
    layout: 'login'
  })
})

// @desc  Dashboards/dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({user: req.user.id}).lean()
    res.render('dashboard', {
      title: 'Dashboard Page',
      name: req.user.firstName,
      stories
    })
  }catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router