import React, { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const TodoForm = ({
  input,
  setInput,
  todos,
  setTodos,
  editTodo,
  setEditTodo,
}) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  //Input Change
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  //Form Submit
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidV4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };
  return (
    <form onSubmit={onFormSubmit} className="todo-form">
      <input
        type="text"
        name="text"
        placeholder="Add a Todo"
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
