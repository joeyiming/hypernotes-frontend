import { useState,useEffect } from 'react';
import './App.scss';
import Login from './components/Login'
import Landing from './components/Landing';
import loginService from './services/login'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const handleLogin = (e)=> {
    e.preventDefault()
    try {
      // console.log(username,password);
      // 这里应该有个 await
      const user =  loginService.login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
      console.log(user);
    } catch (exception) {
      console.error('Login Failed');
    }
  }


  return (
    <div className="App">
      <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      <Landing />
    </div>
  );
}

export default App;
