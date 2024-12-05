import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar todos
  useEffect(() => {
    fetch("https://dummyjson.com/todos?limit=10")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.todos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao consultar os itens:", error);
        setLoading(false);
      });
  }, []);

  // Remover item da lista
  const removeTodo = (id) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } else {
          console.error("Falha ao tentar remover item.");
        }
      })
      .catch((error) => console.error("Erro ao remover item:", error));
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.todo}
              <button onClick={() => removeTodo(todo.id)}>
              <FontAwesomeIcon className="icon_lixeira" icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;




