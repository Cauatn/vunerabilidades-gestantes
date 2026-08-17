import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NuqsAdapter } from 'nuqs/adapters/react'
import './index.css'
import App from './App.tsx'
import TanstackQueryClientProvider from './providers/tanstackQueryClientProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <TanstackQueryClientProvider>
        <App />
      </TanstackQueryClientProvider>
    </NuqsAdapter>
  </StrictMode>,
)
