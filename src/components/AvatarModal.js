import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import userService from '../services/user';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';

function AvatarModal({ toggle }) {
  const [user, setUser] = useOutletContext();
  const [file, setFile] = useState(null);
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

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      alert('请选择一张图片！');
    }
  }

  const onFileUpload = () => {
    const uploadUrl = 'http://localhost:3001/api/upload';
    let formData = new FormData();
    formData.append('avatar', file, file.name);
    // 上传头像到服务器
    axios.post(uploadUrl, formData).then((response) => {
      const status = response.data.status;
      // 如果上传成功，则更新用户头像地址为服务器存储地址
      if (status) {
        const url = response.data.data.url;
        const content = {
          'avatarUrl': url
        }

        userService.updateUser(user.id, content).then((res) => {
          if (res.status === 200) {
            let newUser = { ...user, ...content };
            setUser(newUser);
            console.log('[avatarModal.js]',newUser);
            toggle();
          }
        })
      } else {
        console.log('上传失败');
      }

    })
  }

  return (
    <div id="avatar-modal" className='modal'>
      <div className='modal-header'>
        <div className='modal-title'>
          更改头像
        </div>
        <CloseIcon className="cursor" onClick={() => toggle()}></CloseIcon>
      </div>
      <div className="modal-body">
        <div className='input-title'>
          <AddPhotoAlternateIcon sx={{ width: 48, height: 48 }} />
        </div>
        <input id='file-input' type='file' accept='.jpg,.jpeg,.png,.gif' onChange={onFileChange} />
      </div>
      <div className="modal-footer">
        <div className='btn-wrapper'>
          {file ? <Button variant='contained' onClick={onFileUpload} endIcon={<Send />}>上传</Button> : <Button disabled variant='contained' onClick={onFileUpload} endIcon={<Send />}>上传</Button>}
        </div>
      </div>
    </div>
  )
}

export default AvatarModal