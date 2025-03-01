import React from 'react'
import { useParams } from 'react-router-dom';
const ClusterSubpage = () => {
  
  
  const { clusterId } = useParams();
  console.log(clusterId);
  return (
    <div>
      
    </div>
  )
}

export default ClusterSubpage
