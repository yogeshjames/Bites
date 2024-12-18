import { StrictMode } from 'react';
import { createRoot  } from 'react-dom/client';
import { ChakraProvider , defaultSystem } from '@chakra-ui/react'; 
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppMain from './AppMain.jsx';
import { UserProvider } from "./UserContext";
import { createSystem, defaultConfig } from "@chakra-ui/react";

// Create a custom system configuration
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        // Define dark mode and light mode colors
        dark: {
          background: { value: "#121212" },
          text: { value: "#ffffff" },
        },
        light: {
          background: { value: "#ffffff" },
          text: { value: "#121212" },
        },
      },
      // Add dark mode support
      semanticTokens: {
        colors: {
          // Define how colors change based on mode (light/dark)
          background: {
            value: { base: "#ffffff", _dark: "#121212" },
          },
          text: {
            value: { base: "#121212", _dark: "#ffffff" },
          },
        },
      },
    },
  },
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ChakraProvider   theme={system} value={defaultSystem}>
    <AppMain></AppMain>
    </ChakraProvider>
    </UserProvider>
  </StrictMode>,
);
