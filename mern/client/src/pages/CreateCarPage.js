import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
// import { CarContext } from '../context/CarContext'

export const CreateCarPage = () => {
  // const auth = useContext(CarContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()

  const [form, setForm] = useState({
    model: '', price: '', color: '', img: '' 
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const saveHandler = async () => {
    try {
      const data = await request('/api/cars/new_car', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создай авто</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            {/* <span className="card-title">Авторизация</span> */}
            <div>

              <div className="input-field">
                <input 
                  placeholder="Введите модель"
                  id="model"
                  type="text" 
                  name="model"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="first_name">Модель</label>
              </div>

              <div className="input-field">
                <input 
                  placeholder="Введите цвет" 
                  id="text" 
                  type="text"
                  name="color"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="first_name">Цвет</label>
              </div>

              <div className="input-field">
                <input 
                  placeholder="Введите картинку"
                  id="img"
                  type="text" 
                  name="img"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="first_name">Картинка</label>
              </div>

              <div className="input-field">
                <input 
                  placeholder="Введите цену"
                  id="price"
                  type="text" 
                  name="price"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="first_name">Цена</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 10}}
              onClick={saveHandler}
              disabled={loading}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
