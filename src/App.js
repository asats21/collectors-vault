// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  function SatList({ collection }) {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Sat Number</th>
              <th>Tags</th>
              <th>Block Number</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(collection).map(([sat, details]) => (
              <tr key={sat}>
                <td>{sat}</td>
                <td>{details.tags.join(', ')}</td>
                <td>{details.block_number || 'N/A'}</td>
                <td>{details.price !== null ? details.price : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function TextAreaInput({ onAddSats }) {
    const [input, setInput] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim()) {
        onAddSats(input);
        setInput('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter sat numbers separated by comma or whitespace"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Add Sats</button>
      </form>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Rare Sats Collector</h1>
      <div className="card shadow-sm p-4">
        <TextAreaInput onAddSats={handleAddSats} />
      </div>
      <div className="mt-4">
        <SatList collection={satCollection} />
      </div>
    </div>
  );
}

export default App;
