import React, { useState } from 'react'
import groupService from '../services/group'

function CreateGroupModal({ toggle, user, setUser, userGroupPairs, setUserGroupPairs, groups, setGroups }) {
  const [groupName, setGroupName] = useState('')
  const [groupDesc, setGroupDesc] = useState('')

  const onCreate = (e) => {
    e.preventDefault()
    const newGroup = { 'name': groupName, 'description': groupDesc }
    if (groupName && groupDesc) {
      groupService.createNewGroup(newGroup).then(res => {
        if (res.status === 200) {
          const userType = '组长'
          const group = res.data
          setGroups([...groups, group])
          groupService.addMemberToGroup(group.id, user.id, userType).then((res) => {
            const pair = res.data
            setUserGroupPairs([...userGroupPairs, pair])
            console.log('g:', group);
            console.log('p:', pair);
            toggle()
          })
        }
      })
    } else {
      alert('请完善信息再提交')
    }
  }

  return (
    <div id='create-group-modal' className='modal'>
      <div className='modal-header'>
        <div className='modal-title'>创建小组</div>
        <button className="close" onClick={() => toggle()}>&times;</button>
      </div>
      <div className='modal-body'>
        <form onSubmit={onCreate}>
          <label htmlFor='group-name'>名称</label>
          <input id='group-name' type='text' value={groupName} onChange={({ target }) => setGroupName(target.value)} />
          <label htmlFor='group-desc'>简介</label>
          <input id='group-desc' type='text' value={groupDesc} onChange={({ target }) => setGroupDesc(target.value)} />
          <button type='submit' className='btn btn-medium'>创建</button>
        </form>
      </div>
    </div>
  )
}

export default CreateGroupModal