import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { IntlProvider } from 'use-intl'
import App from './App.tsx'
import { loadTranslations, resolveLocale } from './lib/i18n/localeResolver'

const locale = resolveLocale()
const messages = await loadTranslations(locale)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  </StrictMode>,
)
