
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
import { useNavigate } from 'react-router-dom'

const ProgressPage = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
    <div className='centerContent'>
      <p>Se Rekord</p>
      <p>Se antal avklarade Pass</p>
      <p>Kurva med viktnedgång/uppgång över tid</p>
      <button className='navigationBtn' onClick={() => navigate("/pictures")} >Progress Pictures</button>
      <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default ProgressPage