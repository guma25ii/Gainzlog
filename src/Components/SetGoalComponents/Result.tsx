

type props = {
  result: number

}

const Result = ({result} : props) => {
  return (
    <div className="resultCard">
      <h2 >Daily calories:</h2>
      <p >{Math.round(result)} Kcal</p>
    </div>
  )
}

export default Result