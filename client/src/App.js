import { Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import Status from "./Components/status/Status";
import StatusViewer from "./Components/status/StatusViewer";


const App=()=> {
  return (
    <div className="App">

      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/status" element={<Status />}></Route>
        <Route path="/status/:userId" element={<StatusViewer />}></Route>



        
      </Routes>
     
    </div>
  );
}

export default App;
