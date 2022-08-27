import React from 'react'
import '../style/Home.scss'


function Home() {
  return (
    <div className='Home'>
      <header>
        <div className='title'>Hypernotes</div>
        <nav>
          <div className='nav nav-user'>
            <button className='btn-user'>Joey</button>
            <svg class="icon-down-arrow" height="16" width="16" role="img" aria-label="Caret Down Icon" viewBox="0 0 16 16"><path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" fill="currentColor"></path></svg>
          </div>
          <div className='nav nav-group'>
            <button className='btn-group'>小组</button>
            <svg class="icon-down-arrow" height="16" width="16" role="img" aria-label="Caret Down Icon" viewBox="0 0 16 16"><path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" fill="currentColor"></path></svg>
          </div>
          <div className='nav nav-options'>
            <button className='btn-options'>设置</button>
            <svg class="icon-down-arrow" height="16" width="16" role="img" aria-label="Caret Down Icon" viewBox="0 0 16 16"><path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" fill="currentColor"></path></svg>
          </div>
        </nav>
      </header>
      <aside>
        侧边栏
      </aside>
      <main>
        主体
      </main>
      <footer>
        <div className='footer-content'>
          Made with ❤️ by Joey
        </div>
      </footer>
    </div>
  )
}

export default Home