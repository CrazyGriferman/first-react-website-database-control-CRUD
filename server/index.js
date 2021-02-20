/* set up a simple express server */

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'sma123456', // 密码这里之前报错了，要用之前设置的密码
    database: 'employeeSystem', // databse拼错了 佛了
});

app.post('/create', (req, res) => {
    // 这里的 body.name ... 就是 App.js里 addEmployee函数里第二个对象里的
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employee (name, age, country, position, wage) VALUES (?,?,?,?,?)", 
    [name, age, country, position, wage], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    }
  );
});

app.get('/employee', (req, res) => {

    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

app.listen(3001, () => {
    console.log("Your server is running");
});