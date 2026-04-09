import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <footer className='footerBtn'>
        <button onClick={() => navigate(-1)} className="navigationBtn">Back</button>
        </footer>
  )
}
export default BackBtn