import React from 'react'
import { useNavigate } from 'react-router-dom';


type NavigateBtnProps = {
    to: string
    children: React.ReactNode;
}


const NavigateBtn = ({to, children} : NavigateBtnProps) => {
    const navigate = useNavigate();


  return (
    <div>
        <button onClick={() => navigate(to)}> {children} </button>
    </div>
  )
}

export default NavigateBtn