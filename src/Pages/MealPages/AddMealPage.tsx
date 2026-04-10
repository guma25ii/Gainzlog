
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'

const AddMealPage = () => {
  return (
    <PageLayout>
    <div className='centerContent'>
      <h1>Add Meal Page</h1>
      <p>Lägga till måltider via en lista</p>
      <p>när man lagt till enskild mat ska det komma upp i en lista nedanför</p>
      <p>Och man ska kunna se makro och kalorier</p>
      <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default AddMealPage