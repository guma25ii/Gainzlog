import { motion, useMotionValue, useTransform } from "framer-motion";

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
<Card
  key={card.id}
  url={card.url}
  date={card.date}
  index={index}
  cards={cards}
  setCards={setCards}
/>
      ))}
    </div>
  );
};

const Card = ({
  url,
  date,
  index,
  cards,
  setCards,
}: {
  url: string;
  date: string;
  index: number;
  cards: CardType[];
  setCards: any;
}) => {
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