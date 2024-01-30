import React ,{Fragment,useEffect,useState} from "react";
import EditTodo from "./EditTodo";

/*
useEffect is going to make fetch request to restful apis evertimne this componet is rendered
*/


const ListTodos = () =>{

    const [todos,setTodos] = useState([])


    const deleteTodo = async id => {
        try {
          const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
          });
    
          setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

    const getTodos = async () =>{
        try {
            const response = await fetch("http://localhost:5000/todos")

            const jsonData = await response.json();

            setTodos(jsonData)
        } catch (err) {
            console.log(err.message)
        }
    }
    // a lot of request is getting made when this component is rendered bcz of which we get coninupusly get data to make sure we get only 1 req we are adding , [] in useEffect
    useEffect(() =>{
      getTodos();  
    },[]);





    return (<Fragment>

<table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
              <EditTodo todo={todo} />

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



    </Fragment>);
}

export default ListTodos;