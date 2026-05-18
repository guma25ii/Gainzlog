

type props = {
  result: number

}

const Result = ({result} : props) => {
  return (
    <div >
      <h2 >Daily calories:</h2>
      <h4>{Math.round(result)} Kcal</h4>
    </div>
  )
}

export default Result