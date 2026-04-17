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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      
      <label>
        Weight (kg)
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </label>

      <label>
        Height (cm)
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </label>

      <label>
        Age
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </label>

    </div>
  );
};
export default UserInput;