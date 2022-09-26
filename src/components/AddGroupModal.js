import React, { useEffect, useState } from 'react';
import groupService from '../services/group';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

function GroupItem({ group, handleAdd }) {

  return (
    <div className='search-group-item'>
      <div className='info'>
        <div className='name'>{group.name}</div>
        <div className='desc'>{group.description}</div>
      </div>
      <div className='btn-wrapper'>
        <AddIcon type='button' className='cursor' onClick={() => handleAdd(group.id)}></AddIcon>
      </div>
    </div>
  );
}

function GroupList({ groups, handleAdd }) {
  return (
    <div className='search-group-list'>
      {groups.length > 0 ? groups.map(group => <GroupItem key={group.id} group={group} handleAdd={handleAdd} />) : null}
    </div>
  );
}

// TODO
function AddGroupModal({ toggle, user, setUser, userGroupPairs, setUserGroupPairs, groups, setGroups }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const onSearch = ({ target }) => {
    setSearchValue(target.value)
  }


  const handleAdd = (groupId) => {
    const userType = '组员'
    groupService.addMemberToGroup(groupId, user.id, userType).then((res) => {
      if (res.status === 200) {
        const newPair = {
          'userId': user.id,
          'groupId': groupId,
          'userType': userType
        }
        setUserGroupPairs([...userGroupPairs, newPair])
        groupService.getGroupById(groupId).then((res) => {
          const newGroup = res.data
          const newGroups = [...groups, newGroup]
          setGroups(newGroups)
          toggle()
        })
      }
    })
  }

  useEffect(() => {
    if (searchValue) {
      groupService.searchGroups(searchValue).then((res) => {
        setSearchResult(res.data)
      })
    } else {
      // 清空搜索值时也清空搜索结果
      setSearchResult([])
    }
  }, [searchValue])


  return (
    <div id='add-group-modal' className='modal'>
      <div className='modal-header'>
        <div className='modal-title'>加入小组</div>
        <CloseIcon className="cursor" onClick={() => toggle()}></CloseIcon>
      </div>
      <div className='modal-body'>
        <input type='search' value={searchValue} onChange={onSearch} />
        {searchResult ? <GroupList groups={searchResult} handleAdd={handleAdd} /> : null}
      </div>
    </div>
  )
}

export default AddGroupModal