import { Avatar, Button, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../style/Home.scss';


function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleSignOut = e => {
    localStorage.removeItem('user');
    navigate('/');
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header>
      <div className='title'>Hypernotes</div>
      <nav>
        <div className='nav-item nav-user' onClick={handleClick}>
          <div className='user'>
            <Avatar sx={{ width: 32, height: 32 }} src={user ? user.avatarUrl : null} alt={user ? user.displayName : null}></Avatar>
            <svg className="icon-down-arrow" height="16" width="16" role="img" aria-label="Caret Down Icon" viewBox="0 0 16 16"><path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" fill="currentColor"></path></svg>
          </div>

        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Button id='signOut' size='large' onClick={handleSignOut}>退出登录</Button>
        </Popover>
        <div className='nav-item nav-about'>
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
        Made with ❤️ by Youzi
      </div>
    </footer>
  );
}


function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
    // console.log(user);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])

  return (
    <div className='Home'>
      <Header user={user} setUser={setUser} />
      <Sidebar />
      <Outlet context={[user, setUser]} />
      {/* <Footer /> */}
    </div>
  )
}

export default Home