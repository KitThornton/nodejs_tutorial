import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

class ListTodos extends React.Component {
    // const [todos, setTodos] = useState([]);

    constructor(props) {
        super(props);
        this.state = {todos: ""};
    };

    setState(state, callback) {
        getTodos()
        super.setState(state, callback);
    }

    render() {

        return(
            <Fragment>
                {" "}
                <table class="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from(this.state.todos).map(todo => (

                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
        )
    };
};

async function deleteTodo(id) {
    try {
        const deleteTodo = await fetch(`http://localhost:4000/deleteToDo/${id}`, {
            method: "DELETE"
        });

        (this.todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
        console.error(err.message);
    }
};

async function getTodos() {
    try {
        const response = await fetch("http://localhost:4000/getTodos");
        const jsonData = await response.json();

        // console.log(jsonData);

        this.setState({todos: jsgit statusonData});

        // setTodos(jsonData);

        console.log(this.state.todos);

    } catch (err) {
        console.error(err.message);
    }
};

export default ListTodos;