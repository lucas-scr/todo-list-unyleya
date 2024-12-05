import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Importando o Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye  } from "@fortawesome/free-solid-svg-icons";
import TodoDetails from "./todoDetails"; // Componente de detalhes
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar todos os itens
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
      {/* O Router agora envolve todo o conteúdo, incluindo as rotas */}
      <Router>
        <h1>Lista de Tarefas</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ul>
                  {todos.map((todo) => (
                    <li key={todo.id}>
                      <h3> {todo.todo} </h3>
                      <button onClick={() => removeTodo(todo.id)} className="botao_lixeira">
                        <FontAwesomeIcon icon={faTrash} className="icon_lixeira"/>
                      </button>
                      <Link to={`/details/${todo.id}`}>
                        <button className="botao_olho">
                        <FontAwesomeIcon icon={faEye} className="icon_olho"/>
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            />
            <Route path="/details/:id" element={<TodoDetails todos={todos} />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;