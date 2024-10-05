import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import Base from "./components/Base";

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/base" element={<Base />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
