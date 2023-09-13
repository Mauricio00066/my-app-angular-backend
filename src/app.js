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
