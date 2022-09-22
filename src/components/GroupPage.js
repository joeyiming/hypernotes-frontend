import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AddGroupModal from '../components/AddGroupModal';
import group from '../services/group';
import groupService from '../services/group';
import '../style/GroupPage.scss';
import CreateGroupModal from './CreateGroupModal';
const defaultAvatarUrl = 'http://localhost:3001/uploaded/default.jpg'

function GroupMember({ member }) {
  return (
    <li>
      <div className='member'>
        <div className='member-avatar'>
          {member && member.avatarUrl ? <img src={member.avatarUrl} alt="avatar" /> : <img src={defaultAvatarUrl} alt="avatar" />}
        </div>
        <div className='member-name'>
          【{member.userType}】{member ? member.name : 'Joey'}
        </div>
      </div>
    </li>
  );
}

function GroupCard({ group, user, groups, setGroups }) {
  const handleExitGroup = (userId, groupId) => {
    groupService.exitGroup(userId, groupId).then((res) => {
      const newGroups = groups.filter((group) => group.id !== groupId)
      setGroups(newGroups)
    });
  }

  return (
    <div className={group.hide ? 'card hide' : 'card'}>
      <div className='card-header'>
        <div className='group-name'>
          {group.name}
        </div>
        <div className='group-btns'>
          <Link to={`/home/detail?id=${group.id}`}>
            <button className='btn btn-medium'>详情</button>
          </Link>
          <button className='btn btn-medium' onClick={() => { handleExitGroup(user.id, group.id) }}>退出</button>
        </div>
      </div>
      <div className='card-body'>
        <div className='group-members'>小组成员(<span>{group.members ? group.members.length : 0}</span>)</div>
        <ul className='member-list'>
          {group && group.members && group.members.length > 0 ? group.members.map((member) => <GroupMember key={member.id} member={member} />) : 'Loading...'}
        </ul>
      </div>
      <div className='card-footer'>
        标注数：<span>{group.count}</span>
      </div>
    </div>
  );
}

function GroupSearchBar({ groups, setGroups }) {
  const [searchValue, setSearchValue] = useState('')
  const onChange = ({ target }) => {
    setSearchValue(target.value)
  }
  const onSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 将匹配的小组 hide 属性设置为 false，
      // 其他小组设置为 true
      const showGroups = groups.filter(group => group.name.includes(searchValue));
      showGroups.map(group => group.hide = false)
      const hideGroups = groups.filter(group => !group.name.includes(searchValue));
      hideGroups.map(group => group.hide = true);
      const newGroups = [...showGroups, ...hideGroups];
      console.log('n:', newGroups);
      setGroups(newGroups);
    }
  }
  return (
    <form id='search-bar'>
      <input type='text' placeholder='搜索' value={searchValue} onChange={onChange} onKeyDown={onSearch} />
    </form>
  )
}


function GroupPage() {
  const [user, setUser] = useOutletContext();
  const [groups, setGroups] = useState([])
  const [userGroupPairs, setUserGroupPairs] = useState([])
  const [addModalPop, setAddModalPop] = useState(false)
  const [createModalPop, setCreateModalPop] = useState(false)

  const toggleAddModal = () => {
    setAddModalPop(!addModalPop);
  }
  const toggleCreateModal = () => {
    setCreateModalPop(!createModalPop);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
    groupService.getGroupsByUser(user.id).then((res) => {
      let initGroups = res.data;
      // 为所有小组添加hide属性，在搜索小组是隐藏所有hide为true的小组
      initGroups = initGroups.map(group => { group.hide = false; return group })
      setGroups(initGroups);
    })
    groupService.getPairs().then((res) => {
      setUserGroupPairs(res.data);
    })
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])



  useEffect(() => {
    // 为groups补充members信息
    if (groups.length > 0) {
      let promises = groups.map((group) => groupService.getMembersByGroupId(group.id))
      Promise.allSettled(promises).then((result) => {
        let users = result.map((r) => r.value.data);
        let newGroups = []
        for (let index = 0; index < groups.length; index++) {
          const group = groups[index]
          const members = users[index]
          group.members = members
          newGroups.push(group)
        }
        setGroups(newGroups)
      })
    }
  }, [groups.length])

  return (
    <main id='Group'>
      {addModalPop ? <AddGroupModal toggle={toggleAddModal} user={user} setUser={setUser} userGroupPairs={userGroupPairs} setUserGroupPairs={setUserGroupPairs} groups={groups} setGroups={setGroups} /> : null}
      {createModalPop ? <CreateGroupModal toggle={toggleCreateModal} user={user} setUser={setUser} userGroupPairs={userGroupPairs} setUserGroupPairs={setUserGroupPairs} groups={groups} setGroups={setGroups} /> : null}
      <div className='header'>
        <div className='title'>我的小组</div>
        <div className='wrapper'>
          <GroupSearchBar groups={groups} setGroups={setGroups} />
          <div className='btns'>
            <button className='btn btn-big' onClick={toggleCreateModal}>创建</button>
            <button className='btn btn-big' onClick={toggleAddModal}>加入</button>
          </div>
        </div>
      </div>
      <div className='body'>
        <div className='cards'>
          {groups && groups[0] && groups[0].members ? groups.map((group) => {
            return <GroupCard key={group.id} group={group} user={user} groups={groups} setGroups={setGroups} userGroupPairs={userGroupPairs} setUserGroupPairs={setUserGroupPairs} hide={group.hide} />
          }) : 'Loading...'}
        </div>
      </div>
    </main>

  )
}

export default GroupPage