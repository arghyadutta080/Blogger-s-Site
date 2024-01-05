import React from 'react'
import Navbar from '../components/home/Navbar'
import Sidebar from '../components/dashboard/Sidebar'

const Dashboard: React.FC = () => {
  return (
    <div className=' bg-slate-800 h-screen'>
        <Navbar/>
        <Sidebar/>
    </div>
  )
}

export default Dashboard