const {Router} = require('express')
// const webpush = require('web-push')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = new Router()

// /api/notifications/subscribe
router.post(
  '/subscribe',
  auth,
  async (req, res) => {

    try {
      
      const subscription = req.body.subscription

      await User.findByIdAndUpdate({ _id: req.user.userId }, {
        subscription
      })

      res.json({ message: 'Повідомлення відправлені' })

    } catch (e) {
      res.status(500).json({ message: 'Помилка сервера'})
    }
  }
)


module.exports = router