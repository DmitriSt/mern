const {Router} = require('express')
const bcryptjs = require('bcryptjs') // secret password
const jwt = require('jsonwebtoken')
const config = require('config') // for database
const {check, validationResult} = require('express-validator') // for form validation
const User = require('../models/User') // import schema
const router = Router() // for routers from express

// /api/auth/register
router.post(
  '/register', 
  [
    check('email', 'Некорректный email').isEmail(), // valid for email
    check('password', 'Минимальная длинна пароля 6 символов')
      .isLength({min: 6}) // valid for pass
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) { // if has errors
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const {email, password} = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь существует'})
      }

      const hashedPassword =  await bcryptjs.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попроьуйте снова...'})
    }
})

// /api/auth/login
router.post(
  '/login', 
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )
    console.log(token)

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова...'})
  }
})

module.exports = router