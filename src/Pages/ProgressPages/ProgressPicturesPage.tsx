import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
import ProgressSwipe, { type CardType } from '../../Components/ProgressPageComponents/ProgressSwipe'

import arnoldBack from "../../assets/progresspictures/ArnoldBack1.jpg";
import arnoldFront1 from "../../assets/progresspictures/ArnoldFront1.avif";
import arnoldFront2 from "../../assets/progresspictures/ArnoldFront2.avif";
import arnoldSide1 from "../../assets/progresspictures/ArnoldSide1.jpg";
import arnoldSide2 from "../../assets/progresspictures/ArnoldSide2.jpg";

const cardData: CardType[] = [
  { id: 1, url: arnoldBack, category: "back", date: "2024-01-10" },
  { id: 2, url: arnoldFront1, category: "front", date: "2024-01-10"},
  { id: 3, url: arnoldFront2, category: "front", date: "2024-02-12" },
  { id: 4, url: arnoldSide1, category: "side", date: "2024-01-10" },
  { id: 5, url: arnoldSide2, category: "side", date: "2024-02-12" },
];

const ProgressPicturesPage = () => {

  const frontCards = cardData.filter(c => c.category === "front");
  const sideCards = cardData.filter(c => c.category === "side");
  const backCards = cardData.filter(c => c.category === "back");

  return (
    <PageLayout>
      <div className='centerContent'>

        <div className="swipeSection">
        <h2>Front</h2>
        <ProgressSwipe initialCards={frontCards} />
        </div>

        <div className="swipeSection">
        <h2>Side</h2>
        <ProgressSwipe initialCards={sideCards} />
        </div>
        
        <div className="swipeSection">
        <h2>Back</h2>
        <ProgressSwipe initialCards={backCards} />
        </div>
        <button className='navigationBtn'>Add Picture</button>
        <BackBtn/>
      </div>
    </PageLayout>
  )
}

export default ProgressPicturesPage