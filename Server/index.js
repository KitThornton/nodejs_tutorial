const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const pool = require("./DB.js")

// middleware
const app = express();
app.use(cors());
app.use(express.json());

// Routes //
// POST: create a to-do entry
app.post("/createTodo", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO test.todos (description) VALUES($1)", [description]);
        res.json(newTodo);

        console.log("created new todo item \"$1\" in test.todos", [description])

    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE: update an entry
app.put('/updateTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query("UPDATE test.todos SET description = $1 WHERE todo_id = $2",
            [description, id]);

        res.json(updatedTodo);
        console.log("updated item $1 in test.todos", [id])

    } catch (err) {
        console.error(err.message);
    }
});

// DELETE: delete an entry
app.delete("/deleteToDo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM test.todos WHERE todo_id = $1", [id])

        res.json(deletedTodo);
        console.log("Deleted item $1 from test.todos", [id])

    } catch (err) {
        console.error(err.message);
    }
});

// GET: get an entry/entries
app.get("/getTodos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM test.todos")
        res.json(todos);
        console.log("Retrieved all items from test.todos")

    } catch (err) {
        console.error(err.message);
    }
});

app.listen(4000, () => {
    console.log("server has started on port 4000");
});

// module.exports = app;

// Previous setups
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// GET request for index page
// app.get('/', (req, res) => {
//   // res.send('Hello, from Kit!')
//   res.render('index', {title: "Hello there!"})
// })

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//

