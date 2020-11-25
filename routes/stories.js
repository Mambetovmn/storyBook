const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')


// @desc  Login/login
// @route GET /
router.get('/stories/add', ensureAuth, (req, res) => {
  res.render('stories/add', {
    title: 'Add stories',
  })
})

// @desc  Process add form
// @route GET /stories
router.post('/stories', ensureAuth, async (req, res) => {
  try{
    req.body.user = req.user.id
    await Story.create(req.body)
    res.redirect('/dashboard')
  }catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


module.exports = router