import React from 'react'
import type { Goal } from '../../lib/calories'


type props = {
  goal: Goal,
  setGoal: (value: Goal) => void;
};

const GoalButtons = ({goal, setGoal}: props) => {
  return (
    <div style={{display:"flex", gap: "10px"}}>
      <button onClick={() => setGoal("lose_weight")} style={{
          fontWeight: goal === "lose_weight" ? "bold" : "normal",
          background: goal === "lose_weight" ? "#ddd" : "transparent",
        }} >Fat loss</button>

        <button  onClick={() => setGoal("maintain")} style={{
          fontWeight: goal === "lose_weight" ? "bold" : "normal",
          background: goal === "lose_weight" ? "#ddd" : "transparent",
        }}>Maintain</button>
        
        <button onClick={() => setGoal("gain_muscle")} style={{
          fontWeight: goal === "lose_weight" ? "bold" : "normal",
          background: goal === "lose_weight" ? "#ddd" : "transparent",
        }}>Muscle Gain</button>
    </div>
  )
}

export default GoalButtons