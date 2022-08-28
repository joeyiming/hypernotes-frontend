import React from 'react'
import logo from '../logo.svg'
import { Outlet } from 'react-router-dom'

function UserPage() {
  return (
    <main>
      <div className='user-header'>
        <div className='user-avatar'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className='user-name'>
          Joey
        </div>
      </div>
      <div className='user-body'>
        <nav className='user-nav'>
          <div className='nav-profile'>
            个人资料
          </div>
          <div className='nav-security'>
            安全设置
          </div>
        </nav>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default UserPage