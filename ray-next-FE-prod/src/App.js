import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import IndexRoutes from "./Routes/IndexRoutes";
import CustomToast from "./CommonComponents/UtilComponent/CustomToast";

function App() {
  return (
    <Router>
      <CustomToast />
      <IndexRoutes />
    </Router>
  );
}

export default App;
