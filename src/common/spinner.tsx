import React from 'react'

const spinner=()=>{
  return (
    <div
    className="spinner-container"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Adjust height as needed
    }}
  >
    <div
      className="spinner-border"
      role="status"
      style={{
        width: '3rem',
        height: '3rem',
        color: '#007bff', // Adjust spinner color
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
}
export default spinner
