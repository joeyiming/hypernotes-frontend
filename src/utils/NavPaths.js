import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';

function NavPaths({ name }) {
  const pathname = window.location.pathname;
  // /为一层，/home为两层，/home/group为三层，/home/group/detail为四层
  const path = pathname.split('/');
  const lastLevel = path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/home">
        Home
      </Link>
      {path.length === 4 ? <Link
        underline="hover"
        color="inherit"
        href={{ pathname }}
      >
        Group
      </Link> :
        <Typography color="text.primary">{lastLevel}</Typography>
      }
      {name && <Typography color="text.primary">{name}</Typography>}
    </Breadcrumbs>
  )
}

export default NavPaths