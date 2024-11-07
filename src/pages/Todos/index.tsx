import React, { useEffect, useState } from "react";
import Todo from "../../layouts/Todo";
import { useAuthStore } from "../../hooks/useAuthStore";
import { createTodo, getTodos } from "../../api";
import { TTodos } from "../../api/types";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

const Todos = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [list, setList] = useState<TTodos[]>([]);

  useEffect(() => {
    const callList = async (token: string) => {
      const { data } = await getTodos(token);

      setList(data);
    };

    if (token) callList(token);
    else {
      console.log("not Token");

      navigate("/auth");
    }
  }, [token]);

  const handleAddTodo = async () => {
    const { data } = await createTodo(
      {
        title: "",
        content: "",
      },
      token!
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {modalOpen && <Modal />}
      <div>
        <button onClick={() => setModalOpen(!modalOpen)}>할일 추가하기</button>
      </div>

      <h5>투두리스트</h5>
      {list.length === 0 ? (
        <div>투두 리스트가 비어있습니다.</div>
      ) : (
        list.map((el, i) => {
          return <Todo key={i} />;
        })
      )}
    </div>
  );
};

export default Todos;
