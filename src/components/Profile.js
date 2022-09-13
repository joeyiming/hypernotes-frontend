import React, { useEffect, useState } from 'react';
import userService from '../services/user'
import AvatarModal from './AvatarModal';

function Profile() {
  let user = JSON.parse(localStorage.getItem('user'));

  const [displayName, setDisplayName] = useState(user.displayName);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [pop, setPop] = useState(false);

  // 保持localStorage中的user与程序user一致
  useEffect(() => {
    user = { ...user, 'name': name, 'displayName': displayName, 'bio': bio };
    localStorage.setItem('user', JSON.stringify(user));
  }, [name, displayName, bio])


  const togglePop = () => {
    setPop(!pop);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('保存修改中');
    const content = {
      "name": name,
      "displayName": displayName,
      "bio": bio
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
            <button type='button' id='avatar' className='btn btn-medium' onClick={togglePop}>更改头像</button>
            <button type='button' className='btn btn-medium'>移除头像</button>
          </div>
        </div>
        <div className='session'>
          <label htmlFor='bio'>自我介绍</label>
          <textarea id='bio' value={bio} onChange={({ target }) => { setBio(target.value) }} />
        </div>
        <button type='submit' className='btn btn-big btn-submit'>保存</button>
      </form>
      {pop ? <AvatarModal toggle={togglePop} /> : null}
    </div>
  )
}

export default Profile