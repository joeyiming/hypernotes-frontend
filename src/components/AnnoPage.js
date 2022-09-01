import React from 'react'

function AnnoPage() {
  const username = localStorage.getItem('username');
  return (
    <main id='Anno'>
      <form id='search-bar'>
        <input id='search' type='text' placeholder='搜索' />
      </form>
      <div className='anno-header'>
        <div className='anno-user'>{username}</div>
      </div>
      <div className='anno-body'>
        <div className='anno-sum'>总计 <span className='anno-num'>230</span> 条标注</div>
        <div className='anno-items'>
          <div className='anno-item'>
            <div className='anno-source'>web.dev</div>
            <div className='anno-title'>Grid</div>
            <div className='anno-count'>3</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>book.douban.com</div>
            <div className='anno-title'>Bullshit Jobs</div>
            <div className='anno-count'>11</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>github.com</div>
            <div className='anno-title'>hypernotes</div>
            <div className='anno-count'>32</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>bilibili.com</div>
            <div className='anno-title'>【安利！】这些游戏竟然都是「一个人」做的？｜小宁子</div>
            <div className='anno-count'>3</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>bilibili.com</div>
            <div className='anno-title'>【安利！】这些游戏竟然都是「一个人」做的？｜小宁子</div>
            <div className='anno-count'>3</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>bilibili.com</div>
            <div className='anno-title'>【安利！】这些游戏竟然都是「一个人」做的？｜小宁子</div>
            <div className='anno-count'>3</div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AnnoPage