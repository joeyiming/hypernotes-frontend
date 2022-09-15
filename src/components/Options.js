import React, { useEffect, useState } from 'react'
import userService from '../services/user'
import emailService from '../services/email'
import EmailModal from './EmailModal';
import { useOutletContext } from 'react-router-dom';
import PwdModal from './PwdModal';

function Options() {
  const [user, setUser] = useOutletContext();
  const [status, setStatus] = useState(false);
  const [emailPop, setEmailPop] = useState(false);
  const [pwdPop, setPwdPop] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
      setStatus(user.emailStatus);
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])

  const toggleEmailPop = () => {
    setEmailPop(!emailPop);
  }
  const togglePwdPop = () => {
    setPwdPop(!pwdPop);
  }

  // 发送验证邮件
  const onSend = () => {
    console.log('sending...');
    const receiver = { 'receiver': user.email };
    emailService.sendVerifyEmail(receiver).then((res) => {
      console.log(res.status, res.statusText);
    })

    // TODO 更新用户邮箱
    // 目前是发送即验证，需要完善为点击验证链接才验证
    const content = {
      'email': user.email,
      'emailStatus': true
    }
    userService.updateUser(user.id, content).then((res) => {
      if (res.status === 200) {
        user = { ...user, 'emailStatus': true };
        localStorage.setItem('user', JSON.stringify(user));
        setStatus(user.emailStatus);
      }
    })
  }

  return (
    <div className='account'>
      <div className='session'>
        <label htmlFor='email'>邮箱（<span id='email-status'>{status ? '已验证' : '未验证'}</span>）</label>
        <p id='email'>{user ? user.email : 'loading...'}</p>
        <div className='btn-wrapper'>
          <button type='button' id='avatar' className='btn btn-medium' onClick={toggleEmailPop}>更改邮箱</button>
          {status ? null : <button type='button' id='confirm' onClick={onSend}>验证邮箱</button>}
        </div>
      </div>
      <div className='session'>
        <label>密码</label>
        <div className='btn-wrapper'>
          <button type='button' id='avatar' className='btn btn-medium' onClick={togglePwdPop}>更改密码</button>
        </div>
      </div>
      {emailPop ? <EmailModal toggle={toggleEmailPop} /> : null}
      {pwdPop ? <PwdModal toggle={togglePwdPop} /> : null}
    </div>
  )
}

export default Options