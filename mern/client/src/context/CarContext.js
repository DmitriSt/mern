import {createContext} from 'react'

// function noop() {}

export const CarContext = createContext({
  model: null,
  price: null,
  color: null,
  img: null
})