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
  const [modalOpen, setModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const callList = async (token: string) => {
      const { data } = await getTodos(token);

      setList(data);
    };

    if (token) {
      const user = JSON.parse(localStorage.getItem("usr")!);
      const [name] = String(user?.id).split("@");

      callList(token);

      setUserName(name);
    } else {
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

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div>
      {!!userName && (
        <div>
          <h2>안녕하세요. {userName}님</h2>
          <button onClick={handleLogOut}>로그아웃</button>
        </div>
      )}

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
