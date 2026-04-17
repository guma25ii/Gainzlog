import React from 'react'

type props = {
  result: number

}

const Result = ({result} : props) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Daily calories:</h2>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>{Math.round(result)} Kcal</p>
      <small>Based on your inputs</small>
    </div>
  )
}

export default Result