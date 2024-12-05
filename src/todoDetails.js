// TodoDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

function TodoDetails({ todos }) {
  const { id } = useParams(); // Pega o id da tarefa da URL
  const todo = todos.find((todo) => todo.id === parseInt(id)); // Encontra o item correspondente

  if (!todo) {
    return <p>Tarefa não encontrada!</p>;
  }

  return (
    <div>
      <h2>Detalhes da Tarefa</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Descrição:</strong> {todo.todo}</p>
      <p><strong>Status:</strong> {todo.completed ? 'Concluída' : 'Pendente'}</p>
    </div>
  );
}

export default TodoDetails;