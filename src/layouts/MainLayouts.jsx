import React from 'react'
import Header from '../components/Header'
const MainLayouts = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>{children}</div>
    </div>
  )
}

export default MainLayouts
