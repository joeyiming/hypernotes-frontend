import React from 'react'
import { Link } from 'react-router-dom'
import '../App.scss'

function Landing() {
  return (
    <div className='right'>
      <div className='right-body'>
        <div className='text-wrapper'>
          <p className='title'>让笔记飞一会儿</p>
          <p className='description'>
            在任何网页标注信息，记录笔记并分享给你的团队，无需安装客户端，只需要一个浏览器！
          </p>
          <Link className="more" to='/about'>
            进一步了解 >
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing