import { useState, type Dispatch, type SetStateAction } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export type CardType = {
  id: number;
  url: string;
  category: "front" | "side" | "back";
};

const ProgressSwipe = ({ initialCards }: { initialCards: CardType[] }) => {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  return (
    <div className="swipeContainer">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          cards={cards}
          setCards={setCards}
          {...card}
          index={index}
        />
      ))}
    </div>
  );
};

const Card = ({
  id,
  url,
  cards,
  setCards,
  index,
}: {
  id: number;
  url: string;
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  index: number;
}) => {

  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

const handleDragEnd = () => {
  if (Math.abs(x.get()) > 50) {
    setCards(prev => {
      const current = prev.find(c => c.id === id);
      if (!current) return prev;

      const filtered = prev.filter(c => c.id !== id);
      return [...filtered, current]; // lägg sist = loop
    });

    x.set(0); // reset position
  }
};

  return (
    <motion.img
      src={url}
      alt="progress"
      className="picture"
      style={{
        position: "absolute",
        width: "200px",
        height: "300px",
        x,
        opacity,
        zIndex: cards.length - index,
        borderRadius: "20px",
        overflow: "hidden",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default ProgressSwipe;