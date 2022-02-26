import React from 'react'
import dynamic from 'next/dynamic'
const Sidebarmenus = dynamic(() => import('../component/Sidebarmenu'));

function Dashboard() {
  return (
    <div>
    
      <div> loginContainer </div>
    </div>
  )
}

export default Dashboard;