import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.scss';
import logo from '../logo.svg';
import userService from '../services/user';
import Captcha from './Captcha';

function LoginForm({ changePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkCaptcha, setCheckCaptcha] = useState(false);
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault()
    try {
      userService.getAllUsers().then(response => {
        let users = response.data;
        console.log(users);
        const user = userService.findUserByName(username, users);
        if(!checkCaptcha) {
          console.error('验证码不正确');
          return
        }
        if (user === null) {
          console.error('用户名不存在');
          return
        }
        if (user.password !== password) {
          console.error('密码错误');
          return
        }
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage.getItem('user'));
        navigate(`/home`);
      });

    } catch (exception) {
      console.error('登录失败', exception);
    }
  }

  return (
    <form className='form' onSubmit={handleLogin}>
      <label htmlFor='name'>用户名</label>
      <input id="name" className='form-input' type="text" value={username} onChange={({ target }) => { setUsername(target.value) }} />
      <label htmlFor='password'>密码</label>
      <input id="password" className='form-input' type="password" value={password} onChange={({ target }) => { setPassword(target.value) }} />
      <Captcha checkCaptcha={checkCaptcha} setCheckCaptcha={setCheckCaptcha} />
      <div className='form-footer'>
        <button className='btn btn-big btn-login' type='submit' onClick={handleLogin}>登录</button>
        <button className='loginOrRegister' onClick={changePage}>没有账号？点击注册</button>
      </div>
    </form>
  );
}

function RegisterForm({ changePage, showRegister, setShowRegister }) {
  const [checkCaptcha, setCheckCaptcha] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repwd, setRepwd] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault()
    try {
      if (password !== repwd) {
        console.error('两次输入的密码不同');
        return
      }
      if (!checkCaptcha) {
        console.error('验证码不正确');
        return
      }

      userService.getAllUsers().then(response => {
        let users = response.data;
        if (userService.findUserByName(username, users)) {
          console.error('用户名已被占用');
          return
        }
        const newUser = {
          name: username,
          password: password,
          email: '',
          emailStatus: false,
          displayName: displayName
        };

        userService.createUser(newUser).then(response => {
          console.log('注册成功');
          changePage();
        });
      });
    } catch (exception) {
      console.error('[注册失败]', exception);
    }
  }

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
      <Captcha checkCaptcha={checkCaptcha} setCheckCaptcha={setCheckCaptcha} />
      <div className='form-footer'>
        <button className='btn btn-big' type='submit'>注册</button>
        <button className='loginOrRegister' onClick={changePage}>返回登录</button>
      </div>
    </form>

  );
}


function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  // 如果已登录，跳转到 /home
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/home');
    }
  }, [])

  const changePage = (e) => {
    setShowRegister(!showRegister);
  }

  return (
    <div className='left'>
      <div className='left-header'>
        <img src={logo} className="App-logo" alt="logo" />
        {showRegister || <div className='title'>
          Hypernotes
        </div>}
      </div>
      <div className='left-body'>
        {showRegister ?
          <RegisterForm changePage={changePage} /> :
          <LoginForm changePage={changePage} />}
      </div>
      <div className='left-footer'>Made with ❤️ by Youzi</div>
    </div>
  )
}

export default Login