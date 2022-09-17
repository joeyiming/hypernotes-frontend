import React, { useEffect, useState } from 'react';
import groupService from '../services/group';
import userService from '../services/user';
import AddGroupModal from '../components/AddGroupModal';
import { useOutletContext } from 'react-router-dom';
import '../style/GroupPage.scss';
const defaultAvatarUrl = 'http://localhost:3001/uploaded/default.jpg'

function GroupMember({ member }) {
  return (
    <li>
      <div className='member'>
        <div className='member-avatar'>
          {member && member.avatarUrl ? <img src={member.avatarUrl} alt="avatar" /> : <img src={defaultAvatarUrl} alt="avatar" />}
        </div>
        <div className='member-name'>
          【{member.type}】{member ? member.name : 'Joey'}
        </div>
      </div>
    </li>
  );
}

function GroupCard({ group, userGroupPairs, setUserGroupPairs }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [groupMembers, setGroupMembers] = useState([])

  useEffect(() => {
    // 根据group.members（ID）获取groupMembers（对象，添加type字段）
    if (group.members) {
      let promises = group.members.map((member) => userService.getUserById(member.id));
      Promise.allSettled(promises).then((result) => {
        let users = result.map((r) => r.value.data);
        for (const member of group.members) {
          users = users.map(user => user.id === member.id ? { ...user, 'type': member.type } : user)
        }
        setGroupMembers(users);
      })
    }
  }, [group.members])

  const handleExitGroup = (userId, groupId) => {
    setGroupMembers(groupMembers => groupMembers.filter(member => member.id !== user.id))
    groupService.exitGroup(userId, groupId).then((response) => {
      // console.log(response);
    });
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='group-name'>
          {group.name}
        </div>
        <div className='group-btns'>
          <button className='btn btn-medium'>管理</button>
          <button className='btn btn-medium' onClick={() => { handleExitGroup(user.id, group.id) }}>退出</button>
        </div>
      </div>
      <div className='card-body'>
        <div className='group-members'>小组成员(<span>{groupMembers.length}</span>)</div>
        <ul className='member-list'>
          {groupMembers.length > 0 ? groupMembers.map((member) => <GroupMember key={member.id} member={member} />) : 'Loading...'}
        </ul>
      </div>
      <div className='card-footer'>
        标注数：<span>{group.count}</span>
      </div>
    </div>
  );
}


function GroupPage() {
  const [user, setUser] = useOutletContext();
  const [groups, setGroups] = useState([])
  const [userGroupPairs, setUserGroupPairs] = useState([])
  const [addModalPop, setAddModalPop] = useState(false)

  const toggleAddModal = () => {
    setAddModalPop(!addModalPop);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
    groupService.getGroupsByUser(user.id).then((response) => {
      setGroups(response.data);
    })
    groupService.getPairs().then((response) => {
      setUserGroupPairs(response.data);
    })
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])

  // * 可以修改为getMembersByGroupId
  useEffect(() => {
    if (groups[0] && userGroupPairs[0] && !groups[0].members) {
      let newGroups = groups.map((group) => {
        group.members = groupService.findMembers(group.id, userGroupPairs);
        return group;
      })
      setGroups(newGroups);
    }
  }, [groups, userGroupPairs])

  return (
    <main id='Group'>
      {addModalPop ? <AddGroupModal toggle={toggleAddModal} /> : null}
      <div className='header'>
        <div className='title'>我的小组</div>
        <div className='wrapper'>
          <form id='search-bar'>
            <input type='text' placeholder='搜索' />
          </form>
          <div className='btns'>
            <button className='btn btn-big'>创建</button>
            <button className='btn btn-big' onClick={toggleAddModal}>加入</button>
          </div>
        </div>
      </div>
      <div className='body'>
        <div className='cards'>
          {groups && groups[0] ? groups.map((group) => {
            return <GroupCard key={group.id} group={group} userGroupPairs={userGroupPairs} setUserGroupPairs={setUserGroupPairs} />
          }) : 'Loading...'}
        </div>
      </div>
    </main>

  )
}

export default GroupPage