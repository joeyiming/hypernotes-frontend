import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.scss';
import logo from '../logo.svg';
import loginService from '../services/login';
import { findUserByName } from '../services/utils';

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

function RegisterForm({ handleRegister, changePage, username, setUsername, password, setPassword, displayName, setDisplayName }) {
  const [repwd, setRepwd] = useState('');
  return (
    <form className='form' onSubmit={handleRegister}>
      <label htmlFor='dname'>显示名</label>
      <input id="dname" className='form-input' type="text" value={displayName} onChange={({ target }) => { setDisplayName(target.value) }} />
      <label htmlFor='name'>用户名<span>（英文数字或下划线）</span></label>
      <input id="name" className='form-input' type="text" value={username} onChange={({ target }) => { setUsername(target.value) }} />
      <label htmlFor='password'>密码</label>
      <input id="password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
      <label htmlFor='re-password'>请再次确认你的密码</label>
      <input id="re-password" className='form-input' type="password" value={repwd} onChange={({ target }) => { setRepwd(target.value) }} />
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
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('username')) {
      navigate('/home');
    }
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    console.log('登录中');
    try {
      loginService.getAllUsers().then(response => {
        let users = response.data;
        let user = findUserByName(username, users);
        if (user === null) {
          setError('用户名不存在');
          throw error;
        }
        if (user.password !== password) {
          setError('密码错误');
          throw error;
        }
        setUser(user);
        localStorage.setItem('username', user.username);
        localStorage.setItem('dname', user.displayName);
        console.log('登录成功');
        navigate(`/home`);
      });

    } catch (exception) {
      console.error('登录失败', exception);
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('注册中');
    try {
      setError('');
      loginService.getAllUsers().then(response => {
        let users = response.data;
        if (findUserByName(username, users)) {
          setError('用户名已被占用');
          throw error;
        }
        const newUser = {
          username: username,
          password: password,
          email: '',
          groups: '',
          display_name: displayName
        };

        loginService.createUser(newUser).then(resposne => {
          setUser(newUser);
          setShowRegister(!showRegister);
        });
      });
    } catch (exception) {
      console.error('[注册失败]', exception);
    }
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
          <RegisterForm changePage={changePage} handleRegister={handleRegister} username={username} setUsername={setUsername} password={password} setPassword={setPassword} displayName={displayName} setDisplayName={setDisplayName} /> :
          <LoginForm changePage={changePage} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      </div>
      <div className='left-footer'>Made with ❤️ by Joey</div>
    </div>
  )
}

export default Login