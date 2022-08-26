import logo from './logo.svg';
import './App.scss';

const data = [
  { name: 'joey', pwd: '123' },
]

function App() {
  return (
    <div className="App flex">
      <div className='left'>
        <div className='left-header'>
          <img src={logo} className="App-logo" alt="logo" />
          <div className='title'>
            Hypernotes
          </div>
        </div>
        <div className='left-body'>
          <form className='form'>
            <input id="name" className='form-input' type="text" defaultValue="用户名/邮箱" />
            <input id="password" className='form-input' type="pwd" defaultValue="密码" />
            <button id="submit" className='btn btn-login' type='submit'>登录</button>
          </form>
          <div className='register'>没有账号？</div>
        </div>
        <div className='left-footer'>Made with ❤️ by Joey</div>
      </div>
      <div className='right'>
        <div className='right-body'>
          <p className='title'>让笔记飞一会儿</p>
          <p className='description'>
            在任何网页标注信息，记录笔记并分享给你的团队，无需安装客户端，只需要一个浏览器！
          </p>
          <a
            className="more"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            进一步了解 >
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
