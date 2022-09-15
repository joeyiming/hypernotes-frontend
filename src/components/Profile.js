import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import userService from '../services/user'
import AvatarModal from './AvatarModal';

function Profile() {
  const [user, setUser] = useOutletContext();
  const [displayName, setDisplayName] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
      setDisplayName(user.displayName);
      setName(user.name);
      setBio(user.bio);
    }
  }, []);

  useEffect(() => {
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])


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
        if (response.status===200){
          const newUser = { ...user, ...content };
          setUser(newUser);
        }
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
      {pop ? <AvatarModal toggle={togglePop} user={user} setUser={setUser} /> : null}
    </div>
  )
}

export default Profile