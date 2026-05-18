
import NavigateBtn from '../../Components/NavigateBtn';
import PageLayout from '../../Components/PageLayouts'
import { useNavigate } from 'react-router-dom'

const ProgressPage = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
    <div className='centerContent'>
      <h1>Records</h1>
      <div className='workoutsContainer'>
      <p>Se antal avklarade Pass</p>
      <p>Kurva med viktnedgång/uppgång över tid</p>
      <button className='navigationBtn' onClick={() => navigate("/pictures")} >Progress Pictures</button>
    </div>
    <NavigateBtn to="/">Back</NavigateBtn>
    </div>
    </PageLayout>
  )
}

export default ProgressPage