import React, { useState } from 'react';
import userService from '../services/user'

function Profile() {
  const id = 1;
  const user = JSON.parse(localStorage.getItem('user'));

  const [displayName, setDisplayName] = useState(user.displayName);
  const [name, setName] = useState(user.name);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('保存修改中');
    const content = {
      "name": name,
      "displayName": displayName
    }
    try {
      userService.updateUser(id,content).then(response => {
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
          <label htmlFor='dname'>显示名</label>
          <input id='dname' type="text" value={displayName} onChange={({ target }) => setDisplayName(target.value)} />
        </div>
        <div className='session'>
          <label htmlFor='username'>用户名</label>
          <input id='username' type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div className='session'>
          <label>头像</label>
          <div className='btn-wrapper'>
            <button id='avatar' className='btn btn-medium'>更改头像</button>
            <button className='btn btn-medium'>移除头像</button>
          </div>
        </div>
        <div className='session'>
          <label htmlFor='bio'>自我介绍</label>
          <textarea id='bio' />
        </div>
        <button type='submit' className='btn btn-big btn-submit'>保存</button>
      </form>
    </div>
  )
}

export default Profile