import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import userService from '../services/user';

function AvatarModal({ toggle }) {
  const [user,setUser] = useOutletContext();
  const [file, setFile] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, [])

  useEffect(()=>{
    if(user){
      localStorage.setItem('user',JSON.stringify(user));
    }
  },[user])

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
          if (res.status===200) {
            let newUser = { ...user, ...content };
            setUser(newUser);
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
        <p>
          更改头像
        </p>
        <button className="close" onClick={() => toggle()}>&times;</button>
      </div>
      <div className="modal-body">
        <div className='input-title'>⬆️</div>
        <input id='file-input' type='file' accept='.jpg,.jpeg,.png,.gif' onChange={onFileChange} />
      </div>
      <div className="modal-footer">
        <button type='button' onClick={onFileUpload}>保存</button>
      </div>
    </div>
  )
}

export default AvatarModal