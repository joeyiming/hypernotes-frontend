import React from 'react'
import logo from '../logo.svg'
import { Link, Outlet } from 'react-router-dom'

function UserPage() {
  const username = localStorage.getItem('username')
  const dname = localStorage.getItem('dname')

  const toggleActiveTab = (e)=>{
    const tabList = ['nav-profile','nav-options']
    const className = 'active'
    const clicked = document.getElementById(e.target.id)
    if (clicked.classList.contains(className)) {
      clicked.classList.remove(className)
    }else{
      clicked.classList.add(className)
    }
    tabList.forEach(tabId => {
      if (tabId!==clicked.id) {
        document.getElementById(tabId).classList.remove(className)
      }
    });
  }

  return (
    <main id='User'>
      <div className='user-header'>
        <div className='user-avatar'>
          <img src={logo} alt="logo" />
        </div>
        <div className='user-name'>
          {dname || username}
        </div>
      </div>
      <div className='user-body'>
        <nav className='user-nav'>
          <Link className='nav active' id='nav-profile' to='profile' onClick={toggleActiveTab}>
            个人资料
          </Link>
          <Link className='nav' id='nav-options' to='options' onClick={toggleActiveTab}>
            安全设置
          </Link>
        </nav>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </main >
  )
}

export default UserPage