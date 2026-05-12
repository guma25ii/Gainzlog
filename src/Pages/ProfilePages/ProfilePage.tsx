
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'

const ProfilePage = () => {
  return (
    <PageLayout>
      <div className='centerContent'>
        <h1>Profile Page</h1>
        <p>Ändra lösenord</p>
        <p>information om användaren</p>
        <button className='navigationBtn'>Avregistrera</button>
        <button className='navigationBtn'>Logga ut</button>
        <BackBtn/>
      </div>
    </PageLayout>
  )
}

export default ProfilePage