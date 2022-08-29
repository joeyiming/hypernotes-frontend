import React from 'react'
import logo from '../logo.svg'
import { Link, Outlet } from 'react-router-dom'

function UserPage() {
  return (
    <main id='User'>
      <div className='user-header'>
        <div className='user-avatar'>
          <img src={logo} alt="logo" />
        </div>
        <div className='user-name'>
          Joey
        </div>
      </div>
      <div className='user-body'>
        <nav className='user-nav'>
          <Link className='nav nav-profile' to='profile'>
            个人资料
          </Link>
          <Link className='nav nav-security' to='options'>
            安全设置
          </Link>
        </nav>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default UserPage