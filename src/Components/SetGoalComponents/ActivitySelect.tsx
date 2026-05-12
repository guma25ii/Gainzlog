import React from 'react'
import type { ActivityLevel } from '../../lib/calories'

type props = {
  activity: ActivityLevel,
  setActivity: (value: ActivityLevel) => void;
}

const ActivitySelect = ({activity, setActivity}: props) => {
  return (
    <div className="inputGroup" >
    <select  value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)}>
      <option value="sedentary">Sedentary (little/no exercise)</option>
      <option value="light">Light (1-3 days/week)</option>
      <option value="moderate">Moderate (3-5 days/week)</option>
      <option value="active">Active (6-7 days/week)</option>
      <option value="very_active">Very active (2x/day)</option>
    </select>
    </div>
  );
}

export default ActivitySelect