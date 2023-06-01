import React, { useState } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([]);
  const [addInput, setAddInput] = useState<string>("");
  const [editInput, setEditInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [originalText, setOriginalText] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo && editInput.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text: editInput };
          }
          return todo;
        })
      );
      setEditingId(null);
      setEditInput("");
      setOriginalText("");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditInput("");
    setOriginalText("");
  };

  const handleClick = () => {
    if (addInput.trim() !== "") {
      const newTodo: item = { id: Date.now(), text: addInput, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setAddInput("");
    }
  };

  const handleStartEdit = (id: number, text: string) => {
    setEditingId(id);
    setOriginalText(text);
    setEditInput(text);
  };

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.currentTarget.value)}
                />
                <button onClick={() => handleEdit(todo.id)}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                {todo.text}
                <button onClick={() => handleStartEdit(todo.id, todo.text)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add todo item"
        value={addInput}
        onChange={(e) => setAddInput(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
