import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Detail() {
  let [searchParams, setSearchParams] = useSearchParams();
  let groupId = searchParams.get('id');

  return (
    <div>Detail</div>
  )
}

export default Detail