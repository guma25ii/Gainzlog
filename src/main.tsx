import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
import { WorkoutProvider } from './context/WorkoutContext.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'


const saved = localStorage.getItem("darkMode");

document.body.classList.remove("light", "dark");
document.body.classList.add(
  saved && JSON.parse(saved) ? "dark" : "light"
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
      <ErrorBoundary>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
      </ErrorBoundary>
    </BrowserRouter>

  </StrictMode>
)

