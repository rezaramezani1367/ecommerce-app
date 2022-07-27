import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Routers from "./Routers";


function App() {
  return (
    <>
      <Header />
      <div className="container-main">
      <Routers />
      </div>
    </>
  );
}

export default App;
