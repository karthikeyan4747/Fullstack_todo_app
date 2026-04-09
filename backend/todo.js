const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '030504',
    database: 'todo'
})

db.connect((err) => {
    if (err) throw err;
    console.log("DB Connected");
})
app.get('/todos', (req, res) => {
    db.query('select * from todos', (err, result) => {
        if (err) return res.status(500).json({ 'Message': 'Error lil bro' })
        res.json(result);
    })
})

app.post('/todos', (req, res) => {
    const todo = req.body.task;
    const status = req.body.status;
    db.query('insert into todos(task,status) values(?,?)', [todo, status], (err, result) => {
        if (err) return res.status(500).json({ 'Message': "Error lil bro" })
        res.json({ 'Task': todo, 'Status': status })
    })
})

app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    db.query('select * from todos where id = (?)', [id], (err, result) => {
        if (err) return res.status(500).json({ 'Message': "Error lil bro" });
        res.json(result);
    })
})

app.put('/todos/:id', (req, res) => {
    const status = req.body.status;
    const id = Number(req.params.id);

    db.query('update todos set status = ? where id = ?', [status, id], (err, result) => {
        if (err) return res.status(500).json({ 'Message': "Error lil bro" });
        res.json({ Message: "Alu" });
    })
})

app.delete('/todos/:id', (req, res) => {
    db.query('delete from todos where id = ?', [Number(req.params.id)], (err, result) => {
        if (err) return res.status(500).json({ 'Message': "Error lil bro" });
        res.json({ Message: "Alu" });
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})