import React from 'react'
import type { Goal } from '../../lib/calories'


type props = {
  goal: Goal,
  setGoal: (value: Goal) => void;
};

const GoalButtons = ({goal, setGoal}: props) => {
  return (
    <div className="goalButtons">
    <button
      className={`navigationBtn ${goal === "lose_weight" ? "activeBtn" : ""}`}
      onClick={() => setGoal("lose_weight")}>Fat loss</button>

        <button
        className= {`navigationBtn ${goal === "maintain" ? "activeBtn" : ""}`}
        onClick={() => setGoal("maintain")}>Maintain</button>
        
        <button 
        className= {`navigationBtn ${goal === "gain_muscle" ? "activeBtn" : ""}`}
        onClick={() => setGoal("gain_muscle")}>Muscle Gain</button>
        
        
    </div>
  )
}

export default GoalButtons