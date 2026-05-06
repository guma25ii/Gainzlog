import BackBtn from "../../Components/BackBtn";
import NavigateBtn from "../../Components/NavigateBtn";
import PageLayout from "../../Components/PageLayouts";
import ProgressSwipe, {
  type CardType,
} from "../../Components/ProgressPageComponents/ProgressSwipe";
import { useLocation } from "react-router-dom";
import { cardData } from "../../Components/ProgressPageComponents/ProgressMockData";
import { useState, useEffect } from "react";

const ProgressPicturesPage = () => {
  const location = useLocation();

  const [cards, setCards] = useState<CardType[]>(cardData);

  useEffect(() => {
    const newCard = location.state as CardType | null;

    if (!newCard) return;

    setCards((prev) => {
      const exists = prev.some((c) => c.id === newCard.id);
      if (exists) return prev;

      return [newCard, ...prev]; // 🔥 NYASTE ÖVERST
    });

    window.history.replaceState({}, document.title);
  }, [location.state]);

  const frontCards = cards.filter((c) => c.category === "front");
  const sideCards = cards.filter((c) => c.category === "side");
  const backCards = cards.filter((c) => c.category === "back");

  return (
    <PageLayout>
      <div className="centerContent">
        <div className="swipeSection">
          <h2>Front</h2>
          <ProgressSwipe cards={frontCards} setCards={setCards} />
        </div>

        <div className="swipeSection">
          <h2>Side</h2>
          <ProgressSwipe cards={sideCards} setCards={setCards} />
        </div>

        <div className="swipeSection">
          <h2>Back</h2>
          <ProgressSwipe cards={backCards} setCards={setCards} />
        </div>

        <NavigateBtn to="/addpicture">Add Picture</NavigateBtn>
        <NavigateBtn to="/progress">Back</NavigateBtn>
      </div>
    </PageLayout>
  );
};

export default ProgressPicturesPage;