const {Schema, model} = require('mongoose')

const schema = new Schema({
  img: {type: String, unique: true},
  model: {type: String, required: true},
  color: {type: String, required: true},
  price: {type: String, required: true}
})

module.exports = model('Car', schema)
