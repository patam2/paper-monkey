import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import NewsletterHomePage from './newsletter/NewsletterPage.tsx'
import ComposeNewsletterPage from './newsletter/Compose.tsx'

import './style.css'
import Auth from './components/auth.tsx'
import Settings from './components/settings.tsx'
import RSSSettings from './components/settings/rss.tsx'

createRoot(document.getElementById('root')!).render(
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/newsletter/" element={<NewsletterHomePage/>}>
          <Route path="compose/:id" element={<ComposeNewsletterPage/>}/>
        </Route>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/settings/' element={<Settings/>}>
          <Route path='rss' element={<RSSSettings/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    </>)
