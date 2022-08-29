import React from 'react'
import { Link } from 'react-router-dom'
import '../style/About.scss'

function About() {
  return (
    <main id='About'>
      <Link to='/' className='back'>返回首页</Link>
      <div className='About'>
        <div className='header'>
          项目说明
        </div>
        <div className='body'>
          在数字化加速发展的今天，网页资料在高等教育群体中取得了日益重要的地位。设计一个跨平台、易编辑、可共享的网页标注系统既可以帮助高校群体或科研团队降低沟通成本，提升工作效率，也有利于促进优质信息在互联网上的传播。
        </div>
      </div>
    </main>
  )
}

export default About