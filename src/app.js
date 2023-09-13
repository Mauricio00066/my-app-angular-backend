import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/history', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM `historial` WHERE `state`= 1')
  res.json(rows)
})

app.get('/history_all', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM `historial`')
  res.json(rows)
})

app.post('/history/:city/:country/:date', async (req, res) => {
  const result = await pool.query(`INSERT INTO historial (id, city, country, date, state, creation_date) VALUES (NULL, '${req.params.city}', '${req.params.country}', '${req.params.date}', '1', current_timestamp())`)
  res.json(result)
  //res.send(JSON.stringify(req.params))
})

app.patch('/history', async (req, res) => {
  const result = await pool.query('UPDATE `historial` SET `state`= 0 WHERE `id` > 0')
  res.json(result)
})

app.get('/forecast/:date', async (req, res) => {
  const days = []
  let date = new Date(req.params.date)
  date.setDate(date.getDate() + 1)
  /* days.push(date)
  
  days.push(date)
  date.setDate(date.getDate() + 1)
  days.push(date) */
  console.log("Hola")
  res.json(date)
})


app.listen(PORT)
console.log('Servidor en puerto', PORT)
