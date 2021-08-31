const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const webpush = require('web-push')
const router = new Router()
const Training = require('../models/Training')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const { config } = require('../config/index')


// /api/training

router.get(
  '/',
  auth,
  async (req, res) => {

    try {

      const trainings = await Training
        .find(
          {
            datetime: { $gt: Date.now()}
          })
        .sort({ datetime: 'asc' })
      res.json(trainings)

    } catch (e) {
      res.status(500).json({ message: 'Помилка сервера '})
    }
})


// /api/training/my

router.get(
  '/my',
  auth,
  async (req, res) => {

    try {

      const user = await User.findById(req.user.userId);
      const trainings = await Training
        .find(
          {
            _id: { $in: user.history},
            datetime: { $gt: Date.now()}
          })
        .sort({ datetime: 'asc' })

      res.json(trainings)

    } catch (e) {
      res.status(500).json({ message: 'Помилка сервера '})
    }
})

// /api/training/create

router.post(
  '/create',
   auth,
   [
     check('datetime', 'Невірна дата').not().isEmpty(),
     check('location', 'Невірна локація').not().isEmpty()
   ],
   async (req, res) => {

    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Невірні дані тренування'
        })
      }

      const{ datetime, location, members, notify } = req.body

      const existingTraining = await Training.findOne({ datetime })
    
      if (existingTraining) {
        return res.status(400).json({ message: 'Цей час вже зайнятий'})
      }

      const training = new Training ({ datetime, location })
      await training.save();

      res.json({ message: 'Тренування створене '})

      if (notify) {
        const users = await User.find({ _id: { $in: members } })

        const notification = {
          title: 'Додано тренування',
          body: {
            datetime,
            location,
            url: `${config.baseUrl}/training/${training._id}`
          }
        }

        users.forEach(user => {
          webpush.sendNotification(user.subscription, JSON.stringify(notification))
        })

      }

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Помилка сервера'})
    }
   }
  )

  // /api/training/update

router.post(
  '/update',
   auth,
   [
     check('datetime', 'Невірна дата').not().isEmpty(),
     check('location', 'Невірна локація').not().isEmpty()
   ],
   async (req, res) => {

    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Невірні дані тренування'
        })
      }

      const{ datetime, location, members, _id } = req.body

      await Training.findByIdAndUpdate({ _id }, {
        datetime,
        location,
        members
      })

      res.json({ message: 'Тренування оновлено'})

    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера'})
    }
   }
  )

  // /api/training/tohistory

  router.post(
    '/tohistory',
    auth,
    async (req, res) => {
      try {
        
        const user = await User.findById(req.user.userId)
        const training = await Training.findById(req.body.id)

        if (user.history.includes(req.body.id)) {
          return res.status(400).json({ message: 'Це тренування вже додано' })
        }

        training.members.push(req.user.userId)
        user.history.push(req.body.id)

        await training.save()
        await user.save()

        res.json({ message: 'Тренування додано'})

      } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Помилка сервера'})
      }
    }
  )

  // /api/training/unschedule

  router.post(
    '/unschedule',
    auth,
    async (req, res) => {
      try {

        await User.findOneAndUpdate({ _id: req.user.userId }, {
          $pull: {
            history: req.body.id
          }
        })

        await Training.findOneAndUpdate({ _id: req.body.id }, {
          $pull: {
            members: req.user.userId
          }
        })

        res.json({ message: 'Участь скасована' })

      } catch (e) {
         res.status(500).json({ message: 'Помилка сервера'})
      }
    }
  )

  // /api/training/:id 

  router.get(
    '/:id',
    auth,
    async (req, res) => {
      try {
        
        res.json( await Training.findById(req.params.id))

      } catch (error) {
        res.status(500).json({ message: 'Помилка сервера'})
      }
    }
  )

  // /api/training/delete 

  router.post(
    '/delete',
    auth,
    async (req, res) => {

      try {
        
        await Training.findByIdAndDelete(req.body.id)

        res.json({ message: 'Тренування видалено'})

      } catch (e) {
        res.status(500).json({ message: 'Помилка сервера'})
      }
    }
  )

module.exports = router