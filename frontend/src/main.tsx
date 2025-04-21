import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import NewsletterHomePage from './newsletter/NewsletterPage.tsx'
import ComposeNewsletterPage from './newsletter/Compose.tsx'

import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/newsletter" element={<NewsletterHomePage/>}>
          <Route path="compose" element={<ComposeNewsletterPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
