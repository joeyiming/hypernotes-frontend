import React from 'react'


function Options() {
  return (
    <div className='account'>
      <form>
        <div className='session'>
          <label htmlFor='email'>邮箱</label>
          <input type='text' id='email' />
        </div>
        <div className='session'>
          <label htmlFor='password'>密码</label>
          <input type='password' id='pwd' />
        </div>
      </form>
    </div>
  )
}

export default Options