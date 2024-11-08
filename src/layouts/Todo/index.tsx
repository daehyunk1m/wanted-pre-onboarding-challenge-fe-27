import { TTodos } from "../../api/types";
import { deleteTodo, updateTodo } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

const Todo = ({ data }: { data: TTodos }) => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const { mutate } = useMutation({
    mutationKey: ["update"],
    mutationFn: updateTodo,
    onSuccess: () => {
      setIsEdit(false);
    },
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit((edit) => !edit);
  };

  const [todoContent, setTodoContent] = useState({
    title: data.title,
    content: data.content,
  });

  const handleTodoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoContent((content) => ({ ...content, [name]: value }));
  };

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <div>
      <div>
        <div>
          {isEdit ? <input type='text' name='title' defaultValue={todoContent.title} onChange={handleTodoContent} /> : <h3>{todoContent.title}</h3>}
          <span>수정일: {data.updatedAt}</span>
        </div>
        <div>
          {!isEdit && <button onClick={handleEdit}>내용 수정</button>}
          {isEdit && (
            <div>
              <button
                onClick={() => {
                  mutate({
                    id: data.id,
                    body: todoContent,
                    token: token!,
                  });
                }}
              >
                수정
              </button>
              <button onClick={handleEdit}>취소</button>
            </div>
          )}
          <button
            onClick={() => {
              deleteMutate({
                id: data.id,
                token: token!,
              });
            }}
          >
            삭제
          </button>
        </div>
      </div>
      {isEdit ? <input type='text' name='content' defaultValue={todoContent.content} onChange={handleTodoContent} /> : <p>{todoContent.content}</p>}
    </div>
  );
};

export default Todo;
