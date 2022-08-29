import React from 'react'
// import '../style/Profile.scss'

function Profile() {
  return (
    <div className='account'>
      <form>
        <div className='session'>
          <label htmlFor='username'>用户名</label>
          <input id='username' type="text" defaultValue="Joey" />
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
      </form>
    </div>
  )
}

export default Profile