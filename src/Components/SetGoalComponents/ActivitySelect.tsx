import React from 'react'
import type { ActivityLevel } from '../../lib/calories'

type props = {
  activity: ActivityLevel,
  setActivity: (value: ActivityLevel) => void;
}

const ActivitySelect = ({activity, setActivity}: props) => {
  return (
    <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)}>
      <option value="sedentary">Sedentary</option>
      <option value="light">Light</option>
      <option value="moderate">Moderate</option>
      <option value="active">Active</option>
      <option value="very_active">Very active</option>
    </select>
  );
}

export default ActivitySelect