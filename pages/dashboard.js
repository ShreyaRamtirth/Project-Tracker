import React from 'react'
import dynamic from 'next/dynamic'
import authenticateUser from '../component/authenticateUser';
const Sidebarmenus = dynamic(() => import('../component/Sidebarmenu'));

function Dashboard() {
  
  return (
    <div>
    
      <div> loginContainer </div>
    </div>
  ) 
}

export default Dashboard;