import React from 'react'
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'

const ProgressPage = () => {
  return (
    <PageLayout>
    <div>
      <h1>Progress Page</h1>
      <p>Se Rekord</p>
      <p>Se antal avklarade Pass</p>
      <p>Kurva med viktnedgång/uppgång över tid</p>
      <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default ProgressPage