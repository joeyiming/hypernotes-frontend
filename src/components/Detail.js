import { Avatar, Box, Breadcrumbs, Button, Link, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/Detail.scss';
import groupService from '../services/group';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BasicInfo({ group, setGroup }) {
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('保存修改中');
    const content = {
      "name": name,
      "description": description
    }
    try {
      groupService.updateGroup(group.id, content).then((res) => {
        console.log('r:', res);
        if (res.status === 200) {
          const newGroup = { ...group, ...content };
          setGroup(newGroup);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div id='BasicInfo'>
      <form onSubmit={onSubmit}>
        <div className='session'>
          <label htmlFor='name'>小组名</label>
          <br />
          <TextField id='name' type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div className='session'>
          <label htmlFor='desc'>介绍</label>
          <br />
          <TextField multiline fullWidth id='desc' type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
        </div>
        <button type='submit' className='btn btn-large btn-submit'>保存</button>
      </form>
    </div>
  )
}

function MemberManage({ group, setGroup }) {
  const [members, setMembers] = useState(group.members);
  function createData(name, type, bio, id) {
    return { name, type, bio, id };
  }
  const rows = members.map(member => createData(member.name, member.userType, member.bio, member.id));

  const onDelete = (userId) => {
    try {
      groupService.exitGroup(group.id, userId).then((res) => {
        if (res.status === 200) {
          const newMembers = group.members.filter(member => member.id !== userId)
          setMembers(newMembers);
          const newGroup = {...group,'members':newMembers}
          setGroup(newGroup);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>成员名</TableCell>
              <TableCell align="right">身份</TableCell>
              <TableCell align="right">自我介绍</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.bio}</TableCell>
                <TableCell align="right">
                  <Button variant='contained' color='error' onClick={() => onDelete(row.id)} >删除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function NavPaths({ name }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/home">
        Home
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/home/group"
      >
        Group
      </Link>
      <Typography color="text.primary">{name}</Typography>
    </Breadcrumbs>
  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Detail(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const [group, setGroup] = useState(location.state?.group);

  return (
    <main id='Detail'>
      <NavPaths name={group.name} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="小组基本信息" {...a11yProps(0)} />
          <Tab label="成员管理" {...a11yProps(1)} />
          <Tab label="信息统计" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicInfo group={group} setGroup={setGroup} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MemberManage group={group} setGroup={setGroup} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        信息统计
      </TabPanel>
    </main>
  )
}

export default Detail