import React from "react";
import Todo from "../../layouts/Todo";

const Todos = () => {
  return (
    <div>
      {["todosLIst"].map((el) => {
        return <Todo />;
      })}
    </div>
  );
};

export default Todos;
