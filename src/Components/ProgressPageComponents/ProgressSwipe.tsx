import React, { useState, type Dispatch, type SetStateAction } from 'react'
import {motion, useMotionValue, useMotionValueEvent, useTransform} from 'framer-motion'


import arnoldBack from "../../assets/progresspictures/ArnoldBack1.jpg";
import arnoldFront1 from "../../assets/progresspictures/ArnoldFront1.avif";
import arnoldFront2 from "../../assets/progresspictures/ArnoldFront2.avif";
import arnoldSide1 from "../../assets/progresspictures/ArnoldSide1.jpg";
import arnoldSide2 from "../../assets/progresspictures/ArnoldSide2.jpg";


type Card = {
    id: number;
    url: string;
};


const ProgressSwipe = () => {
    const [cards, setCards] = useState<Card[]>(cardData);

  return (
    <div className="swipeContainer">
{cards.map((card, index) => {
  return (
    <Card
      key={card.id}
      cards={cards}
      setCards={setCards}
      {...card}
      index={index}
    />
  );
})}
    </div>
  );
};

const Card = ( { id, url, cards, setCards, index }: { id:number, url: string, 
    setCards: Dispatch<SetStateAction<Card[]>>;
    cards: Card[], index: number;
    }) => {
 
    const x = useMotionValue(0);
    

    //Opacity gör en fade när man slidear
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])

    const handleDragEnd = () => {
        if (Math.abs(x.get()) > 50){
            // TODO: get rid of front card
            setCards(pv => pv.filter(v => v.id !== id));

        }

    } 


    return(
     <motion.img
    src={url}
    alt="Placeholder" 
    className="picture"
    style={{
        position: "absolute",   // 🔥 flytta hit från CSS kontroll
        top: 200,
        left: 400,
        width: "200px",
        height: "300px",
        alignItems: "center",
        
        x,
        opacity, 
        zIndex: cards.length - index, 
    }}
    drag="x"
    dragConstraints={{
        left: 0,
        right: 0,
    }}
    onDragEnd={handleDragEnd}
    />
    )
};

export default ProgressSwipe


const cardData: Card[] = [
    {
        id: 1,
        url: arnoldBack,
    },
        {
        id: 2,
        url: arnoldFront1,
    },
        {
        id: 3,
        url: arnoldFront2,
    },
        {
        id: 4,
        url: arnoldSide1,
    },
        {
        id: 5,
        url: arnoldSide2,
    },
];