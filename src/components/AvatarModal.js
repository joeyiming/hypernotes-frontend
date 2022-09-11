import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AvatarModal({ toggle }) {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      alert('请选择一张图片！');
    }
  }

  const onFileUpload = () => {
    const uploadUrl = 'http://localhost:3001/api/upload'
    let formData = new FormData();
    formData.append('avatar', file, file.name);
    console.log(file);
    axios.post(uploadUrl, formData).then((response) => {
      console.log(response);
    })
  }

  return (
    <div className="modal">
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