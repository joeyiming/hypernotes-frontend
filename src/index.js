import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import AnnoPage from './components/AnnoPage';
import UserPage from './components/UserPage';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Profile from './components/Profile';
import Options from './components/Options';
import GroupPage from './components/GroupPage';
import About from './components/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='home' element={<Home />}>
          <Route path='anno' element={<AnnoPage />} />
          <Route path='group' element={<GroupPage />} />
          <Route path='user' element={<UserPage />}>
            <Route path='profile' element={<Profile />} />
            <Route path='options' element={<Options />} />
          </Route>
        </Route>
        <Route path='about' element={<About />} />
      </Routes>
    </Router>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
