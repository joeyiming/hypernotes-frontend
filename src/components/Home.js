import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../style/Home.scss';


function Header() {
  const username = localStorage.getItem('username');
  const dname = localStorage.getItem('dname');
  return (
    <header>
      <div className='title'>Hypernotes</div>
      <nav>
        <div className='nav nav-user'>
          <button className='btn-user'>{ dname || username}</button>
          <svg className="icon-down-arrow" height="16" width="16" role="img" aria-label="Caret Down Icon" viewBox="0 0 16 16"><path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" fill="currentColor"></path></svg>
        </div>
        <div className='nav nav-about'>
          <Link to='/about' className='btn-about'>关于</Link>
        </div>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside>
      <div className='tab-wrapper'>
        <div className='tab-title'>🤖 标注</div>
        <Link className='link tab tab-anno' to='anno'>我的标注</Link>
        <div className='tab-title'>😺 用户</div>
        <Link className='link tab tab-user' to='user/profile'>我的账号</Link>
        <div className='tab-title'>👾 小组</div>
        <Link className='link tab tab-group' to='group'>我的小组</Link>
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer>
      <div className='footer-content'>
        Made with ❤️ by Joey
      </div>
    </footer>
  );
}


function Home() {
  return (
    <div className='Home'>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home