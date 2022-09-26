import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import emailService from '../services/email';
import userService from '../services/user';
import EmailModal from './EmailModal';
import PwdModal from './PwdModal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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
      // console.log(res.status, res.statusText);
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
          <button type='button' id='email' className='btn btn-medium' onClick={toggleEmailPop}>更改邮箱</button>
          <Modal
            open={emailPop}
            onClose={toggleEmailPop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {emailPop ? <EmailModal toggle={toggleEmailPop} /> : null}
            </Box>
          </Modal>
          {status ? null : <button type='button' id='confirm' onClick={onSend}>验证邮箱</button>}
        </div>
      </div>
      <div className='session'>
        <label>密码</label>
        <div className='btn-wrapper'>
          <button type='button' id='pwd' className='btn btn-medium' onClick={togglePwdPop}>更改密码</button>
          <Modal
            open={pwdPop}
            onClose={togglePwdPop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PwdModal toggle={togglePwdPop} />
            </Box>
          </Modal>
        </div>
      </div>

    </div>
  )
}

export default Options