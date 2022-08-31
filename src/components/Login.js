import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.scss';
import logo from '../logo.svg';
import loginService from '../services/login';

function LoginForm({ handleLogin, changePage, username, setUsername, password, setPassword }) {
  return (
    <form className='form' onSubmit={handleLogin}>
      <label htmlFor='name'>用户名</label>
      <input id="name" className='form-input' type="text" value={username} onChange={({ target }) => { setUsername(target.value) }} />
      <label htmlFor='password'>密码</label>
      <input id="password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
      <div className='form-footer'>
        <button className='btn btn-big btn-login' type='submit' onClick={handleLogin}>登录</button>
        <button className='loginOrRegister' onClick={changePage}>没有账号？点击注册</button>
      </div>
    </form>
  );
}

function RegisterForm({ handleRegister, changePage, username, setUsername, password, setPassword }) {
  return (
    <form className='form' onSubmit={handleRegister}>
      <label htmlFor='name'>用户名</label>
      <input id="name" className='form-input' type="text" value={username} onChange={({ target }) => { setUsername(target.value) }} />
      <label htmlFor='password'>密码</label>
      <input id="password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
      <label htmlFor='re-password'>请再次确认你的密码</label>
      <input id="re-password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
      <div className='form-footer'>
        <button className='btn btn-big' type='submit'>注册</button>
        <button className='loginOrRegister' onClick={changePage}>返回登录</button>
      </div>
    </form>

  );
}


function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault()
    try {
      loginService.login({ username, setUsername, password, setPassword, user, setUser, error, setError });
      if (user !== null) {
        console.log('登录成功：',user);
        navigate('/home');
      } else {
        alert(error);
      }
    } catch (exception) {
      console.error('Login Failed');
    }
  }

  const handleRegister = (e) => {

  }

  const changePage = (e) => {
    setShowRegister(!showRegister);
  }

  return (
    <div className='left'>
      <div className='left-header'>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='title'>
          Hypernotes
        </div>
      </div>
      <div className='left-body'>
        {showRegister ?
          <RegisterForm changePage={changePage} handleRegister={handleRegister} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
          <LoginForm changePage={changePage} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      </div>
      <div className='left-footer'>Made with ❤️ by Joey</div>
    </div>
  )
}

export default Login