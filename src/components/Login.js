import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.scss'
import logo from '../logo.svg';
import Home from './Home';

function LoginForm({ handleLogin, changePage, username, setUsername, password, setPassword }) {
  return (
    <div className='left-body'>
      <form className='form' onSubmit={handleLogin}>
        <label htmlFor='name'>用户名</label>
        <input id="name" className='form-input' type="text" value={username} onChange={({ target }) => { setUsername(target.value) }} />
        <label htmlFor='password'>密码</label>
        <input id="password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
        <div className='form-footer'>
          <button className='btn btn-login' type='submit' onClick={handleLogin}>登录</button>
          <button className='loginOrRegister' onClick={changePage}>没有账号？点击注册</button>
        </div>
      </form>
    </div>
  );
}

function RegisterForm({ handleRegister, changePage, username, setUsername, password, setPassword }) {
  return (
    <div className='left-body'>
      <form className='form' onSubmit={handleRegister}>
        <label htmlFor='name'>用户名</label>
        <input id="name" className='form-input' type="text" value={username} onChange={({ target }) => { setUsername(target.value) }} />
        <label htmlFor='password'>密码</label>
        <input id="password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
        <label htmlFor='re-password'>请再次确认你的密码</label>
        <input id="re-password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
        <div className='form-footer'>
          <button className='btn btn-register' type='submit'>注册</button>
          <button className='loginOrRegister' onClick={changePage}>返回登录</button>
        </div>
      </form>
    </div>
  );
}


function Login(props) {
  const [showRegister, setShowRegister] = useState(false);
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
      {showRegister ? <RegisterForm changePage={changePage} handleRegister={props.handleRegister} username={props.username} setUsername={props.setUsername} password={props.password} setPassword={props.setPassword} /> : <LoginForm changePage={changePage} handleLogin={props.handleLogin} username={props.username} setUsername={props.setUsername} password={props.password} setPassword={props.setPassword} />}
      <div className='left-footer'>Made with ❤️ by Joey</div>
    </div>
  )
}

export default Login