import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import MainComponent from './components/Main';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <MainComponent />
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
