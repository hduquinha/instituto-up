import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 1. Importe o seu componente do botão
import WhatsAppButton from './components/WhatsAppButton.jsx'; // Verifique se o nome do arquivo está correto (.jsx ou .tsx)

// 2. Renderiza seu aplicativo principal normalmente na div#root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// 3. Encontra o novo container do botão que criamos no index.html
const whatsappContainer = document.getElementById('whatsapp-container');

// 4. Renderiza APENAS o botão do WhatsApp dentro desse container separado
if (whatsappContainer) {
  ReactDOM.createRoot(whatsappContainer).render(
    <React.StrictMode>
      <WhatsAppButton />
    </React.StrictMode>,
  )
}