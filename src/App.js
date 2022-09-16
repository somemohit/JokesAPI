import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        <Route path="/login" index element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
