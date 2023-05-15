import './App.css';
import Landing from "./components/Landing"
import Serp from "./components/Serp"
import Footer from "./components/Footer"
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search/:query" element={<Serp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
