import React, { useState } from 'react'
import userService from '../services/user'


function Options() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [emailConfirmPwd, setEmailConfirmPwd] = useState('');
  const [pwd, setPwd] = useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    console.log('保存修改中');
    const content = {
      'email': email,
      'password': password
    }
    try {
      userService.updateUser(user.id, content).then(response => {
        console.log(response);
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='account'>
      <form onSubmit={onSubmit}>
        <div className='session'>
          <label htmlFor='email'>邮箱</label>
          <input type='text' id='email' value={email} onChange={({ target }) => { setEmail(target.value) }} />
        </div>
        <div className='session'>
          <label htmlFor='password'>密码</label>
          <input type='password' id='pwd' value={password} onChange={({ target }) => { setPassword(target.value) }} />
        </div>
        <button type='submit' className='btn btn-big btn-submit'>保存</button>
      </form>
    </div>
  )
}

export default Options