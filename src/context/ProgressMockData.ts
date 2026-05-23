
import arnoldBack from "../assets/progresspictures/ArnoldBack1.jpg";
import arnoldFront1 from "../assets/progresspictures/ArnoldFront1.avif";
import arnoldFront2 from "../assets/progresspictures/ArnoldFront2.avif";
import arnoldSide1 from "../assets/progresspictures/ArnoldSide1.jpg";
import arnoldSide2 from "../assets/progresspictures/ArnoldSide2.jpg";
import type { CardType } from "../Components/ProgressPageComponents/ProgressSwipe";



export const cardData: CardType[] = [
  { id: "1", url: arnoldBack, category: "back", date: "2024-01-10" },
  { id: "2", url: arnoldFront1, category: "front", date: "2024-01-10"},
  { id: "3", url: arnoldFront2, category: "front", date: "2024-02-12" },
  { id: "4", url: arnoldSide1, category: "side", date: "2024-01-10" },
  { id: "5", url: arnoldSide2, category: "side", date: "2024-02-12" },
];
