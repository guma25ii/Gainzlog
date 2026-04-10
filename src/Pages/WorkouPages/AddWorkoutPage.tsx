
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'

const AddWorkoutPage = () => {
  return (
    <PageLayout>
    <div className='centerContent'>
        <h1>Add Workout Page</h1>
        <p>Här ska man kunna se kategorier och välja i en lista vad man vill ha för övning</p>
        <p>Listan ska synas nedanför</p>
        <button>Knapp för att se träningsupplägget</button>
        <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default AddWorkoutPage