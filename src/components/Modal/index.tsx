import React, { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { createTodo } from "../../api";

const Modal = () => {
  const { token } = useAuthStore();
  const [todoContents, setTodoContents] = useState({ title: "", content: "" });

  const handleContents;
  const handleAddTodo = async () => {
    const response = await createTodo(todoContents, token!);
    console.log(response);
  };

  return (
    <div>
      <div>
        <input type='text' name='title' />
      </div>
    </div>
  );
};

export default Modal;
