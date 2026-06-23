import React from 'react'
import SideBar from '../components/SideBar'
import MainComponent from '../components/Main.Component'

const MainPage = () => {
  return (
    <div className='flex gap-5 w-full'>
        <div className='w-[15%] bg-red-800 rounded-2xl h-screen'>

        <SideBar />
        </div>
        <div className='w-[82%] bg-gray-700 rounded-2xl h-screen'>

        <MainComponent/>
        </div>
    </div>
  )
}

export default MainPage