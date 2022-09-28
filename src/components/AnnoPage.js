import { Pagination } from '@mui/material';
import React from 'react'

function AnnoPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <main id='Anno'>
      <form id='search-bar'>
        <input id='search' type='text' placeholder='搜索' />
      </form>
      <div className='anno-header'>
        <div className='anno-user'>{user.displayName}</div>
      </div>
      <div className='anno-body'>
        <div className='anno-sum'>总计 <span className='anno-num'>230</span> 条标注</div>
        <div className='anno-items'>
          <div className='anno-item'>
            <div className='anno-source'>web.dev</div>
            <div className='anno-title'>Learn Responsive Design
</div>
            <div className='anno-count'>3</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>book.douban.com</div>
            <div className='anno-title'>看不见的女性</div>
            <div className='anno-count'>11</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>github.com</div>
            <div className='anno-title'>CSS Working Group Editor Drafts</div>
            <div className='anno-count'>32</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>github.com</div>
            <div className='anno-title'>hypernotes</div>
            <div className='anno-count'>32</div>
          </div>
          <div className='anno-item'>
            <div className='anno-source'>github.com</div>
            <div className='anno-title'>基于ECharts的数据可视化实现</div>
            <div className='anno-count'>32</div>
          </div>
          
        </div>
      </div>
      <Pagination count={10} />
    </main>
  )
}

export default AnnoPage