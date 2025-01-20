import React, { useState } from 'react';
import TextAreaInput from './components/TextAreaInput';
import SatList from './components/SatList';

function App() {
  const [satCollection, setSatCollection] = useState({});

  const handleAddSats = (input) => {
    const newSats = input
      .split(/\s*,\s*|\s+/) // Split by comma or whitespace
      .filter(Boolean); // Remove empty strings

    setSatCollection((prevCollection) => {
      const updatedCollection = { ...prevCollection };
      newSats.forEach((sat) => {
        if (!updatedCollection[sat]) {
          updatedCollection[sat] = {
            tags: [],
            block_number: null,
            price: null,
          };
        }
      });
      return updatedCollection;
    });
  };

  return (
    <div>
      <h1>Rare Sats Collector</h1>
      <TextAreaInput onAddSats={handleAddSats} />
      <SatList collection={satCollection} />
    </div>
  );
}

export default App;
