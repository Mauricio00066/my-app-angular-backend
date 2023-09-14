import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/history', async (req, res) => {
  const [rows] = await pool.query('SELECT `id`,`city`,`country`, date_format(date, "%Y-%m-%e") as date FROM `historial` WHERE `state`= 1 ORDER BY id DESC;')
  res.json(rows)
})

app.get('/history_all', async (req, res) => {
  const [rows] = await pool.query('SELECT `id`,`city`,`country`, date_format(date, "%Y-%m-%e") as date FROM `historial` ORDER BY id DESC;')
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
  days.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  date.setDate(date.getDate() - 1)
  days.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  date.setDate(date.getDate() - 1)
  days.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`) 
  
  console.log("Hola")
  res.json(days)
})


app.listen(PORT)
console.log('Servidor en puerto', PORT)
