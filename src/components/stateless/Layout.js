import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-md">{children}</div>
    </>
  )
}

export default Layout
