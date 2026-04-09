
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
const ReviewWorkout = () => {
  return (
    <PageLayout>
    <div>ReviewWorkout
        <h1>Review Workout</h1>
        <p>Här ska man kunna se sitt träningspass, lägga till det i enskilda pass eller i ett program </p>
        <p>Alternativt skapa nytt program</p>
        <button>Knapp för att lägga till i progam</button>
        <button>Knapp för att lägga till enskilda pass</button>
        <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default ReviewWorkout