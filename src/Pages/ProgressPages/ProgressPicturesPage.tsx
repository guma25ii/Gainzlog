
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
import ProgressSwipe from '../../Components/ProgressPageComponents/ProgressSwipe'

const ProgressPicturesPage = () => {
  return (
    <PageLayout>
    <div className='centerContent'>
        <h1>ProgressPicturesPage</h1>
        
        <ProgressSwipe/>
        <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default ProgressPicturesPage