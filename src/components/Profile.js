import { Alert, Modal, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import userService from '../services/user'
import AvatarModal from './AvatarModal';
const defaultAvatarUrl = 'http://localhost:3001/uploaded/default.jpg';
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

function Profile() {
  const [user, setUser] = useOutletContext();
  const [displayName, setDisplayName] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [pop, setPop] = useState(false);
  const [removed, setRemoved] = useState(false)

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
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])


  const togglePop = () => {
    setPop(!pop);
  }

  const onRemove = () => {
    const content = {
      "avatarUrl": ''
    };
    try {
      userService.updateUser(user.id, content).then(response => {
        if (response.status === 200) {
          const newUser = { ...user, ...content };
          setUser(newUser);
        }
      })
      setRemoved(true)
    } catch (error) {
      console.error(error);
    }
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
        if (response.status === 200) {
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
            <Modal
              open={pop}
              onClose={setPop}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {pop ? <AvatarModal toggle={togglePop} user={user} setUser={setUser} /> : null}
              </Box>
            </Modal>
            <button type='button' className='btn btn-medium' onClick={onRemove}>移除头像</button>
            <Snackbar open={removed} autoHideDuration={1500} onClose={() => setRemoved(!removed)}>
              <Alert onClose={() => setRemoved(!removed)} severity="success" sx={{ width: '100%' }}>
                移除头像成功！
              </Alert>
            </Snackbar>
          </div>
        </div>
        <div className='session'>
          <label htmlFor='bio'>自我介绍</label>
          <textarea id='bio' value={bio} onChange={({ target }) => { setBio(target.value) }} />
        </div>
        <button type='submit' className='btn btn-large btn-submit'>保存</button>
      </form>
    </div>
  )
}

export default Profile