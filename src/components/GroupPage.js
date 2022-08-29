import React from 'react'
import '../style/GroupPage.scss'

function GroupPage() {
  return (
    <main id='Group'>
      <div className='header'>
        <div className='title'>我的小组</div>
        <div className='wrapper'>
          <form>
            <input type='text' />
          </form>
          <button className='btn btn-big'>创建新小组</button>
        </div>
      </div>
      <div className='body'>
        <div className='cards'>
          <div className='card'>
            <div className='card-header'>
              <div className='group-name'>
                National Study Center
              </div>
              <div className='group-btns'>
                <button className='btn btn-medium'>管理</button>
                <button className='btn btn-medium'>退出</button>
              </div>
            </div>
            <div className='card-body'>
              <div className='group-members'>小组成员(<span>3</span>)</div>
              <ul className='member-list'>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      Joey
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      Joss
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      JoJo
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className='card-footer'>
              标注数：<span>24</span>
            </div>
          </div>
          <div className='card'>
            <div className='card-header'>
              <div className='group-name'>
                你们对不队
              </div>
              <div className='group-btns'>
                <button className='btn btn-medium'>管理</button>
                <button className='btn btn-medium'>退出</button>
              </div>
            </div>
            <div className='card-body'>
              <div className='group-members'>小组成员(<span>6</span>)</div>
              <ul className='member-list'>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      柚子
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      海子
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      凳子
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      胖子
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      栗子
                    </div>
                  </div>
                </li>
                <li>
                  <div className='member'>
                    <div className='member-avatar'></div>
                    <div className='member-name'>
                      杏子
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className='card-footer'>
              标注数：<span>332</span>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default GroupPage