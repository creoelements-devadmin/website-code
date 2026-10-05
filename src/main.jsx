import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';
import { PageTransitionProvider } from './components/PageTransition.jsx';

window.history.scrollRestoration = 'manual';

 createRoot(document.getElementById('root')).render(

      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
            <HelmetProvider>
                  <PageTransitionProvider>
                        <App />
                  </PageTransitionProvider>
            </HelmetProvider>,
      </BrowserRouter>
);



