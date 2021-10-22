import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import MainComponent from './components/Main';


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <MainComponent />
      </div>
    </ChakraProvider>
  );
}

export default App;
