import Login from './Components/Registration/Login';
import Signup from './Components/Registration/Signup';
import { Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import Status from './Components/Status/Status';
import StoryViewer from './Components/Status/StatusViewer';

function App() {
  return (
    <div className="">

      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/status" element={<Status/>}></Route>
        <Route path="/status/:id" element={<StoryViewer/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
