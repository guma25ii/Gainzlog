import React from "react";

type Props = {
  weight: number;
  setWeight: (value: number) => void;

  height: number;
  setHeight: (value: number) => void;

  age: number;
  setAge: (value: number) => void;
};

const UserInput = ({
  weight,
  setWeight,
  height,
  setHeight,
  age,
  setAge,
}: Props) => {
  return (
    <div>
      <div className="inputGroup">
      <label>Weight (kg): </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        /></div>
      
      <div className="inputGroup">
      <label>Height (cm): </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        /></div>
        
      
      <div className="inputGroup">
      <label>Age : </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        /></div>
    </div>
  );
};
export default UserInput;