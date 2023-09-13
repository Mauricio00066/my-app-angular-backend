import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users')
  res.json(rows)
})

app.get('/history', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM `historial` WHERE `state`= 1')
  res.json(rows)
})

app.get('/history_all', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM `historial`')
  res.json(rows)
})

app.post('/history/:city/:country/:date', async (req, res) => {
  //const result = await pool.query('UPDATE `historial` SET `state`= 0 WHERE `id` > 0')
  //res.json(result)
  res.send(JSON.stringify(req.params))
})

app.patch('/history', async (req, res) => {
  const result = await pool.query('UPDATE `historial` SET `state`= 0 WHERE `id` > 0')
  res.json(result)
})

app.get('/ping', async (req, res) => {
  const [x] = await pool.query(`SELECT "hello world" as RESULT`);
  res.json(x)
})

app.get('/create', async (req, res) => {
  const result = await pool.query('INSERT INTO users(name) VALUES ("John")')
  res.json(result)
})

app.listen(PORT)
console.log('Servidor en puerto', PORT)
