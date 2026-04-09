
import BackBtn from '../../Components/BackBtn'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'


const MealPage = () => {
  return (
    <PageLayout>
    <div>
      <h1>Meal Page</h1>
      <p>Lista med Dagens måltider</p>
      <p>samt kunna se totalen för dagen</p>
      <NavigateBtn to ="/addmeal">Add Meal</NavigateBtn>
      <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default MealPage