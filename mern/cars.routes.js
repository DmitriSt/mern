const {Router} = require('express')
const Car = require('../models/Car') // import schema
const router = Router() // for routers from express

// /api/cars/new_car
router.post(
  '/new_car', 
  // [],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) { // if has errors
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации авто'
        })
      }

      const {img, model, color, price} = req.body
      console.log()
      const newCar = new Car({ img, model, color, price })

      await newCar.save()

      res.status(201).json({message: 'Авто создан'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попроьуйте снова...'})
    }
})

module.exports = router