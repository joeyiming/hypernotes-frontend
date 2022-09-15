import React, { useState,useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import userService from '../services/user';

function EmailModal({ toggle }) {
  const [user, setUser] = useOutletContext();
  const [email, setEmail] = useState('');
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
      'email': email
    }
    userService.updateUser(user.id, content).then((res) => {
      if (res.status === 200) {
        const newUser = {...user,...content};
        setUser(newUser);
        toggle();
      } else {
        console.error('修改邮箱失败');
      }
    })
  }

  return (
    <div id="email-modal" className='modal'>
      <div className='modal-header'>
        <p>
          更改邮箱
        </p>
        <button className="close" onClick={() => toggle()}>&times;</button>
      </div>
      <div className='modal-body'>
        <label>邮箱地址</label>
        <input type='email' value={email} onChange={({ target }) => { setEmail(target.value) }} />
      </div>
      <div className="modal-footer">
        <button type='button' onClick={onSave}>保存</button>
      </div>
    </div>
  )
}

export default EmailModal