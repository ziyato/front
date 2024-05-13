import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="flex"> header</div>
      <Routes>
        <Route path="/" element={<div> 홈페이지임 </div>} />
        <Route path="/about" element={<div> about 페이지임 </div>} />
        <Route path="/login" element={<div> login 페이지임 </div>} />

        <Route path="*" element={<div> 404입니다 </div>} />
      </Routes>
    </div>
  );
}

export default App;
