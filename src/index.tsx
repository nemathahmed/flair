import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./global.css"
import AIConversationScreen from './AIConversation.tsx';
import App from './App.tsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
