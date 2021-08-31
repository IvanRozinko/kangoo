const {Router} = require('express')
const router = new Router()
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')



// /api/users

router.get(
  '/',
  auth,
  async(req, res) => {
    try {
        
      const users = await User.find({})
      res.json(users)

    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера'})
    }   
  }
)

// /api/users/user

router.get(
  '/user',
  auth,
  async(req, res) => {
    try {
        
      const user = await User.findById(req.user.userId)

      res.json(user)

    } catch (e) {
      res.status(500).json({ message: 'Помилка сервера'})
    }   
  }
)

// /api/users/update

router.post(
  '/update',
  auth,
  async (req, res) => {
    try {

    await User.findOneAndUpdate({ _id: req.user.userId }, {
        allowNotifications: req.body.allowNotifications
      })

    res.json({ message: 'Дані користувача оновлено' })

    } catch (e) {
      res.status(500).json({ message: 'Помилка сервера'})
    }
  }
  )

module.exports = router

   