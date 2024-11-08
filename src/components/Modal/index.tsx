import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { createTodo } from "../../api";

const Modal = ({ setModalOpen }: { setModalOpen: (value: React.SetStateAction<boolean>) => void }) => {
  const { token } = useAuthStore();
  const [todoContents, setTodoContents] = useState({ title: "", content: "" });

  const handleContents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoContents((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTodo = async () => {
    const { data } = await createTodo(todoContents, token!);
    console.log(data);
  };

  useEffect(() => {
    return () => {
      const resetContents = () => {
        setTodoContents({ title: "", content: "" });
      };

      resetContents();
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor=''>
          <span>제목</span>
          <input type='text' name='title' onChange={handleContents} />
        </label>
        <label htmlFor=''>
          <span>내용</span>
          <input type='text' name='content' onChange={handleContents} />
        </label>
      </div>

      <button onClick={() => setModalOpen(false)}>취소 </button>
      <button onClick={handleAddTodo}>추가</button>
    </div>
  );
};

export default Modal;
