import React from 'react'
import { useNavigate } from 'react-router-dom';


type NavigateBtnProps = {
    to: string
    children: React.ReactNode;
    className?: string
}


const NavigateBtn = ({to, children} : NavigateBtnProps) => {
    const navigate = useNavigate();


  return (
    <button className="navigationBtn" onClick={() => navigate(to)}> {children} </button>
  )
}

export default NavigateBtn