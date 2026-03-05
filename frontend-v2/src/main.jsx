import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SkeletonTheme } from 'react-loading-skeleton'

createRoot(document.getElementById('root')).render(
  <SkeletonTheme baseColor="#162456" highlightColor="#bedbff">
    <StrictMode>
      <App />
    </StrictMode>,
  </SkeletonTheme>
)
