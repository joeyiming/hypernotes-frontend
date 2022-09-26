import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import userService from '../services/user';
import CloseIcon from '@mui/icons-material/Close';

function PwdModal({ toggle }) {
  const [user, setUser] = useOutletContext();
  const [password, setPassword] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])

  const onSave = () => {
    const content = {
      'password': password
    }
    userService.updateUser(user.id, content).then((res) => {
      if (res.status === 200) {
        const newUser = { ...user, ...content };
        setUser(newUser);
        toggle();
      } else {
        console.error('修改密码失败');
      }
    })
  }

  return (
    <div id="password-modal" className='modal'>
      <div className='modal-header'>
        <p>
          更改密码
        </p>
        <CloseIcon className="cursor" onClick={() => toggle()} />
      </div>
      <div className='modal-body'>
        <label>密码</label>
        <input type='password' value={password} onChange={({ target }) => { setPassword(target.value) }} />
      </div>
      <div className="modal-footer">
        <button type='button' onClick={onSave}>保存</button>
      </div>
    </div>
  )
}

export default PwdModal