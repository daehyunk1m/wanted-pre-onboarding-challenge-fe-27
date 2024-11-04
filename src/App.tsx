import "./App.css";
import { Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/login' element={<></>} />
      <Route path='/' element={<Todos />} />
      <Route path='/todos' element={<></>} />
      <Route path='/todos:id' element={<></>} />
    </Routes>
  );
};

export default App;
