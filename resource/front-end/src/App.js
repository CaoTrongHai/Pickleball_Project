import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
