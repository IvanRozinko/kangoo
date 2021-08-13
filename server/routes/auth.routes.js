const {Router} = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = new Router()
const config = require('config')

const isTrainer = phone => phone === config.get('trainerPhone')

// /api/auth/register
router.post(
  '/register', 
  [
    check('phone', 'Невірний номер').isMobilePhone('uk-UA'),
    check('password', 'Мінімальна кількість символів паролю 6 символів').isLength({ min: 6 })
  ],
  async(req, res) => {

    try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Невірні дані реєстрації'
      })
    }

    const { password, phone, size, name } = req.body

    const candidate = await User.findOne({ phone })
    
    if (candidate) {
     return res.status(400).json({ message: 'Такий користувач вже існує :('})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ phone, password: hashedPassword, name, size })

    const createdUser = await user.save();

    const token = jwt.sign(
      { userId: createdUser.id },
      config.get('jwtSecret')
    )

    res.json({ token, userId: user.id, isTrainer: isTrainer(user.phone) })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Помилка сервера' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('phone', 'Введіть корректний номер телефону').isMobilePhone(),
    check('password', 'Введіть пароль').exists()
  ],
  async(req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Невірні дані для входу'
      })
    }

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: 'Користувач не знайден' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Невірний пароль. Спробуйте ще'})
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret')
    )

    res.json({ token, userId: user.id, isTrainer: isTrainer(user.phone) })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server error, try again' })
  }
})

module.exports = router