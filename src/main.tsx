import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
import { NutritionProvider } from './context/NutritionContext.tsx'
import { WorkoutProvider } from './context/WorkoutContext.tsx'


const saved = localStorage.getItem("darkMode");

document.body.classList.remove("light", "dark");
document.body.classList.add(
  saved && JSON.parse(saved) ? "dark" : "light"
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <WorkoutProvider>
    <NutritionProvider>
        <App />
      </NutritionProvider>
      </WorkoutProvider>
    </BrowserRouter>
  </StrictMode>
)

