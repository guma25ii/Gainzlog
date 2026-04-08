import React from 'react'
import { useNavigate } from 'react-router-dom'



const BackBtn = () => {

    const navigate = useNavigate();
  return (
    <div> 
        <button onClick={() => navigate(-1)} >Back, Lägg till Emoji</button>
    </div>
  )
}

export default BackBtn