import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './components/contexts/AuthContext';
import { useState } from 'react';
import Details from './components/Details';
import NoPage from './components/NoPage';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ auth, setAuth}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:alphaCode" element={<Details />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AuthContext.Provider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
