import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(ChakraProvider, { children: _jsx(App, {}) }) }) }));
// src/index.tsx or src/main.tsx
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
            .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
