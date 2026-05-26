import { motion, useMotionValue, useTransform } from "framer-motion";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


export type CardType = {
  id: string;
  url: string;
  category: "front" | "side" | "back";
  date: string;
};

const ProgressSwipe = ({
  cards,
  setCards
}: {
  cards: CardType[];
  setCards: any;
}) => {
  return (
    <div className="swipeContainer">
      {cards.map((card, index) => (
        <ErrorBoundary key={card.id} fallback={<div><p>Failed To Load Image</p> <button className="navigationBtn" onClick={() => window.location.reload()}>Reload</button></div>}>
<Card
  url={card.url}
  date={card.date}
  index={index}
  cards={cards}
  setCards={setCards}
/>
</ErrorBoundary>
      ))}
    </div>
  );
};

const Card = ({
  url,
  date,
  index,
  // cards,
  setCards,
}: {
  url: string;
  date: string;
  index: number;
  cards: CardType[];
  setCards: any;
}) => {

// Test för Error Boundary, funkar fin fint!
// if (url.includes("ArnoldBack"))  {
//   throw new Error("Image is too ripped");  
// }
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

const handleDragEnd = () => {
  if (Math.abs(x.get()) > 80) {
    setCards((prev: any) => {
      const current = prev.find((c: any) => c.url === url);
      if (!current) return prev;

      const filtered = prev.filter((c: any) => c.url !== url);
      return [...filtered, current];
    });
  }

  x.set(0);
};

  return (
    
    <motion.div
      className="cardWrapper"
      style={{
        position: "absolute",
        top: 0,
        left: 0,

        zIndex: 100 - index,

        transform: `translateY(${index * 6}px) scale(${1 - index * 0.03})`,
      }}
    >
      <motion.img
        src={url}
        className="picture"
        style={{
          x,
          opacity,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      />

      <div className="dateLabel">
        {date}
      </div>
    </motion.div>

  );
};

export default ProgressSwipe;